import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextInput, SelectInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'
import { formatCurrency, calculateTotals } from '../../utils/calculations.js'
import {
  emptyRealProperty, emptyBankAccount, emptyInvestmentAccount,
  emptyRetirementAccount, emptyLifeInsurance, emptyBusinessInterest, emptyOtherAsset
} from '../../data/initialFormData.js'

function ArraySection({ title, items, onAdd, onRemove, onUpdate, emptyFn, renderItem, addLabel }) {
  return (
    <div className="mb-6">
      <h3 className="subsection-title">{title}</h3>
      {items.map((item, i) => (
        <div key={i} className="array-item-card mb-3">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-medium text-gray-500">#{i + 1}</span>
            {items.length > 1 && (
              <button onClick={() => onRemove(i)} className="btn-danger text-xs">Remove</button>
            )}
          </div>
          {renderItem(item, (field, val) => onUpdate(i, field, val))}
        </div>
      ))}
      <button onClick={onAdd} className="btn-add">{addLabel || '+ Add Another'}</button>
    </div>
  )
}

function makeUpdater(assets, updateSection, key) {
  return {
    update: (i, field, val) => {
      const arr = [...(assets[key] || [])]
      arr[i] = { ...arr[i], [field]: val }
      updateSection('assets', { ...assets, [key]: arr })
    },
    add: () => updateSection('assets', { ...assets, [key]: [...(assets[key] || []), {}] }),
    remove: (i) => updateSection('assets', { ...assets, [key]: (assets[key] || []).filter((_, idx) => idx !== i) }),
  }
}

