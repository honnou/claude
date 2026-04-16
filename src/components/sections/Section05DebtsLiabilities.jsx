import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'
import { formatCurrency, calculateTotals } from '../../utils/calculations.js'

function DebtSection({ title, items, onAdd, onRemove, onUpdate, addLabel }) {
  return (
    <div className="mb-6">
      <h3 className="subsection-title">{title}</h3>
      {items.map((item, i) => (
        <div key={i} className="array-item-card mb-3">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-medium text-gray-500">#{i + 1}</span>
            {items.length > 1 && (
              <button onClick={() => onRemove(i)} className="btn-danger text-xs">Remove</button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
            <FormField label="Lender / Institution">
              <TextInput value={item.lender} onChange={v => onUpdate(i, 'lender', v)} placeholder="Lender name" />
            </FormField>
            <FormField label="Description">
              <TextInput value={item.description} onChange={v => onUpdate(i, 'description', v)} placeholder="Brief description" />
            </FormField>
            <FormField label="Outstanding Balance ($)">
              <TextInput value={item.balance} onChange={v => onUpdate(i, 'balance', v.replace(/[^0-9.]/g, ''))} placeholder="0" />
            </FormField>
          </div>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="btn-add"
      >
        {addLabel || '+ Add Another'}
      </button>
    </div>
  )
}

function makeUpdater(liabilities, updateSection, key) {
  const items = liabilities[key] || [{ lender: '', description: '', balance: '' }]
  return {
    update: (i, field, val) => {
      const arr = [...items]
      arr[i] = { ...arr[i], [field]: val }
      updateSection('liabilities', { ...liabilities, [key]: arr })
    },
    add: () => updateSection('liabilities', {
      ...liabilities,
      [key]: [...items, { lender: '', description: '', balance: '' }],
    }),
    remove: (i) => updateSection('liabilities', {
      ...liabilities,
      [key]: items.filter((_, idx) => idx !== i),
    }),
    items,
  }
}

export default function Section05DebtsLiabilities({ formData, updateSection, currentSection, onPrev, onNext }) {
  const liabilities = formData.liabilities || {}
  const totals = calculateTotals(formData)

  const mort = makeUpdater(liabilities, updateSection, 'mortgages')
  const pl = makeUpdater(liabilities, updateSection, 'personalLoans')
  const cc = makeUpdater(liabilities, updateSection, 'creditCards')
  const sl = makeUpdater(liabilities, updateSection, 'studentLoans')
  const od = makeUpdater(liabilities, updateSection, 'otherDebts')

  return (
    <SectionWrapper
      number={5}
      title="Debts & Liabilities"
      description="List all significant outstanding debts. This helps calculate your net estate value."
    >
      <DebtSection title="Mortgages" items={mort.items} onAdd={mort.add} onRemove={mort.remove} onUpdate={mort.update} addLabel="+ Add Mortgage" />
      <DebtSection title="Personal Loans" items={pl.items} onAdd={pl.add} onRemove={pl.remove} onUpdate={pl.update} addLabel="+ Add Loan" />
      <DebtSection title="Credit Cards" items={cc.items} onAdd={cc.add} onRemove={cc.remove} onUpdate={cc.update} addLabel="+ Add Card" />
      <DebtSection title="Student Loans" items={sl.items} onAdd={sl.add} onRemove={sl.remove} onUpdate={sl.update} addLabel="+ Add Loan" />
      <DebtSection title="Other Debts" items={od.items} onAdd={od.add} onRemove={od.remove} onUpdate={od.update} addLabel="+ Add Debt" />

      {/* Totals summary */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-amber-800 mb-3">Estate Value Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Assets</span>
            <span className="font-medium text-emerald-700">{formatCurrency(totals.totalAssets)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Liabilities</span>
            <span className="font-medium text-red-600">({formatCurrency(totals.totalLiabilities)})</span>
          </div>
          <div className="border-t border-amber-300 pt-2 flex justify-between font-bold text-base">
            <span className="text-amber-900">Net Estate Value</span>
            <span className={totals.netEstate >= 0 ? 'text-emerald-700' : 'text-red-600'}>
              {formatCurrency(totals.netEstate)}
            </span>
          </div>
        </div>
      </div>

      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
