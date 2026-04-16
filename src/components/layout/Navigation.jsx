import { SECTION_TITLES } from '../../data/initialFormData.js'

export default function Navigation({ currentSection, onPrev, onNext, onGoToNarrative, isLastSection }) {
  return (
    <div className="no-print flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
      <button
        onClick={onPrev}
        disabled={currentSection === 0}
        className="btn-secondary disabled:opacity-40"
      >
        ← Previous
      </button>

      <div className="flex gap-3">
        {isLastSection ? (
          <button onClick={onGoToNarrative} className="btn-primary">
            Generate Narrative →
          </button>
        ) : (
          <button onClick={onNext} className="btn-primary">
            Next: {SECTION_TITLES[currentSection + 1]} →
          </button>
        )}
      </div>
    </div>
  )
}
