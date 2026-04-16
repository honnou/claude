import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextInput, TextareaInput, SelectInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'

function adultLabel(formData, i) {
  const a = formData.adults?.[i]
  return a?.firstName || `Adult ${i + 1}`
}

const FILING_STATUS = [
  { value: 'single', label: 'Single' },
  { value: 'married-jointly', label: 'Married Filing Jointly' },
  { value: 'married-separately', label: 'Married Filing Separately' },
  { value: 'head-of-household', label: 'Head of Household' },
  { value: 'qualifying-widow', label: 'Qualifying Widow(er)' },
]

export default function Section10TaxesFinancial({ formData, updateSection, currentSection, onPrev, onNext }) {
  const taxes = formData.taxes || {}
  const set = (field) => (val) => updateSection('taxes', { ...taxes, [field]: val })

  const incomes = [
    { label: adultLabel(formData, 0), incomeField: 'adult1Income', statusField: 'adult1FilingStatus' },
    { label: adultLabel(formData, 1), incomeField: 'adult2Income', statusField: 'adult2FilingStatus' },
    { label: adultLabel(formData, 2), incomeField: 'adult3Income', statusField: 'adult3FilingStatus' },
  ]

  const combinedIncome = incomes.reduce((sum, { incomeField }) => {
    return sum + (parseFloat(String(taxes[incomeField] || '').replace(/[^0-9.]/g, '')) || 0)
  }, 0)

  return (
    <SectionWrapper
      number={10}
      title="Taxes & Financial Planning"
      description="Income and tax information helps assess estate tax exposure and financial planning needs."
    >
      <div className="mb-6">
        <h3 className="subsection-title">Income & Tax Filing Status</h3>
        {incomes.map(({ label, incomeField, statusField }) => (
          <div key={incomeField} className="array-item-card mb-3">
            <p className="text-sm font-semibold text-gray-700 mb-3">{label}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <FormField label="Annual Income ($)">
                <TextInput value={taxes[incomeField]} onChange={set(incomeField)}
                  placeholder="0" />
              </FormField>
              <FormField label="Tax Filing Status">
                <SelectInput value={taxes[statusField]} onChange={set(statusField)}
                  options={FILING_STATUS} placeholder="Select status..." />
              </FormField>
            </div>
          </div>
        ))}

        {combinedIncome > 0 && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mt-3">
            <p className="text-sm text-primary-800">
              Combined Household Income:{' '}
              <span className="font-bold">
                ${combinedIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="subsection-title">Estate Tax Considerations</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> The federal estate tax exemption is currently $13.61 million per individual (2024).
            Most estates do not owe federal estate tax. However, some states have lower exemptions.
            Your attorney can advise on your specific situation.
          </p>
        </div>
        <FormField label="Estate Tax Exposure Notes">
          <TextareaInput value={taxes.estimatedEstateTaxExposure} onChange={set('estimatedEstateTaxExposure')} rows={3}
            placeholder="Any known estate tax concerns, state-specific issues, or large anticipated inheritances..." />
        </FormField>
      </div>

      <FormField label="Gifting Strategy" hint="Do you currently make annual gifts, or are you considering a gifting strategy to reduce estate size?">
        <TextareaInput value={taxes.giftingStrategy} onChange={set('giftingStrategy')} rows={3}
          placeholder="Describe any current or planned gifting (annual exclusion gifts, 529 contributions, etc.)" />
      </FormField>

      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
