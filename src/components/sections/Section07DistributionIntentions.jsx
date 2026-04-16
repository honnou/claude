import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextInput, TextareaInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'
import { emptyBeneficiary, emptyBequest } from '../../data/initialFormData.js'

function BeneficiaryRow({ item, index, onUpdate, onRemove, canRemove }) {
  return (
    <div className="array-item-card mb-3">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-medium text-gray-500">#{index + 1}</span>
        {canRemove && <button onClick={onRemove} className="btn-danger text-xs">Remove</button>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
        <FormField label="Full Name">
          <TextInput value={item.name} onChange={v => onUpdate(index, 'name', v)} placeholder="Full name" />
        </FormField>
        <FormField label="Relationship">
          <TextInput value={item.relationship} onChange={v => onUpdate(index, 'relationship', v)} placeholder="e.g., Partner, Child, Sibling" />
        </FormField>
        <FormField label="Share %" hint="All primary shares should total 100%">
          <TextInput value={item.percentage} onChange={v => onUpdate(index, 'percentage', v.replace(/[^0-9.]/g, ''))} placeholder="0" />
        </FormField>
      </div>
    </div>
  )
}

function makeUpdater(dist, updateSection, key, emptyFn) {
  const items = dist[key] || [emptyFn()]
  return {
    update: (i, field, val) => {
      const arr = [...items]
      arr[i] = { ...arr[i], [field]: val }
      updateSection('distribution', { ...dist, [key]: arr })
    },
    add: () => updateSection('distribution', { ...dist, [key]: [...items, emptyFn()] }),
    remove: (i) => updateSection('distribution', { ...dist, [key]: items.filter((_, idx) => idx !== i) }),
    items,
  }
}

export default function Section07DistributionIntentions({ formData, updateSection, currentSection, onPrev, onNext }) {
  const dist = formData.distribution || {}
  const setField = (field) => (val) => updateSection('distribution', { ...dist, [field]: val })

  const pb = makeUpdater(dist, updateSection, 'primaryBeneficiaries', emptyBeneficiary)
  const cb = makeUpdater(dist, updateSection, 'contingentBeneficiaries', emptyBeneficiary)

  const bequests = dist.specificBequests || [emptyBequest()]
  const updateBequest = (i, field, val) => {
    const arr = [...bequests]
    arr[i] = { ...arr[i], [field]: val }
    updateSection('distribution', { ...dist, specificBequests: arr })
  }
  const addBequest = () => updateSection('distribution', { ...dist, specificBequests: [...bequests, emptyBequest()] })
  const removeBequest = (i) => updateSection('distribution', { ...dist, specificBequests: bequests.filter((_, idx) => idx !== i) })

  // Validate total %
  const primaryTotal = pb.items.reduce((sum, b) => sum + (parseFloat(b.percentage) || 0), 0)

  return (
    <SectionWrapper
      number={7}
      title="Distribution Intentions"
      description="Who should receive your assets? Specify primary and contingent beneficiaries and any specific gifts."
    >
      {/* Primary Beneficiaries */}
      <div className="mb-6">
        <h3 className="subsection-title">Primary Beneficiaries</h3>
        {primaryTotal > 0 && (
          <div className={`mb-3 text-sm font-medium ${Math.abs(primaryTotal - 100) < 0.01 ? 'text-emerald-600' : 'text-amber-600'}`}>
            Total: {primaryTotal}% {Math.abs(primaryTotal - 100) < 0.01 ? '✓' : '(should equal 100%)'}
          </div>
        )}
        {pb.items.map((item, i) => (
          <BeneficiaryRow key={i} item={item} index={i} onUpdate={pb.update} onRemove={() => pb.remove(i)} canRemove={pb.items.length > 1} />
        ))}
        <button onClick={pb.add} className="btn-add">+ Add Beneficiary</button>
      </div>

      {/* Contingent Beneficiaries */}
      <div className="mb-6">
        <h3 className="subsection-title">Contingent Beneficiaries</h3>
        <p className="text-xs text-gray-500 mb-3">Receive assets only if primary beneficiaries predecease you.</p>
        {cb.items.map((item, i) => (
          <BeneficiaryRow key={i} item={item} index={i} onUpdate={cb.update} onRemove={() => cb.remove(i)} canRemove={cb.items.length > 1} />
        ))}
        <button onClick={cb.add} className="btn-add">+ Add Contingent Beneficiary</button>
      </div>

      {/* Specific Bequests */}
      <div className="mb-6">
        <h3 className="subsection-title">Specific Bequests</h3>
        <p className="text-xs text-gray-500 mb-3">Specific items (jewelry, heirlooms, etc.) you wish to leave to specific people.</p>
        {bequests.map((b, i) => (
          <div key={i} className="array-item-card mb-3">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-medium text-gray-500">#{i + 1}</span>
              {bequests.length > 1 && <button onClick={() => removeBequest(i)} className="btn-danger text-xs">Remove</button>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <FormField label="Item / Asset">
                <TextInput value={b.item} onChange={v => updateBequest(i, 'item', v)} placeholder="e.g., Grandmother's ring, vintage guitar" />
              </FormField>
              <FormField label="Recipient">
                <TextInput value={b.recipient} onChange={v => updateBequest(i, 'recipient', v)} placeholder="Full name" />
              </FormField>
            </div>
          </div>
        ))}
        <button onClick={addBequest} className="btn-add">+ Add Bequest</button>
      </div>

      <FormField label="Residual Estate Distribution" hint="What happens to anything not specifically distributed above?">
        <TextareaInput value={dist.residualEstateDistribution} onChange={setField('residualEstateDistribution')} rows={2}
          placeholder="e.g., Divide equally among surviving partners, hold in trust for children..." />
      </FormField>

      <FormField label="Child Support / Financial Provisions for Children">
        <TextareaInput value={dist.childSupportArrangements} onChange={setField('childSupportArrangements')} rows={2}
          placeholder="Describe any specific financial provisions for your children..." />
      </FormField>

      <FormField label="Charitable Giving">
        <TextareaInput value={dist.charitableGiving} onChange={setField('charitableGiving')} rows={2}
          placeholder="Any charitable bequests or causes you wish to support..." />
      </FormField>

      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
