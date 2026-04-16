export default function FormField({
  label,
  required = false,
  hint,
  error,
  children,
  className = '',
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function TextInput({ value, onChange, placeholder, type = 'text', required, disabled, className = '' }) {
  return (
    <input
      type={type}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`form-input ${className}`}
    />
  )
}

export function TextareaInput({ value, onChange, placeholder, rows = 4, className = '' }) {
  return (
    <textarea
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`form-input resize-y ${className}`}
    />
  )
}

export function SelectInput({ value, onChange, options, placeholder, className = '' }) {
  return (
    <select
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      className={`form-input ${className}`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(opt => (
        typeof opt === 'string'
          ? <option key={opt} value={opt}>{opt}</option>
          : <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}

export function RadioGroup({ value, onChange, options, name }) {
  return (
    <div className="flex flex-wrap gap-4">
      {options.map(opt => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}

export function CurrencyInput({ value, onChange, placeholder, className = '' }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
      <input
        type="text"
        inputMode="numeric"
        value={value || ''}
        onChange={e => onChange(e.target.value.replace(/[^0-9.]/g, ''))}
        placeholder={placeholder || '0'}
        className={`form-input pl-7 ${className}`}
      />
    </div>
  )
}
