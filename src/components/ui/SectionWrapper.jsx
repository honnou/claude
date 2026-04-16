export default function SectionWrapper({ number, title, description, children }) {
  return (
    <div className="form-section-card">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 text-sm font-bold flex items-center justify-center">
            {number}
          </span>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        {description && (
          <p className="text-sm text-gray-600 ml-11">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}
