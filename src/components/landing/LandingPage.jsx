import { useState } from 'react'
import { isConfigured } from '../../lib/supabase.js'

function extractUUID(input) {
  const uuidRe = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i
  const match = input.match(uuidRe)
  return match ? match[0] : null
}

export default function LandingPage({ onCreateHousehold, onJoinHousehold }) {
  const [joining, setJoining] = useState(false)
  const [joinInput, setJoinInput] = useState('')
  const [joinError, setJoinError] = useState('')
  const [creating, setCreating] = useState(false)

  const handleCreate = async () => {
    setCreating(true)
    try {
      await onCreateHousehold()
    } catch (err) {
      setCreating(false)
      alert('Could not create plan. Check your internet connection and try again.')
    }
  }

  const handleJoin = async () => {
    const id = extractUUID(joinInput.trim())
    if (!id) {
      setJoinError('Paste the full link or plan code your partner shared with you.')
      return
    }
    setJoinError('')
    try {
      await onJoinHousehold(id)
    } catch (err) {
      if (err.message === 'NOT_FOUND') {
        setJoinError("We couldn't find a plan with that code. Double-check the link.")
      } else {
        setJoinError('Something went wrong. Check your connection and try again.')
      }
    }
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-sm border border-red-200 p-8">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <span className="text-red-600 font-bold">!</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Supabase not configured</h2>
          <p className="text-gray-600 text-sm mb-4">
            Multi-device sync requires Supabase. Set the following environment variables in your Vercel project settings:
          </p>
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 font-mono text-xs text-gray-700 space-y-1">
            <div>VITE_SUPABASE_URL=https://your-project.supabase.co</div>
            <div>VITE_SUPABASE_ANON_KEY=your-anon-key</div>
          </div>
          <p className="text-gray-500 text-xs mt-4">
            See <code className="bg-gray-100 px-1 rounded">SETUP.md</code> in the repository for the full setup instructions.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-xl w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 mb-6">
            <span className="text-3xl">🏠</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Estate Planning for Your Family
          </h1>
          <p className="text-gray-600 mb-10 leading-relaxed">
            A shared planning tool for polyamorous families. Each partner fills in their own sections
            from their own device. Your data stays in sync and generates a narrative ready for your attorney.
          </p>

          {/* Actions */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {/* Create */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-left shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-1">Start a new plan</h2>
              <p className="text-sm text-gray-500 mb-4">
                Create a shared plan for your household. You'll get a link to share with your partners.
              </p>
              <button
                onClick={handleCreate}
                disabled={creating}
                className="btn-primary w-full justify-center"
              >
                {creating ? 'Creating…' : 'Create New Plan'}
              </button>
            </div>

            {/* Join */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-left shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-1">Join an existing plan</h2>
              <p className="text-sm text-gray-500 mb-3">
                Paste the link your partner shared with you.
              </p>
              {joining ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={joinInput}
                    onChange={e => { setJoinInput(e.target.value); setJoinError('') }}
                    placeholder="Paste link or plan code here"
                    className="form-input text-sm"
                    onKeyDown={e => e.key === 'Enter' && handleJoin()}
                    autoFocus
                  />
                  {joinError && <p className="text-xs text-red-600">{joinError}</p>}
                  <div className="flex gap-2">
                    <button onClick={handleJoin} className="btn-primary flex-1 justify-center text-sm py-2">
                      Join
                    </button>
                    <button onClick={() => { setJoining(false); setJoinInput(''); setJoinError('') }}
                      className="btn-secondary text-sm py-2 px-3">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setJoining(true)} className="btn-secondary w-full justify-center">
                  Join Existing Plan
                </button>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-400">
            Your data is stored securely and only accessible via your unique plan link.
            Nothing is sold or shared.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200">
        For pre-consultation purposes only — not legal advice.
      </footer>
    </div>
  )
}
