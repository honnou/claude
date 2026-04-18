import { useState, useEffect, useRef, useCallback } from 'react'
import { INITIAL_FORM_DATA } from './data/initialFormData.js'
import { isConfigured } from './lib/supabase.js'
import {
  createHousehold,
  loadHousehold,
  saveHousehold,
  subscribeToHousehold,
  getStoredPartner,
  storePartner,
  getLastHouseholdId,
  mergeRemoteUpdate,
} from './lib/sync.js'

import Header from './components/layout/Header.jsx'
import ProgressBar from './components/layout/ProgressBar.jsx'
import PartnerTabs from './components/layout/PartnerTabs.jsx'
import LandingPage from './components/landing/LandingPage.jsx'
import PartnerSelect from './components/landing/PartnerSelect.jsx'
import NarrativeDisplay from './components/narrative/NarrativeDisplay.jsx'

import Section01HouseholdMembers from './components/sections/Section01HouseholdMembers.jsx'
import SectionStory from './components/sections/SectionStory.jsx'
import Section02ChildInformation from './components/sections/Section02ChildInformation.jsx'
import Section03Guardianship from './components/sections/Section03Guardianship.jsx'
import Section04AssetInventory from './components/sections/Section04AssetInventory.jsx'
import Section05DebtsLiabilities from './components/sections/Section05DebtsLiabilities.jsx'
import Section06CurrentEstatePlan from './components/sections/Section06CurrentEstatePlan.jsx'
import Section07DistributionIntentions from './components/sections/Section07DistributionIntentions.jsx'
import Section08DecisionMakingAuthority from './components/sections/Section08DecisionMakingAuthority.jsx'
import Section09PolyamoryPlanning from './components/sections/Section09PolyamoryPlanning.jsx'
import Section10TaxesFinancial from './components/sections/Section10TaxesFinancial.jsx'
import Section11ProfessionalAdvisors from './components/sections/Section11ProfessionalAdvisors.jsx'
import Section12SpecialConsiderations from './components/sections/Section12SpecialConsiderations.jsx'
import Section13AttorneyNotes from './components/sections/Section13AttorneyNotes.jsx'

const TOTAL_SECTIONS = 14
const PER_PARTNER_SECTIONS = new Set([0, 8, 10])

