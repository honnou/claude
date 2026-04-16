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

function AdultForm({ index, adult, onChange }) {
  const label = index === 0 ? 'First Adult' : index === 1 ? 'Second Adult' : 'Third Adult'
  const set = (field) => (val) => onChange(index, field, val)

  return (
    <div className="array-item-card mb-6">
      <h3 className="subsection-title">{label}</h3>
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
        <FormField label="SSN (last 4 digits)" hint="For attorney intake purposes only">
          <TextInput value={adult.ssn} onChange={set('ssn')} placeholder="XXX-XX-XXXX" maxLength={11} />
        </FormField>
        <FormField label="Phone">
          <TextInput type="tel" value={adult.phone} onChange={set('phone')} placeholder="(555) 555-5555" />
        </FormField>
        <FormField label="Email">
          <TextInput type="email" value={adult.email} onChange={set('email')} placeholder="email@example.com" />
        </FormField>
        <FormField label="Street Address" className="sm:col-span-2">
          <TextInput value={adult.address} onChange={set('address')} placeholder="123 Main St" />
        </FormField>
        <FormField label="City">
          <TextInput value={adult.city} onChange={set('city')} placeholder="City" />
        </FormField>
        <FormField label="State">
          <TextInput value={adult.state} onChange={set('state')} placeholder="State" maxLength={2} />
        </FormField>
        <FormField label="ZIP Code">
          <TextInput value={adult.zip} onChange={set('zip')} placeholder="12345" maxLength={10} />
        </FormField>
        <FormField label="Role in Household">
          <SelectInput
            value={adult.relationshipRole}
            onChange={set('relationshipRole')}
            options={ROLE_OPTIONS}
            placeholder="Select role..."
          />
        </FormField>
      </div>
    </div>
  )
}

export default function Section01HouseholdMembers({ formData, updateSection, currentSection, onPrev, onNext }) {
  const adults = formData.adults || []

  const handleChange = (index, field, value) => {
    const updated = adults.map((a, i) => i === index ? { ...a, [field]: value } : a)
    updateSection('adults', updated)
  }

  return (
    <SectionWrapper
      number={1}
      title="Household Members"
      description="Enter information for all three adults in your triad. This information will be used throughout your estate plan."
    >
      {adults.map((adult, i) => (
        <AdultForm key={i} index={i} adult={adult} onChange={handleChange} />
      ))}
      <Navigation
        currentSection={currentSection}
        onPrev={onPrev}
        onNext={onNext}
        isLastSection={false}
      />
    </SectionWrapper>
  )
}
