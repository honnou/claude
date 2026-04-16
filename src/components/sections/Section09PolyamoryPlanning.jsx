import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextInput, TextareaInput, SelectInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'

const STRUCTURE_OPTIONS = [
  { value: 'triad', label: 'Triad (three partners, all connected)' },
  { value: 'vee', label: 'Vee (one hinge partner)' },
  { value: 'quad', label: 'Quad (four partners)' },
  { value: 'hierarchical', label: 'Hierarchical polyamory' },
  { value: 'non-hierarchical', label: 'Non-hierarchical polyamory' },
  { value: 'kitchen-table', label: 'Kitchen table polyamory' },
  { value: 'parallel', label: 'Parallel polyamory' },
  { value: 'other', label: 'Other / prefer to describe' },
]

export default function Section09PolyamoryPlanning({ formData, updateSection, currentSection, onPrev, onNext }) {
  const poly = formData.polyamory || {}
  const set = (field) => (val) => updateSection('polyamory', { ...poly, [field]: val })

  return (
    <SectionWrapper
      number={9}
      title="Polyamory-Specific Planning"
      description="This section captures the unique aspects of your relationship structure that directly affect your estate plan."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 mb-4">
        <FormField label="Relationship Structure">
          <SelectInput value={poly.relationshipStructure} onChange={set('relationshipStructure')}
            options={STRUCTURE_OPTIONS} placeholder="Select structure..." />
        </FormField>
        {poly.relationshipStructure === 'other' && (
          <FormField label="Describe Your Structure">
            <TextInput value={poly.relationshipStructureOther} onChange={set('relationshipStructureOther')} placeholder="Describe how your relationship works" />
          </FormField>
        )}
        <FormField label="How Long Have You Been Together?" hint="e.g., '3 years', 'Since 2019'">
          <TextInput value={poly.yearsTogethers} onChange={set('yearsTogethers')} placeholder="e.g., 5 years" />
        </FormField>
        <FormField label="Do All Three Partners Cohabitate?">
          <SelectInput value={poly.cohabitation} onChange={set('cohabitation')}
            options={[
              { value: 'yes', label: 'Yes, all three live together' },
              { value: 'partial', label: 'Partial — some cohabitate' },
              { value: 'no', label: 'No — separate residences' },
            ]}
            placeholder="Select..."
          />
        </FormField>
        <FormField label="Co-Parenting Arrangement">
          <SelectInput value={poly.coParentingArrangement} onChange={set('coParentingArrangement')}
            options={[
              { value: 'all-three', label: 'All three adults co-parent equally' },
              { value: 'two-primary', label: 'Two primary parents, one supporting' },
              { value: 'bio-parents', label: 'Biological parents are primary' },
              { value: 'legal-only', label: 'Legally recognized parents only' },
              { value: 'no-children', label: 'No children' },
              { value: 'other', label: 'Other' },
            ]}
            placeholder="Select..."
          />
        </FormField>
        <FormField label="Household Asset Ownership">
          <SelectInput value={poly.householdAssetOwnership} onChange={set('householdAssetOwnership')}
            options={[
              { value: 'joint-all', label: 'Jointly owned by all three' },
              { value: 'joint-two', label: 'Jointly owned by two partners' },
              { value: 'individual', label: 'Individually owned' },
              { value: 'mixed', label: 'Mixed — varies by asset' },
            ]}
            placeholder="Select..."
          />
        </FormField>
      </div>

      <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-violet-800 font-medium mb-1">Why this matters</p>
        <p className="text-xs text-violet-700">Your relationship structure, cohabitation status, and how you hold assets together directly shape which legal documents you need and how they should be drafted. The more detail you provide here, the more tailored your estate plan will be.</p>
      </div>

      <FormField label="Your Relationship Story" hint="How did you meet? How did your family take its current form? This will be used in your narrative.">
        <TextareaInput value={poly.relationshipStory} onChange={set('relationshipStory')} rows={5}
          placeholder="Tell us how you met and how your family came together. This is your story—tell it in your own words." />
      </FormField>

      <FormField label="Why This Structure?" hint="What drew you to polyamory? Why does this structure work for your family?">
        <TextareaInput value={poly.whyPolyamory} onChange={set('whyPolyamory')} rows={4}
          placeholder="Why did you choose this relationship structure? What makes it right for your family?" />
      </FormField>

      <FormField label="Day-to-Day Life" hint="What does your household life look like? This context helps the narrative feel grounded.">
        <TextareaInput value={poly.dayToDayLife} onChange={set('dayToDayLife')} rows={4}
          placeholder="Describe a typical day or week in your household..." />
      </FormField>

      <FormField label="Why Are You Seeking Estate Planning Now?" hint="What prompted this? Any specific event or concern?">
        <TextareaInput value={poly.whyEstatePlanning} onChange={set('whyEstatePlanning')} rows={3}
          placeholder="What brought you here? Was there a specific event, concern, or milestone that motivated this?" />
      </FormField>

      <FormField
        label="Separation / Breakup Contingencies"
        hint="What should happen to shared assets and co-parenting if the relationship structure changes?"
      >
        <TextareaInput value={poly.breakupContingencyPlan} onChange={set('breakupContingencyPlan')} rows={4}
          placeholder="Describe your intentions: who keeps the house, how shared finances are divided, what co-parenting looks like if partners separate..." />
      </FormField>

      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
