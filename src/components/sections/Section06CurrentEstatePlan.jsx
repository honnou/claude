import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextInput, TextareaInput, SelectInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'

const YES_NO = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unsure', label: 'Unsure' },
]

function DocStatus({ label, field, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-700">{label}</span>
      <div className="flex gap-4">
        {YES_NO.map(opt => (
          <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name={field}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(field, opt.value)}
              className="text-primary-600"
            />
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default function Section06CurrentEstatePlan({ formData, updateSection, currentSection, onPrev, onNext }) {
  const plan = formData.currentEstatePlan || {}
  const set = (field, val) => updateSection('currentEstatePlan', { ...plan, [field]: val })
  const setField = (field) => (val) => set(field, val)

  const documents = [
    { label: 'Will(s)', field: 'hasWill' },
    { label: 'Revocable Living Trust', field: 'hasTrust' },
    { label: 'Healthcare Directive / Living Will', field: 'hasHealthcareDirective' },
    { label: 'Durable Power of Attorney (Financial)', field: 'hasDurablePOA' },
    { label: 'HIPAA Authorization', field: 'hasHIPAAAuth' },
    { label: 'Updated Beneficiary Designations', field: 'hasBeneficiaryDesignations' },
  ]

  return (
    <SectionWrapper
      number={6}
      title="Current Estate Plan Status"
      description="Tell us what estate planning documents you currently have in place."
    >
      <div className="mb-6">
        <h3 className="subsection-title">Existing Documents</h3>
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
          {documents.map(doc => (
            <DocStatus
              key={doc.field}
              label={doc.label}
              field={doc.field}
              value={plan[doc.field]}
              onChange={set}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 mb-6">
        <FormField label="Date Last Reviewed" hint="Leave blank if never reviewed">
          <TextInput type="date" value={plan.lastReviewedDate} onChange={setField('lastReviewedDate')} />
        </FormField>
        <FormField label="Attorney Who Prepared Documents">
          <TextInput value={plan.attorneyName} onChange={setField('attorneyName')} placeholder="Attorney name / firm" />
        </FormField>
        <FormField label="Where Are Documents Stored?" className="sm:col-span-2">
          <TextInput value={plan.documentsLocation} onChange={setField('documentsLocation')} placeholder="e.g., Home safe, Attorney's office, Safe deposit box" />
        </FormField>
      </div>

      <FormField label="Issues or Concerns with Current Documents" hint="What's wrong, outdated, or missing?">
        <TextareaInput
          value={plan.currentIssues}
          onChange={setField('currentIssues')}
          rows={4}
          placeholder="Describe any known issues: outdated beneficiaries, documents that don't reflect your family structure, missing partners, etc."
        />
      </FormField>

      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
