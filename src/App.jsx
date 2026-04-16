import { useState, useEffect, useCallback } from 'react'
import { INITIAL_FORM_DATA } from './data/initialFormData.js'
import { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage, getLastSaved } from './utils/storageUtils.js'

import Header from './components/layout/Header.jsx'
import ProgressBar from './components/layout/ProgressBar.jsx'
import NarrativeDisplay from './components/narrative/NarrativeDisplay.jsx'

import Section01HouseholdMembers from './components/sections/Section01HouseholdMembers.jsx'
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

const TOTAL_SECTIONS = 13

function deepMerge(base, override) {
  if (!override) return base
  const result = { ...base }
  for (const key of Object.keys(override)) {
    if (
      override[key] !== null &&
      typeof override[key] === 'object' &&
      !Array.isArray(override[key]) &&
      typeof base[key] === 'object' &&
      base[key] !== null &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(base[key], override[key])
    } else {
      result[key] = override[key]
    }
  }
  return result
}

export default function App() {
  const [formData, setFormData] = useState(() => {
    const saved = loadFromLocalStorage()
    if (saved) return deepMerge(INITIAL_FORM_DATA, saved)
    return { ...INITIAL_FORM_DATA, _meta: { ...INITIAL_FORM_DATA._meta, createdAt: new Date().toISOString() } }
  })
  const [currentSection, setCurrentSection] = useState(0)
  const [showNarrative, setShowNarrative] = useState(false)
  const [lastSaved, setLastSaved] = useState(() => getLastSaved())

  // Auto-save on every change
  useEffect(() => {
    const timer = setTimeout(() => {
      saveToLocalStorage(formData)
      setLastSaved(new Date())
    }, 800)
    return () => clearTimeout(timer)
  }, [formData])

  const updateSection = useCallback((sectionKey, value) => {
    setFormData(prev => ({ ...prev, [sectionKey]: value }))
  }, [])

  const handleReset = () => {
    if (window.confirm('This will delete all your saved data and start over. Are you sure?')) {
      clearLocalStorage()
      setFormData({ ...INITIAL_FORM_DATA, _meta: { ...INITIAL_FORM_DATA._meta, createdAt: new Date().toISOString() } })
      setCurrentSection(0)
      setShowNarrative(false)
      setLastSaved(null)
    }
  }

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

  const commonProps = {
    formData,
    updateSection,
    currentSection,
    onPrev: goPrev,
    onNext: goNext,
  }

  const sections = [
    <Section01HouseholdMembers key={0} {...commonProps} />,
    <Section02ChildInformation key={1} {...commonProps} />,
    <Section03Guardianship key={2} {...commonProps} />,
    <Section04AssetInventory key={3} {...commonProps} />,
    <Section05DebtsLiabilities key={4} {...commonProps} />,
    <Section06CurrentEstatePlan key={5} {...commonProps} />,
    <Section07DistributionIntentions key={6} {...commonProps} />,
    <Section08DecisionMakingAuthority key={7} {...commonProps} />,
    <Section09PolyamoryPlanning key={8} {...commonProps} />,
    <Section10TaxesFinancial key={9} {...commonProps} />,
    <Section11ProfessionalAdvisors key={10} {...commonProps} />,
    <Section12SpecialConsiderations key={11} {...commonProps} />,
    <Section13AttorneyNotes
      key={12}
      {...commonProps}
      onGoToNarrative={() => { setShowNarrative(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
    />,
  ]

  if (showNarrative) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header lastSaved={lastSaved} onReset={handleReset} />
        <NarrativeDisplay formData={formData} onBack={() => setShowNarrative(false)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header lastSaved={lastSaved} onReset={handleReset} />
      <ProgressBar currentSection={currentSection} onNavigate={goToSection} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {sections[currentSection]}
      </main>

      <footer className="no-print text-center py-8 text-xs text-gray-400">
        <p>Your data is saved locally in your browser. Nothing is sent to any server.</p>
        <p className="mt-1">This form is for pre-consultation purposes only and is not legal advice.</p>
      </footer>
    </div>
  )
}