// UUID pattern
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function parseHouseholdIdFromURL() {
  const segment = window.location.pathname.replace(/^\//, '').split('/')[0]
  return UUID_RE.test(segment) ? segment : null
}

function deepMergeLocal(base, override) {
  if (!override) return base
  const result = { ...base }
  for (const key of Object.keys(override)) {
    const ov = override[key]
    const bv = base[key]
    if (ov !== null && typeof ov === 'object' && !Array.isArray(ov) &&
        bv !== null && typeof bv === 'object' && !Array.isArray(bv)) {
      result[key] = deepMergeLocal(bv, ov)
    } else {
      result[key] = ov
    }
  }
  return result
}

// ── Sync status indicator ──────────────────────────────────────────────────

function SyncBadge({ status }) {
  if (status === 'saved') return (
    <span className="text-xs text-emerald-600 flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Saved
    </span>
  )
  if (status === 'saving') return (
    <span className="text-xs text-gray-400 flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse inline-block" /> Saving…
    </span>
  )
  if (status === 'error') return (
    <span className="text-xs text-red-500 flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" /> Save failed
    </span>
  )
  return null
}

// ── Share button ───────────────────────────────────────────────────────────

function ShareButton({ householdId }) {
  const [copied, setCopied] = useState(false)
  const url = `${window.location.origin}/${householdId}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      prompt('Copy this link to share with your partners:', url)
    }
  }

  return (
    <button
      onClick={copy}
      className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
      title={url}
    >
      {copied ? 'Copied!' : 'Share link'}
    </button>
  )
}

// ── Main App ───────────────────────────────────────────────────────────────

export default function App() {
  // Routing
  const [householdId, setHouseholdId] = useState(() => parseHouseholdIdFromURL())
  const [partnerIndex, setPartnerIndex] = useState(() => {
    const id = parseHouseholdIdFromURL()
    return id ? getStoredPartner(id) : null
  })

  // Form state
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [activePartner, setActivePartner] = useState(() => {
    const id = parseHouseholdIdFromURL()
    const stored = id ? getStoredPartner(id) : null
    return stored ?? 0
  })

  // Async state
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [syncStatus, setSyncStatus] = useState('saved')

  // Form navigation
  const [currentSection, setCurrentSection] = useState(0)
  const [showNarrative, setShowNarrative] = useState(false)

  // Stable refs
  const sessionId = useRef(crypto.randomUUID())
  const saveTimer = useRef(null)
  const unsubscribe = useRef(null)

  // ── Load household on mount ──────────────────────────────────────────────
  useEffect(() => {
    if (!householdId || !isConfigured) return

    setLoading(true)
    loadHousehold(householdId)
      .then((row) => {
        if (!row) {
          setLoadError('Plan not found. The link may be invalid or expired.')
          return
        }
        const merged = deepMergeLocal(INITIAL_FORM_DATA, row.form_data)
        setFormData(merged)
        setLoading(false)
      })
      .catch((err) => {
        setLoadError('Could not load plan. Check your connection and refresh.')
        setLoading(false)
      })
  }, [householdId])

  // ── Real-time subscription ───────────────────────────────────────────────
  useEffect(() => {
    if (!householdId || !isConfigured) return

    unsubscribe.current = subscribeToHousehold(
      householdId,
      sessionId.current,
      (remoteFormData) => {
        setFormData(prev => mergeRemoteUpdate(prev, remoteFormData, partnerIndex ?? activePartner))
      }
    )

    return () => {
      if (unsubscribe.current) unsubscribe.current()
    }
  }, [householdId, partnerIndex, activePartner])

  // ── Auto-save (debounced 800ms) ──────────────────────────────────────────
  const scheduleSave = useCallback((data) => {
    if (!householdId || !isConfigured) return
    clearTimeout(saveTimer.current)
    setSyncStatus('saving')
    saveTimer.current = setTimeout(async () => {
      try {
        await saveHousehold(householdId, data, sessionId.current)
        setSyncStatus('saved')
      } catch {
        setSyncStatus('error')
      }
    }, 800)
  }, [householdId])

  const updateSection = useCallback((sectionKey, value) => {
    setFormData(prev => {
      const next = { ...prev, [sectionKey]: value }
      scheduleSave(next)
      return next
    })
  }, [scheduleSave])

  // ── URL management ───────────────────────────────────────────────────────
  const navigateToHousehold = (id) => {
    window.history.pushState({}, '', `/${id}`)
    setHouseholdId(id)
  }

  // ── Landing page actions ─────────────────────────────────────────────────
  const handleCreateHousehold = async () => {
    const id = await createHousehold(INITIAL_FORM_DATA)
    navigateToHousehold(id)
    // Don't set partner yet — show PartnerSelect
  }

  const handleJoinHousehold = async (id) => {
    const row = await loadHousehold(id)
    if (!row) throw Object.assign(new Error('NOT_FOUND'), { message: 'NOT_FOUND' })
    navigateToHousehold(id)
    const storedPartner = getStoredPartner(id)
    setPartnerIndex(storedPartner)
    const merged = deepMergeLocal(INITIAL_FORM_DATA, row.form_data)
    setFormData(merged)
  }

  // ── Partner selection ────────────────────────────────────────────────────
  const handlePartnerSelect = (index) => {
    storePartner(householdId, index)
    setPartnerIndex(index)
    setActivePartner(index)
  }

  // ── Form navigation ──────────────────────────────────────────────────────
  const goNext = () => {
    if (currentSection < TOTAL_SECTIONS - 1) {
      setCurrentSection(s => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goPrev = () => {
    if (currentSection > 0) {
      setCurrentSection(s => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToSection = (i) => {
    setCurrentSection(i)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Determine current view ───────────────────────────────────────────────
  if (!householdId || !isConfigured) {
    return <LandingPage onCreateHousehold={handleCreateHousehold} onJoinHousehold={handleJoinHousehold} />
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl border border-red-200 shadow-sm p-8 text-center">
          <p className="text-red-600 font-medium mb-4">{loadError}</p>
          <button onClick={() => { window.history.pushState({}, '', '/'); setHouseholdId(null); setLoadError(null) }}
            className="btn-secondary">
            ← Back to start
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading your plan…</p>
        </div>
      </div>
    )
  }

  if (partnerIndex === null) {
    return (
      <PartnerSelect
        adults={formData.adults}
        householdId={householdId}
        onSelect={handlePartnerSelect}
      />
    )
  }

  const commonProps = {
    formData,
    updateSection,
    currentSection,
    onPrev: goPrev,
    onNext: goNext,
    activePartner,
  }

  const sections = [
    <Section01HouseholdMembers key={0} {...commonProps} />,
    <SectionStory key={1} {...commonProps} />,
    <Section02ChildInformation key={2} {...commonProps} />,
    <Section03Guardianship key={3} {...commonProps} />,
    <Section04AssetInventory key={4} {...commonProps} />,
    <Section05DebtsLiabilities key={5} {...commonProps} />,
    <Section06CurrentEstatePlan key={6} {...commonProps} />,
    <Section07DistributionIntentions key={7} {...commonProps} />,
    <Section08DecisionMakingAuthority key={8} {...commonProps} />,
    <Section09PolyamoryPlanning key={9} {...commonProps} />,
    <Section10TaxesFinancial key={10} {...commonProps} />,
    <Section11ProfessionalAdvisors key={11} {...commonProps} />,
    <Section12SpecialConsiderations key={12} {...commonProps} />,
    <Section13AttorneyNotes
      key={13}
      {...commonProps}
      onGoToNarrative={() => { setShowNarrative(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
    />,
  ]

  if (showNarrative) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header
          syncBadge={<SyncBadge status={syncStatus} />}
          shareButton={<ShareButton householdId={householdId} />}
          onReset={null}
        />
        <NarrativeDisplay formData={formData} onBack={() => setShowNarrative(false)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        syncBadge={<SyncBadge status={syncStatus} />}
        shareButton={<ShareButton householdId={householdId} />}
        onReset={null}
      />
      <ProgressBar currentSection={currentSection} onNavigate={goToSection} />
      <PartnerTabs
        adults={formData.adults}
        activePartner={activePartner}
        onChange={(i) => {
          setActivePartner(i)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {!PER_PARTNER_SECTIONS.has(currentSection) && (
          <div className="mb-4 text-xs text-gray-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
            Shared section — one response for the whole household
          </div>
        )}
        {sections[currentSection]}
      </main>

      <footer className="no-print text-center py-8 text-xs text-gray-400">
        <p>Your data syncs automatically across all devices.</p>
        <p className="mt-1">For pre-consultation purposes only — not legal advice.</p>
      </footer>
    </div>
  )
}
