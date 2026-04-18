import { supabase } from './supabase.js'

// ── Household CRUD ─────────────────────────────────────────────────────────

export async function createHousehold(initialFormData) {
  const { data, error } = await supabase
    .from('households')
    .insert({ form_data: initialFormData, last_writer: null })
    .select('id')
    .single()
  if (error) throw error
  return data.id
}

export async function loadHousehold(id) {
  const { data, error } = await supabase
    .from('households')
    .select('form_data, last_writer, updated_at')
    .eq('id', id)
    .single()
  if (error) {
    if (error.code === 'PGRST116') return null   // not found
    throw error
  }
  return data
}

export async function saveHousehold(id, formData, sessionId) {
  const { error } = await supabase
    .from('households')
    .update({
      form_data: formData,
      last_writer: sessionId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
  if (error) throw error
}

// ── Real-time subscription ─────────────────────────────────────────────────
// Calls onRemoteUpdate(formData) whenever another device saves.
// Returns a cleanup function.

export function subscribeToHousehold(id, sessionId, onRemoteUpdate) {
  const channel = supabase
    .channel(`household_${id}`)
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'households', filter: `id=eq.${id}` },
      (payload) => {
        // Ignore our own echo-backs
        if (payload.new.last_writer === sessionId) return
        onRemoteUpdate(payload.new.form_data)
      }
    )
    .subscribe()

  return () => supabase.removeChannel(channel)
}

// ── Per-device identity ────────────────────────────────────────────────────
// Each device remembers which partner slot they are for a given household.

const PARTNER_KEY = (id) => `ep_partner_${id}`
const LAST_HOUSEHOLD_KEY = 'ep_last_household'

export function getStoredPartner(householdId) {
  const raw = localStorage.getItem(PARTNER_KEY(householdId))
  if (raw === null) return null
  const n = parseInt(raw, 10)
  return isNaN(n) ? null : n
}

export function storePartner(householdId, partnerIndex) {
  localStorage.setItem(PARTNER_KEY(householdId), String(partnerIndex))
  localStorage.setItem(LAST_HOUSEHOLD_KEY, householdId)
}

export function getLastHouseholdId() {
  return localStorage.getItem(LAST_HOUSEHOLD_KEY)
}

// ── Merge helpers ──────────────────────────────────────────────────────────
// When a remote update arrives, remote changes win everywhere EXCEPT
// the local partner's own personal fields, which we keep to preserve
// any in-progress edits.

export function mergeRemoteUpdate(localFormData, remoteFormData, localPartnerIndex) {
  const merged = deepMerge(localFormData, remoteFormData)
  // Preserve our own partner's personal data to avoid overwriting mid-edit
  const adults = merged.adults.map((adult, i) =>
    i === localPartnerIndex ? localFormData.adults[i] : adult
  )
  return { ...merged, adults }
}

function deepMerge(base, override) {
  if (!override) return base
  if (!base) return override
  const result = { ...base }
  for (const key of Object.keys(override)) {
    const ov = override[key]
    const bv = base[key]
    if (
      ov !== null &&
      typeof ov === 'object' &&
      !Array.isArray(ov) &&
      bv !== null &&
      typeof bv === 'object' &&
      !Array.isArray(bv)
    ) {
      result[key] = deepMerge(bv, ov)
    } else {
      result[key] = ov
    }
  }
  return result
}
