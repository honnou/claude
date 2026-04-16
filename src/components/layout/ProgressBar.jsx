import { SECTION_TITLES } from '../../data/initialFormData.js'

export default function ProgressBar({ currentSection, onNavigate }) {
  const total = SECTION_TITLES.length
  const pct = Math.round(((currentSection + 1) / total) * 100)

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 no-print">
      <div className="max-w-4xl mx-auto">
        {/* Numeric indicator + pct */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Section {currentSection + 1} of {total}:&nbsp;
            <span className="text-gray-900">{SECTION_TITLES[currentSection]}</span>
          </span>
          <span className="text-sm text-gray-500">{pct}% complete</span>
        </div>

        {/* Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Section dots (desktop) */}
        <div className="hidden md:flex gap-1 flex-wrap">
          {SECTION_TITLES.map((title, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              title={title}
              className={`h-2 flex-1 rounded-full transition-colors duration-200 min-w-[8px] ${
                i < currentSection
                  ? 'bg-primary-400'
                  : i === currentSection
                  ? 'bg-primary-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
