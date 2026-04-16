const STORAGE_KEY = 'estate_planning_form_data'
const STORAGE_VERSION = '1.0'

export function saveToLocalStorage(formData) {
  try {
    const payload = {
      version: STORAGE_VERSION,
      savedAt: new Date().toISOString(),
      data: formData,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    return true
  } catch (err) {
    console.error('Failed to save to localStorage:', err)
    return false
  }
}

export function loadFromLocalStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const payload = JSON.parse(raw)
    if (payload.version !== STORAGE_VERSION) return null
    return payload.data
  } catch (err) {
    console.error('Failed to load from localStorage:', err)
    return null
  }
}

export function clearLocalStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (err) {
    console.error('Failed to clear localStorage:', err)
    return false
  }
}

export function getLastSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const payload = JSON.parse(raw)
    return payload.savedAt ? new Date(payload.savedAt) : null
  } catch {
    return null
  }
}
