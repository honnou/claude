import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextareaInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'

export default function Section12SpecialConsiderations({ formData, updateSection, currentSection, onPrev, onNext }) {
  const sc = formData.specialConsiderations || {}
  const set = (field) => (val) => updateSection('specialConsiderations', { ...sc, [field]: val })

  const fields = [
    {
      field: 'healthIssues',
      label: 'Health Issues',
      placeholder: 'Any significant health conditions that affect your planning (terminal illness, disability, long-term care needs)...',
    },
    {
      field: 'priorMarriages',
      label: 'Prior Marriages',
      placeholder: 'Any prior marriages among the three adults? Divorce decrees, alimony obligations, etc....',
    },
    {
      field: 'priorChildren',
      label: 'Children from Prior Relationships',
      placeholder: 'Any children from outside this triad who have legal or financial claims on your estate?',
    },
    {
      field: 'legalHistory',
      label: 'Relevant Legal History',
      placeholder: 'Any judgments, bankruptcies, pending litigation, or other legal matters that affect your assets...',
    },
    {
      field: 'immigrationStatus',
      label: 'Immigration / Citizenship Status',
      placeholder: 'If any partner is not a U.S. citizen, note that here — it affects estate tax rules and planning options.',
    },
    {
      field: 'specialNeedsFamily',
      label: 'Special Needs Family Members',
      placeholder: 'Any family members with special needs who require special trust planning (children, aging parents)...',
    },
    {
      field: 'businessSuccession',
      label: 'Business Succession',
      placeholder: 'If you own a business, what happens to it when you die or become incapacitated? Any buy-sell agreements?',
    },
    {
      field: 'digitalAssets',
      label: 'Digital Assets',
      placeholder: 'Cryptocurrency, online accounts, social media, digital businesses, NFTs — who gets access and how?',
    },
    {
      field: 'petCare',
      label: 'Pets',
      placeholder: 'Do you want to make provisions for pet care? Who should care for your pets and with what resources?',
    },
    {
      field: 'other',
      label: 'Other Relevant Circumstances',
      placeholder: 'Anything else your attorney should know that doesn\'t fit another category...',
    },
  ]

  return (
    <SectionWrapper
      number={12}
      title="Special Considerations"
      description="Flag any circumstances that fall outside the standard questions. Complete only the fields that apply to you."
    >
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-xs text-amber-800">
          Leave fields blank if they don't apply. This section surfaces issues that often get overlooked but can significantly affect your plan.
        </p>
      </div>

      {fields.map(({ field, label, placeholder }) => (
        <FormField key={field} label={label}>
          <TextareaInput
            value={sc[field]}
            onChange={set(field)}
            rows={2}
            placeholder={placeholder}
          />
        </FormField>
      ))}

      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
