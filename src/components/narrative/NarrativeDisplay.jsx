import { useState, useEffect } from 'react'
import { generateNarrative } from '../../utils/narrativeGenerator.js'
import { exportAsJSON, exportAsText, exportNarrativeAsPDF } from '../../utils/exportUtils.js'
import { calculateTotals, formatCurrency } from '../../utils/calculations.js'

function renderNarrative(text) {
  const paragraphs = text.split('\n\n').filter(p => p.trim())
  return paragraphs.map((para, i) => {
    if (para.startsWith('## ')) {
      return (
        <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3 font-sans border-b border-gray-200 pb-2">
          {para.replace('## ', '')}
        </h2>
      )
    }
    if (para.startsWith('  •') || para.startsWith('\n  •')) {
      const items = para.split('\n').filter(l => l.trim().startsWith('•'))
      return (
        <ul key={i} className="list-none space-y-1 mb-4 pl-2">
          {items.map((item, j) => (
            <li key={j} className="text-gray-800 leading-relaxed font-serif flex gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span>{item.replace('•', '').trim()}</span>
            </li>
          ))}
        </ul>
      )
    }
    return (
      <p key={i} className="text-gray-800 leading-relaxed font-serif mb-4">
        {para.trim()}
      </p>
    )
  })
}

export default function NarrativeDisplay({ formData, onBack }) {
  const [narrative, setNarrative] = useState('')
  const totals = calculateTotals(formData)

  useEffect(() => {
    const text = generateNarrative(formData)
    setNarrative(text)
  }, [formData])

  const wordCount = narrative.split(/\s+/).filter(Boolean).length

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 no-print">
        <button onClick={onBack} className="btn-secondary mb-4">
          ← Back to Form
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Family Estate Planning Narrative</h1>
        <p className="text-gray-500 text-sm">{wordCount.toLocaleString()} words · Generated from your form data</p>
      </div>

      {/* Export Actions */}
      <div className="flex flex-wrap gap-3 mb-8 no-print">
        <button
          onClick={() => exportAsJSON(formData)}
          className="btn-secondary flex items-center gap-2"
        >
          <span>⬇</span> Export JSON
        </button>
        <button
          onClick={() => exportAsText(formData, narrative)}
          className="btn-secondary flex items-center gap-2"
        >
          <span>⬇</span> Export Text
        </button>
        <button
          onClick={() => exportNarrativeAsPDF(narrative, formData)}
          className="btn-primary flex items-center gap-2"
        >
          <span>⬇</span> Download PDF
        </button>
        <button
          onClick={() => window.print()}
          className="btn-secondary flex items-center gap-2"
        >
          <span>🖨</span> Print
        </button>
      </div>

      {/* Estate Summary Card */}
      {totals.totalAssets > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8 no-print">
          <h2 className="text-lg font-bold text-primary-800 mb-4">Estate Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-primary-600 font-medium uppercase tracking-wide">Total Assets</p>
              <p className="text-2xl font-bold text-primary-900">{formatCurrency(totals.totalAssets)}</p>
            </div>
            <div>
              <p className="text-xs text-red-600 font-medium uppercase tracking-wide">Total Liabilities</p>
              <p className="text-2xl font-bold text-red-700">{formatCurrency(totals.totalLiabilities)}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide">Net Estate</p>
              <p className={`text-2xl font-bold ${totals.netEstate >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                {formatCurrency(totals.netEstate)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Narrative */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
        {/* Print header */}
        <div className="hidden print:block mb-8 border-b border-gray-300 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Family Estate Planning Narrative</h1>
          <p className="text-gray-500">Prepared {new Date().toLocaleDateString()}</p>
        </div>

        {narrative ? renderNarrative(narrative) : (
          <p className="text-gray-400 italic">Generating narrative...</p>
        )}

        {/* Print footer */}
        <div className="hidden print:block mt-12 pt-6 border-t border-gray-300 text-xs text-gray-400">
          <p>This narrative was generated from a pre-consultation intake form. It is not legal advice.</p>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="mt-8 flex flex-wrap gap-3 no-print">
        <button onClick={onBack} className="btn-secondary">← Back to Form</button>
        <button onClick={() => exportNarrativeAsPDF(narrative, formData)} className="btn-primary">
          Download PDF
        </button>
        <button onClick={() => exportAsJSON(formData)} className="btn-secondary">
          Export JSON Data
        </button>
      </div>

      <p className="mt-6 text-xs text-gray-400 no-print">
        This narrative is generated from your form responses and is intended as a pre-consultation summary.
        It is not legal advice. Please review it with your estate planning attorney.
      </p>
    </div>
  )
}