export default function Section04AssetInventory({ formData, updateSection, currentSection, onPrev, onNext }) {
  const assets = formData.assets || {}
  const totals = calculateTotals(formData)

  const mk = (key) => makeUpdater(assets, updateSection, key)
  const rp = mk('realProperty')
  const ba = mk('bankAccounts')
  const ia = mk('investmentAccounts')
  const ra = mk('retirementAccounts')
  const li = mk('lifeInsurance')
  const bi = mk('businessInterests')
  const veh = mk('vehicles')
  const oa = mk('otherAssets')

  return (
    <SectionWrapper
      number={4}
      title="Asset Inventory"
      description="List all significant assets. Totals are calculated automatically."
    >
      {/* Real Property */}
      <ArraySection
        title="Real Property"
        items={assets.realProperty || [emptyRealProperty()]}
        onAdd={rp.add} onRemove={rp.remove} onUpdate={rp.update}
        addLabel="+ Add Property"
        renderItem={(item, set) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <FormField label="Street Address" className="sm:col-span-2">
              <TextInput value={item.address} onChange={v => set('address', v)} placeholder="123 Main St" />
            </FormField>
            <FormField label="City">
              <TextInput value={item.city} onChange={v => set('city', v)} placeholder="City" />
            </FormField>
            <FormField label="State">
              <TextInput value={item.state} onChange={v => set('state', v)} placeholder="ST" maxLength={2} />
            </FormField>
            <FormField label="Estimated Value ($)">
              <TextInput value={item.value} onChange={v => set('value', v.replace(/[^0-9.]/g, ''))} placeholder="0" />
            </FormField>
            <FormField label="Outstanding Mortgage ($)">
              <TextInput value={item.mortgage} onChange={v => set('mortgage', v.replace(/[^0-9.]/g, ''))} placeholder="0" />
            </FormField>
            <FormField label="Owner(s)" className="sm:col-span-2">
              <TextInput value={item.owners} onChange={v => set('owners', v)} placeholder="e.g., All three, or specific names" />
            </FormField>
          </div>
        )}
      />

      {/* Bank Accounts */}
      <ArraySection
        title="Bank & Checking/Savings Accounts"
        items={assets.bankAccounts || [emptyBankAccount()]}
        onAdd={ba.add} onRemove={ba.remove} onUpdate={ba.update}
        addLabel="+ Add Account"
        renderItem={(item, set) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <FormField label="Institution">
              <TextInput value={item.institution} onChange={v => set('institution', v)} placeholder="Bank name" />
            </FormField>
            <FormField label="Account Type">
              <SelectInput value={item.accountType} onChange={v => set('accountType', v)}
                options={['Checking','Savings','Money Market','CD','Other']} placeholder="Select..." />
            </FormField>
            <FormField label="Approximate Balance ($)">
              <TextInput value={item.balance} onChange={v => set('balance', v.replace(/[^0-9.]/g, ''))} placeholder="0" />
            </FormField>
            <FormField label="Current Beneficiary">
              <TextInput value={item.beneficiary} onChange={v => set('beneficiary', v)} placeholder="Name or 'None'" />
            </FormField>
          </div>
        )}
      />

      {/* Investment Accounts */}
      <ArraySection
        title="Investment & Brokerage Accounts"
        items={assets.investmentAccounts || [emptyInvestmentAccount()]}
        onAdd={ia.add} onRemove={ia.remove} onUpdate={ia.update}
        addLabel="+ Add Account"
        renderItem={(item, set) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <FormField label="Institution">
              <TextInput value={item.institution} onChange={v => set('institution', v)} placeholder="Brokerage name" />
            </FormField>
            <FormField label="Account Type">
              <SelectInput value={item.type} onChange={v => set('type', v)}
                options={['Brokerage','Mutual Fund','ETF Portfolio','Other']} placeholder="Select..." />
            </FormField>
            <FormField label="Approximate Balance ($)">
              <TextInput value={item.balance} onChange={v => set('balance', v.replace(/[^0-9.]/g, ''))} placeholder="0" />
            </FormField>
            <FormField label="Current Beneficiary">
              <TextInput value={item.beneficiary} onChange={v => set('beneficiary', v)} placeholder="Name or 'None'" />
            </FormField>
          </div>
        )}
      />

      {/* Retirement Accounts */}
      <ArraySection
        title="Retirement Accounts"
        items={assets.retirementAccounts || [emptyRetirementAccount()]}
        onAdd={ra.add} onRemove={ra.remove} onUpdate={ra.update}
        addLabel="+ Add Account"
        renderItem={(item, set) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <FormField label="Institution">
              <TextInput value={item.institution} onChange={v => set('institution', v)} placeholder="Provider name" />
            </FormField>
            <FormField label="Account Type">
              <SelectInput value={item.type} onChange={v => set('type', v)}
                options={['401(k)','IRA','Roth IRA','403(b)','SEP IRA','SIMPLE IRA','Pension','Other']} placeholder="Select..." />
            </FormField>
            <FormField label="Approximate Balance ($)">
              <TextInput value={item.balance} onChange={v => set('balance', v.replace(/[^0-9.]/g, ''))} placeholder="0" />
            </FormField>
            <FormField label="Current Beneficiary">
              <TextInput value={item.beneficiary} onChange={v => set('beneficiary', v)} placeholder="Name or 'None'" />
            </FormField>
          </div>
        )}
      />

      {/* Life Insurance */}
      <ArraySection
        title="Life Insurance Policies"
        items={assets.lifeInsurance || [emptyLifeInsurance()]}
        onAdd={li.add} onRemove={li.remove} onUpdate={li.update}
        addLabel="+ Add Policy"
        renderItem={(item, set) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <FormField label="Insurance Provider">
              <TextInput value={item.provider} onChange={v => set('provider', v)} placeholder="Company name" />
            </FormField>
            <FormField label="Policy Type">
              <SelectInput value={item.policyType} onChange={v => set('policyType', v)}
                options={['Term','Whole Life','Universal Life','Variable','Other']} placeholder="Select..." />
            </FormField>
            <FormField label="Face Value / Death Benefit ($)">
              <TextInput value={item.faceValue} onChange={v => set('faceValue', v.replace(/[^0-9.]/g, ''))} placeholder="0" />
            </FormField>
            <FormField label="Policy Owner">
              <TextInput value={item.owner} onChange={v => set('owner', v)} placeholder="Name" />
            </FormField>
            <FormField label="Current Beneficiary" className="sm:col-span-2">
              <TextInput value={item.beneficiary} onChange={v => set('beneficiary', v)} placeholder="Name(s)" />
            </FormField>
          </div>
        )}
      />

      {/* Business Interests */}
      <ArraySection
        title="Business Interests"
        items={assets.businessInterests || [emptyBusinessInterest()]}
        onAdd={bi.add} onRemove={bi.remove} onUpdate={bi.update}
        addLabel="+ Add Business"
        renderItem={(item, set) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <FormField label="Business Name">
              <TextInput value={item.name} onChange={v => set('name', v)} placeholder="Business name" />
            </FormField>
            <FormField label="Entity Type">
              <SelectInput value={item.type} onChange={v => set('type', v)}
                options={['LLC','S-Corp','C-Corp','Partnership','Sole Proprietorship','Other']} placeholder="Select..." />
            </FormField>
            <FormField label="Ownership %">
              <TextInput value={item.ownershipPct} onChange={v => set('ownershipPct', v.replace(/[^0-9.]/g, ''))} placeholder="100" />
            </FormField>
            <FormField label="Estimated Value ($)">
              <TextInput value={item.estimatedValue} onChange={v => set('estimatedValue', v.replace(/[^0-9.]/g, ''))} placeholder="0" />
            </FormField>
          </div>
        )}
      />

      {/* Vehicles */}
      <ArraySection
        title="Vehicles"
        items={assets.vehicles || [{ description: '', value: '', owners: '' }]}
        onAdd={veh.add} onRemove={veh.remove} onUpdate={veh.update}
        addLabel="+ Add Vehicle"
        renderItem={(item, set) => (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
            <FormField label="Description" className="sm:col-span-1">
              <TextInput value={item.description} onChange={v => set('description', v)} placeholder="2020 Honda Civic" />
            </FormField>
            <FormField label="Estimated Value ($)">
              <TextInput value={item.value} onChange={v => set('value', v.replace(/[^0-9.]/g, ''))} placeholder="0" />
            </FormField>
            <FormField label="Owner(s)">
              <TextInput value={item.owners} onChange={v => set('owners', v)} placeholder="Name(s)" />
            </FormField>
          </div>
        )}
      />

      {/* Other Assets */}
      <ArraySection
        title="Other Assets (Jewelry, Collections, Art, etc.)"
        items={assets.otherAssets || [emptyOtherAsset()]}
        onAdd={oa.add} onRemove={oa.remove} onUpdate={oa.update}
        addLabel="+ Add Asset"
        renderItem={(item, set) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <FormField label="Description">
              <TextInput value={item.description} onChange={v => set('description', v)} placeholder="Describe the asset" />
            </FormField>
            <FormField label="Estimated Value ($)">
              <TextInput value={item.value} onChange={v => set('value', v.replace(/[^0-9.]/g, ''))} placeholder="0" />
            </FormField>
          </div>
        )}
      />

      {/* Totals summary */}
      <div className="mt-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-primary-800 mb-3">Asset Summary</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            ['Real Property', totals.realPropertyTotal],
            ['Bank Accounts', totals.bankTotal],
            ['Investments', totals.investmentTotal],
            ['Retirement', totals.retirementTotal],
            ['Business Interests', totals.businessTotal],
            ['Vehicles', totals.vehicleTotal],
            ['Other Assets', totals.otherAssetTotal],
          ].map(([label, val]) => val > 0 && (
            <div key={label} className="flex justify-between">
              <span className="text-gray-600">{label}</span>
              <span className="font-medium text-gray-900">{formatCurrency(val)}</span>
            </div>
          ))}
          <div className="col-span-2 border-t border-primary-300 pt-2 mt-1 flex justify-between font-semibold">
            <span className="text-primary-800">Total Assets</span>
            <span className="text-primary-900">{formatCurrency(totals.totalAssets)}</span>
          </div>
          {totals.insuranceTotal > 0 && (
            <div className="col-span-2 flex justify-between text-xs text-gray-500">
              <span>Life Insurance (death benefit, not current asset)</span>
              <span>{formatCurrency(totals.insuranceTotal)}</span>
            </div>
          )}
        </div>
      </div>

      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
