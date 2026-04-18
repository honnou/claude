import { useState } from 'react'

function getAge(dob) {
  if (!dob) return null
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

export default function PartnerSelect({ adults, householdId, onSelect }) {
  const [selected, setSelected] = useState(null)
  const [confirming, setConfirming] = useState(false)

  const handlePick = (index) => {
    setSelected(index)
    setConfirming(true)
  }

  const handleConfirm = () => {
    onSelect(selected)
  }

  const adult = selected !== null ? adults[selected] : null
  const adultName = adult?.firstName
    ? `${adult.firstName}${adult.lastName ? ' ' + adult.lastName : ''}`
    : `Partner ${selected + 1}`

  if (confirming) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-sm w-full bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary-700">{selected + 1}</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">You are {adultName}?</h2>
          <p className="text-sm text-gray-500 mb-6">
            This device will remember your identity for this plan. You can change it later if needed.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setConfirming(false)} className="btn-secondary flex-1 justify-center">
              Go back
            </button>
            <button onClick={handleConfirm} className="btn-primary flex-1 justify-center">
              Yes, that's me
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Who are you?</h1>
          <p className="text-gray-500 text-sm">
            Select your partner slot so this device knows whose sections to show you.
            Your partners will select theirs on their own devices.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {adults.map((adult, i) => {
            const name = adult.firstName
              ? `${adult.firstName}${adult.lastName ? ' ' + adult.lastName : ''}`
              : null
            const age = getAge(adult.dob)
            const hasInfo = !!(adult.firstName || adult.email)

            return (
              <button
                key={i}
                onClick={() => handlePick(i)}
                className="bg-white rounded-xl border-2 border-gray-200 hover:border-primary-400 hover:shadow-md p-6 text-left transition-all duration-150 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 group-hover:bg-primary-200 flex items-center justify-center mb-4 transition-colors">
                  <span className="text-xl font-bold text-primary-700">{i + 1}</span>
                </div>
                {name ? (
                  <>
                    <p className="font-semibold text-gray-900 text-lg">{name}</p>
                    {age !== null && (
                      <p className="text-sm text-gray-500">{age} years old</p>
                    )}
                    {adult.relationshipRole && (
                      <p className="text-xs text-primary-600 mt-1 capitalize">{adult.relationshipRole.replace('-', ' ')}</p>
                    )}
                    <p className="text-xs text-emerald-600 mt-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      Info entered
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-gray-400">Partner {i + 1}</p>
                    <p className="text-xs text-gray-400 mt-1">Not yet filled in</p>
                    <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                      Empty slot
                    </p>
                  </>
                )}
              </button>
            )
          })}
        </div>

        <p className="text-center text-xs text-gray-400">
          This choice is saved on your device. You can always switch using the partner tabs inside the form.
        </p>
      </div>
    </div>
  )
}
