import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextInput, TextareaInput, SelectInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'

function adultLabel(formData, i) {
  const a = formData.adults?.[i]
  return a?.firstName || `Adult ${i + 1}`
}

export default function Section08DecisionMakingAuthority({ formData, updateSection, currentSection, onPrev, onNext }) {
  const dm = formData.decisionMaking || {}
  const set = (field) => (val) => updateSection('decisionMaking', { ...dm, [field]: val })

  const adults = [0, 1, 2]

  return (
    <SectionWrapper
      number={8}
      title="Decision-Making Authority"
      description="Specify who has legal authority to make healthcare and financial decisions for each adult."
    >
      {/* Healthcare POA */}
      <div className="mb-6">
        <h3 className="subsection-title">Healthcare Power of Attorney</h3>
        <p className="text-xs text-gray-500 mb-4">Who can make medical decisions if each person is unable to speak for themselves?</p>
        {adults.map(i => (
          <div key={i} className="array-item-card mb-3">
            <p className="text-sm font-semibold text-gray-700 mb-3">For {adultLabel(formData, i)}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <FormField label="Primary Healthcare Agent">
                <TextInput value={dm[`adult${i + 1}HealthcareProxy`]} onChange={set(`adult${i + 1}HealthcareProxy`)} placeholder="Full name" />
              </FormField>
              <FormField label="Alternate Healthcare Agent">
                <TextInput value={dm[`adult${i + 1}HealthcareProxyAlternate`]} onChange={set(`adult${i + 1}HealthcareProxyAlternate`)} placeholder="Full name" />
              </FormField>
            </div>
          </div>
        ))}
      </div>

      {/* Financial POA */}
      <div className="mb-6">
        <h3 className="subsection-title">Durable Financial Power of Attorney</h3>
        <p className="text-xs text-gray-500 mb-4">Who can manage financial affairs if each person is incapacitated?</p>
        {adults.map(i => (
          <div key={i} className="array-item-card mb-3">
            <p className="text-sm font-semibold text-gray-700 mb-3">For {adultLabel(formData, i)}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <FormField label="Primary Financial Agent">
                <TextInput value={dm[`adult${i + 1}FinancialPOA`]} onChange={set(`adult${i + 1}FinancialPOA`)} placeholder="Full name" />
              </FormField>
              <FormField label="Alternate Financial Agent">
                <TextInput value={dm[`adult${i + 1}FinancialPOAAlternate`]} onChange={set(`adult${i + 1}FinancialPOAAlternate`)} placeholder="Full name" />
              </FormField>
            </div>
          </div>
        ))}
      </div>

      {/* HIPAA Authorization */}
      <div className="mb-6">
        <h3 className="subsection-title">HIPAA Authorization</h3>
        <p className="text-xs text-gray-500 mb-4">Who is authorized to receive medical information for each person?</p>
        {adults.map(i => (
          <FormField key={i} label={`For ${adultLabel(formData, i)}: Authorized Person(s)`}>
            <TextInput value={dm[`adult${i + 1}HIPAAAuth`]} onChange={set(`adult${i + 1}HIPAAAuth`)} placeholder="Full name(s), comma-separated" />
          </FormField>
        ))}
      </div>

      {/* End of Life */}
      <div className="mb-6">
        <h3 className="subsection-title">End-of-Life Preferences</h3>
        {adults.map(i => (
          <FormField key={i} label={`${adultLabel(formData, i)}'s Preferences`}>
            <TextareaInput value={dm[`adult${i + 1}EndOfLife`]} onChange={set(`adult${i + 1}EndOfLife`)} rows={2}
              placeholder="Describe any known wishes regarding life support, comfort care, etc." />
          </FormField>
        ))}

        <FormField label="Life Support / Artificial Prolongation">
          <SelectInput value={dm.lifeSupport} onChange={set('lifeSupport')}
            options={[
              { value: 'all-measures', label: 'Use all available measures' },
              { value: 'comfort-only', label: 'Comfort care only, no extraordinary measures' },
              { value: 'limited', label: 'Limited measures (specify in notes)' },
              { value: 'discuss', label: 'Discuss with healthcare agent at the time' },
            ]}
            placeholder="Select preference..."
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FormField label="Organ Donation">
            <SelectInput value={dm.organDonation} onChange={set('organDonation')}
              options={[
                { value: 'yes-all', label: 'Yes — all organs' },
                { value: 'yes-specific', label: 'Yes — specific organs only' },
                { value: 'no', label: 'No' },
                { value: 'discuss', label: 'Discuss with family' },
              ]}
              placeholder="Select..."
            />
          </FormField>
          <FormField label="Burial / Cremation Preferences">
            <SelectInput value={dm.burialPreferences} onChange={set('burialPreferences')}
              options={[
                { value: 'burial', label: 'Traditional burial' },
                { value: 'cremation', label: 'Cremation' },
                { value: 'green', label: 'Green / natural burial' },
                { value: 'no-preference', label: 'No preference' },
                { value: 'discuss', label: 'Discuss with family' },
              ]}
              placeholder="Select..."
            />
          </FormField>
        </div>
      </div>

      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
