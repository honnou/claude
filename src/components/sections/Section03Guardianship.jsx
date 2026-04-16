import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextInput, TextareaInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'

function adultLabel(formData, i) {
  const a = formData.adults?.[i]
  if (a?.firstName) return a.firstName
  return `Adult ${i + 1}`
}

export default function Section03Guardianship({ formData, updateSection, currentSection, onPrev, onNext }) {
  const g = formData.guardianship || {}
  const set = (field) => (val) => updateSection('guardianship', { ...g, [field]: val })

  return (
    <SectionWrapper
      number={3}
      title="Desired Guardianship"
      description="Identify who should care for your children and make decisions for each adult in the event of incapacity or death."
    >
      {/* Child guardians */}
      {(formData.children || []).some(c => c.firstName) && (
        <div className="mb-6">
          <h3 className="subsection-title">Child Guardianship</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <FormField label="Primary Guardian — Full Name">
              <TextInput value={g.primaryGuardianName} onChange={set('primaryGuardianName')} placeholder="Full name" />
            </FormField>
            <FormField label="Primary Guardian — Relationship">
              <TextInput value={g.primaryGuardianRelationship} onChange={set('primaryGuardianRelationship')} placeholder="e.g., Aunt, Close friend" />
            </FormField>
            <FormField label="Primary Guardian — Phone">
              <TextInput type="tel" value={g.primaryGuardianPhone} onChange={set('primaryGuardianPhone')} placeholder="(555) 555-5555" />
            </FormField>
            <FormField label="Alternate Guardian — Full Name">
              <TextInput value={g.alternateGuardianName} onChange={set('alternateGuardianName')} placeholder="Full name" />
            </FormField>
            <FormField label="Alternate Guardian — Relationship">
              <TextInput value={g.alternateGuardianRelationship} onChange={set('alternateGuardianRelationship')} placeholder="e.g., Uncle, Family friend" />
            </FormField>
            <FormField label="Alternate Guardian — Phone">
              <TextInput type="tel" value={g.alternateGuardianPhone} onChange={set('alternateGuardianPhone')} placeholder="(555) 555-5555" />
            </FormField>
          </div>
        </div>
      )}

      {/* Healthcare decision-makers */}
      <div className="mb-6">
        <h3 className="subsection-title">Healthcare Decision-Makers</h3>
        <p className="text-xs text-gray-500 mb-4">Who should make medical decisions for each adult if they are incapacitated?</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
          {[0, 1, 2].map(i => (
            <FormField key={i} label={`For ${adultLabel(formData, i)}`}>
              <TextInput
                value={g[`healthcareDecisionMaker${i + 1}`]}
                onChange={set(`healthcareDecisionMaker${i + 1}`)}
                placeholder="Full name"
              />
            </FormField>
          ))}
        </div>
      </div>

      {/* Financial decision-makers */}
      <div className="mb-6">
        <h3 className="subsection-title">Financial Decision-Makers (Power of Attorney)</h3>
        <p className="text-xs text-gray-500 mb-4">Who should manage financial affairs for each adult if they are incapacitated?</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
          {[0, 1, 2].map(i => (
            <FormField key={i} label={`For ${adultLabel(formData, i)}`}>
              <TextInput
                value={g[`financialDecisionMaker${i + 1}`]}
                onChange={set(`financialDecisionMaker${i + 1}`)}
                placeholder="Full name"
              />
            </FormField>
          ))}
        </div>
      </div>

      <FormField label="Additional Guardianship Notes">
        <TextareaInput value={g.guardianshipNotes} onChange={set('guardianshipNotes')} rows={3}
          placeholder="Any special instructions or circumstances regarding guardianship..." />
      </FormField>

      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
