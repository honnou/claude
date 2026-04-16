import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'
import { emptyChild } from '../../data/initialFormData.js'

function ChildForm({ index, child, onChange, onRemove, canRemove }) {
  const set = (field) => (val) => onChange(index, field, val)
  return (
    <div className="array-item-card mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Child {index + 1}</h3>
        {canRemove && (
          <button onClick={onRemove} className="btn-danger text-xs">Remove</button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FormField label="First Name" required>
          <TextInput value={child.firstName} onChange={set('firstName')} placeholder="First name" />
        </FormField>
        <FormField label="Last Name" required>
          <TextInput value={child.lastName} onChange={set('lastName')} placeholder="Last name" />
        </FormField>
        <FormField label="Date of Birth" required>
          <TextInput type="date" value={child.dob} onChange={set('dob')} />
        </FormField>
        <FormField label="Biological Parent 1">
          <TextInput value={child.biologicalParent1} onChange={set('biologicalParent1')} placeholder="Full name" />
        </FormField>
        <FormField label="Biological Parent 2">
          <TextInput value={child.biologicalParent2} onChange={set('biologicalParent2')} placeholder="Full name" />
        </FormField>
        <FormField label="Current Legal Guardian(s)">
          <TextInput value={child.legalGuardian} onChange={set('legalGuardian')} placeholder="Full name(s)" />
        </FormField>
      </div>
    </div>
  )
}

export default function Section02ChildInformation({ formData, updateSection, currentSection, onPrev, onNext }) {
  const children = formData.children || []

  const handleChange = (index, field, value) => {
    const updated = children.map((c, i) => i === index ? { ...c, [field]: value } : c)
    updateSection('children', updated)
  }

  const addChild = () => {
    if (children.length < 5) updateSection('children', [...children, emptyChild()])
  }

  const removeChild = (index) => {
    updateSection('children', children.filter((_, i) => i !== index))
  }

  return (
    <SectionWrapper
      number={2}
      title="Child Information"
      description="Enter information for each child in your household. You may add up to 5 children."
    >
      {children.map((child, i) => (
        <ChildForm
          key={i}
          index={i}
          child={child}
          onChange={handleChange}
          onRemove={() => removeChild(i)}
          canRemove={children.length > 1}
        />
      ))}
      {children.length < 5 && (
        <button onClick={addChild} className="btn-add mt-2 mb-4">
          + Add Another Child
        </button>
      )}
      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
