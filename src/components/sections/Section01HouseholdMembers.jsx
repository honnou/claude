import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextInput, SelectInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'

const ROLE_OPTIONS = [
  { value: 'primary', label: 'Primary Partner' },
  { value: 'co-parent', label: 'Co-Parent' },
  { value: 'nesting', label: 'Nesting Partner' },
  { value: 'anchor', label: 'Anchor Partner' },
  { value: 'other', label: 'Other' },
]

export default function Section01HouseholdMembers({
  formData, updateSection, currentSection, onPrev, onNext, activePartner,
}) {
  const adults = formData.adults || []
  const adult = adults[activePartner] || {}
  const name = adult.firstName || `Partner ${activePartner + 1}`

  const set = (field) => (val) => {
    const updated = adults.map((a, i) =>
      i === activePartner ? { ...a, [field]: val } : a
    )
    updateSection('adults', updated)
  }

  // Completion indicator for the other two partners
  const others = adults
    .map((a, i) => ({ a, i }))
    .filter(({ i }) => i !== activePartner)

  return (
    <SectionWrapper
      number={1}
      title={`${name}'s Personal Information`}
      description="Each partner should fill in their own information. Use the partner tabs above to switch between partners."
    >
      {/* Other partners' completion status */}
      <div className="flex gap-3 mb-6">
        {others.map(({ a, i }) => (
          <div
            key={i}
            className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border ${
              a.firstName && a.email
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${a.firstName && a.email ? 'bg-emerald-500' : 'bg-gray-300'}`} />
            {a.firstName ? a.firstName : `Partner ${i + 1}`}:{' '}
            {a.firstName && a.email ? 'complete' : 'not yet filled in'}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FormField label="First Name" required>
          <TextInput value={adult.firstName} onChange={set('firstName')} placeholder="First name" />
        </FormField>
        <FormField label="Last Name" required>
          <TextInput value={adult.lastName} onChange={set('lastName')} placeholder="Last name" />
        </FormField>
        <FormField label="Date of Birth" required>
          <TextInput type="date" value={adult.dob} onChange={set('dob')} />
        </FormField>
        <FormField label="Role in Household">
          <SelectInput
            value={adult.relationshipRole}
            onChange={set('relationshipRole')}
            options={ROLE_OPTIONS}
            placeholder="Select role…"
          />
        </FormField>
        <FormField label="Phone">
          <TextInput type="tel" value={adult.phone} onChange={set('phone')} placeholder="(555) 555-5555" />
        </FormField>
        <FormField label="Email" required>
          <TextInput type="email" value={adult.email} onChange={set('email')} placeholder="email@example.com" />
        </FormField>
        <FormField label="Street Address" className="sm:col-span-2">
          <TextInput value={adult.address} onChange={set('address')} placeholder="123 Main St" />
        </FormField>
        <FormField label="City">
          <TextInput value={adult.city} onChange={set('city')} placeholder="City" />
        </FormField>
        <FormField label="State">
          <TextInput value={adult.state} onChange={set('state')} placeholder="ST" maxLength={2} />
        </FormField>
        <FormField label="ZIP Code">
          <TextInput value={adult.zip} onChange={set('zip')} placeholder="12345" maxLength={10} />
        </FormField>
      </div>

      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
