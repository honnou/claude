import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextInput, TextareaInput, SelectInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'

const FILING_STATUS = [
  { value: 'single', label: 'Single' },
  { value: 'married-jointly', label: 'Married Filing Jointly' },
  { value: 'married-separately', label: 'Married Filing Separately' },
  { value: 'head-of-household', label: 'Head of Household' },
  { value: 'qualifying-widow', label: 'Qualifying Widow(er)' },
]

export default function Section10TaxesFinancial({
  formData, updateSection, currentSection, onPrev, onNext, activePartner,
}) {
  const taxes = formData.taxes || {}
  const set = (field) => (val) => updateSection('taxes', { ...taxes, [field]: val })

  const adults = formData.adults || []
  const me = adults[activePartner] || {}
  const myName = me.firstName || `Partner ${activePartner + 1}`
  const p = activePartner + 1  // 1-based field prefix

  // Combined income across all three for display
  const combinedIncome = [1, 2, 3].reduce((sum, n) => {
    return sum + (parseFloat(String(taxes[`adult${n}Income`] || '').replace(/[^0-9.]/g, '')) || 0)
  }, 0)

  return (
    <SectionWrapper
      number={11}
      title={`${myName}'s Income & Tax Information`}
      description="Each partner should fill in their own income and filing status. Use the partner tabs above to switch."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 mb-6">
        <FormField label="Annual Income ($)">
          <TextInput
            value={taxes[`adult${p}Income`]}
            onChange={set(`adult${p}Income`)}
            placeholder="0"
          />
        </FormField>
        <FormField label="Tax Filing Status">
          <SelectInput
            value={taxes[`adult${p}FilingStatus`]}
            onChange={set(`adult${p}FilingStatus`)}
            options={FILING_STATUS}
            placeholder="Select status…"
          />
        </FormField>
      </div>

      {combinedIncome > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-primary-800">
            Combined Household Income (all partners):{' '}
            <span className="font-bold">
              ${combinedIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </span>
          </p>
        </div>
      )}

      {/* Shared tax notes */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
          Household tax notes (shared)
        </p>

        <div className="mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> The federal estate tax exemption is currently $13.61 million per individual (2024).
              Most estates do not owe federal estate tax. However, some states have lower exemptions.
            </p>
          </div>
          <FormField label="Estate Tax Considerations">
            <TextareaInput
              value={taxes.estimatedEstateTaxExposure}
              onChange={set('estimatedEstateTaxExposure')}
              rows={3}
              placeholder="Any known estate tax concerns, state-specific issues, or large anticipated inheritances…"
            />
          </FormField>
        </div>

        <FormField label="Gifting Strategy">
          <TextareaInput
            value={taxes.giftingStrategy}
            onChange={set('giftingStrategy')}
            rows={3}
            placeholder="Any current or planned gifting (annual exclusion gifts, 529 contributions, etc.)"
          />
        </FormField>
      </div>

      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
