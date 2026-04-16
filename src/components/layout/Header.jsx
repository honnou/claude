export default function Header({ lastSaved, onReset }) {
  const savedText = lastSaved
    ? `Last saved ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : 'Not yet saved'

  return (
    <header className="bg-white border-b border-gray-200 no-print">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary-700 leading-tight">
            Estate Planning Form
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Polyamorous Family Planning Tool</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-xs text-gray-400">{savedText}</span>
          <button
            onClick={onReset}
            className="text-xs text-gray-400 hover:text-red-600 transition-colors"
            title="Clear all saved data and start over"
          >
            Clear Data
          </button>
        </div>
      </div>
    </header>
  )
}
