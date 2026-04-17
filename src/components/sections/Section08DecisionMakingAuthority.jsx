import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextInput, TextareaInput, SelectInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'

export default function Section08DecisionMakingAuthority({
  formData, updateSection, currentSection, onPrev, onNext, activePartner,
}) {
  const dm = formData.decisionMaking || {}
  const set = (field) => (val) => updateSection('decisionMaking', { ...dm, [field]: val })

  const adults = formData.adults || []
  const me = adults[activePartner] || {}
  const myName = me.firstName || `Partner ${activePartner + 1}`
  const p = activePartner + 1  // 1-based field prefix

  return (
    <SectionWrapper
      number={9}
      title={`${myName}'s Decision-Making Authority`}
      description="Specify who has legal authority to make healthcare and financial decisions for you. Use the partner tabs above so each person fills in their own preferences."
    >
      {/* Healthcare POA */}
      <div className="mb-6">
        <h3 className="subsection-title">Healthcare Power of Attorney</h3>
        <p className="text-xs text-gray-500 mb-4">Who can make medical decisions if you are unable to speak for yourself?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FormField label="Primary Healthcare Agent">
            <TextInput
              value={dm[`adult${p}HealthcareProxy`]}
              onChange={set(`adult${p}HealthcareProxy`)}
              placeholder="Full name"
            />
          </FormField>
          <FormField label="Alternate Healthcare Agent">
            <TextInput
              value={dm[`adult${p}HealthcareProxyAlternate`]}
              onChange={set(`adult${p}HealthcareProxyAlternate`)}
              placeholder="Full name"
            />
          </FormField>
        </div>
      </div>

      {/* Financial POA */}
      <div className="mb-6">
        <h3 className="subsection-title">Durable Financial Power of Attorney</h3>
        <p className="text-xs text-gray-500 mb-4">Who can manage your financial affairs if you are incapacitated?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FormField label="Primary Financial Agent">
            <TextInput
              value={dm[`adult${p}FinancialPOA`]}
              onChange={set(`adult${p}FinancialPOA`)}
              placeholder="Full name"
            />
          </FormField>
          <FormField label="Alternate Financial Agent">
            <TextInput
              value={dm[`adult${p}FinancialPOAAlternate`]}
              onChange={set(`adult${p}FinancialPOAAlternate`)}
              placeholder="Full name"
            />
          </FormField>
        </div>
      </div>

      {/* HIPAA */}
      <div className="mb-6">
        <h3 className="subsection-title">HIPAA Authorization</h3>
        <p className="text-xs text-gray-500 mb-4">Who is authorized to receive your medical information?</p>
        <FormField label="Authorized Person(s)">
          <TextInput
            value={dm[`adult${p}HIPAAAuth`]}
            onChange={set(`adult${p}HIPAAAuth`)}
            placeholder="Full name(s), comma-separated"
          />
        </FormField>
      </div>

      {/* Per-person end-of-life */}
      <div className="mb-6">
        <h3 className="subsection-title">Your End-of-Life Preferences</h3>
        <FormField label="Personal Wishes">
          <TextareaInput
            value={dm[`adult${p}EndOfLife`]}
            onChange={set(`adult${p}EndOfLife`)}
            rows={3}
            placeholder="Describe any specific wishes regarding life support, comfort care, or end-of-life treatment…"
          />
        </FormField>
      </div>

      {/* Shared preferences — shown once, not per-partner */}
      <div className="mb-6 bg-gray-50 rounded-lg border border-gray-200 p-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          Household-wide preferences (shared)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FormField label="Life Support / Artificial Prolongation">
            <SelectInput
              value={dm.lifeSupport}
              onChange={set('lifeSupport')}
              options={[
                { value: 'all-measures', label: 'Use all available measures' },
                { value: 'comfort-only', label: 'Comfort care only, no extraordinary measures' },
                { value: 'limited', label: 'Limited measures (specify in notes)' },
                { value: 'discuss', label: 'Discuss with healthcare agent at the time' },
              ]}
              placeholder="Select preference…"
            />
          </FormField>
          <FormField label="Organ Donation">
            <SelectInput
              value={dm.organDonation}
              onChange={set('organDonation')}
              options={[
                { value: 'yes-all', label: 'Yes — all organs' },
                { value: 'yes-specific', label: 'Yes — specific organs only' },
                { value: 'no', label: 'No' },
                { value: 'discuss', label: 'Discuss with family' },
              ]}
              placeholder="Select…"
            />
          </FormField>
          <FormField label="Burial / Cremation Preferences" className="sm:col-span-2">
            <SelectInput
              value={dm.burialPreferences}
              onChange={set('burialPreferences')}
              options={[
                { value: 'burial', label: 'Traditional burial' },
                { value: 'cremation', label: 'Cremation' },
                { value: 'green', label: 'Green / natural burial' },
                { value: 'no-preference', label: 'No preference' },
                { value: 'discuss', label: 'Discuss with family' },
              ]}
              placeholder="Select…"
            />
          </FormField>
        </div>
      </div>

      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
