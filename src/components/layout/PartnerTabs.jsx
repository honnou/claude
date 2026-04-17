export default function PartnerTabs({ adults, activePartner, onChange }) {
  const tabs = adults.map((a, i) => ({
    label: a.firstName ? a.firstName : `Partner ${i + 1}`,
    filled: !!(a.firstName && a.email),
    index: i,
  }))

  return (
    <div className="bg-white border-b border-gray-200 no-print">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-1 py-2">
          <span className="text-xs text-gray-400 mr-2 shrink-0">Filling in as:</span>
          {tabs.map(tab => (
            <button
              key={tab.index}
              onClick={() => onChange(tab.index)}
              className={`
                flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150
                ${activePartner === tab.index
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100 border border-gray-200'}
              `}
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  tab.filled
                    ? activePartner === tab.index ? 'bg-primary-200' : 'bg-emerald-400'
                    : activePartner === tab.index ? 'bg-primary-400' : 'bg-gray-300'
                }`}
              />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
