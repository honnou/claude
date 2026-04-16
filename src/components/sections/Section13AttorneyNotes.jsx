import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextInput, TextareaInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'
import { DOCUMENTS_CHECKLIST } from '../../data/initialFormData.js'

export default function Section13AttorneyNotes({ formData, updateSection, currentSection, onPrev, onNext, onGoToNarrative }) {
  const notes = formData.attorneyNotes || {}
  const set = (field) => (val) => updateSection('attorneyNotes', { ...notes, [field]: val })

  const toggleDocument = (doc) => {
    const current = notes.documentsWanted || []
    const updated = current.includes(doc)
      ? current.filter(d => d !== doc)
      : [...current, doc]
    updateSection('attorneyNotes', { ...notes, documentsWanted: updated })
  }

  const documentsWanted = notes.documentsWanted || []

  return (
    <SectionWrapper
      number={13}
      title="Attorney Meeting Notes"
      description="Prepare for your attorney meeting. This section is yours to organize your thoughts."
    >
      {/* Documents Checklist */}
      <div className="mb-6">
        <h3 className="subsection-title">Documents I Want to Create</h3>
        <p className="text-xs text-gray-500 mb-4">Check all that apply. Your attorney will advise on what you actually need.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {DOCUMENTS_CHECKLIST.map(doc => (
            <label key={doc} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={documentsWanted.includes(doc)}
                onChange={() => toggleDocument(doc)}
                className="mt-0.5 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{doc}</span>
            </label>
          ))}
        </div>
      </div>

      <FormField label="Top Questions for My Attorney" hint="What do you most need answered or explained?">
        <TextareaInput value={notes.topQuestions} onChange={set('topQuestions')} rows={5}
          placeholder="List your most important questions. Example: How do we make sure all three of us have equal authority over healthcare decisions? What happens to our house if we break up? Can we all be legal guardians?" />
      </FormField>

      <FormField label="Concerns or Uncertainties" hint="What worries you? What feels unresolved?">
        <TextareaInput value={notes.concerns} onChange={set('concerns')} rows={4}
          placeholder="Any fears or concerns you want to address: legal recognition, family pushback, cost, making sure the kids are protected..." />
      </FormField>

      <FormField label="Unique Family Circumstances to Discuss" hint="Anything that makes your family situation unusual or complex">
        <TextareaInput value={notes.uniqueCircumstances} onChange={set('uniqueCircumstances')} rows={4}
          placeholder="Tell the attorney anything you think is unusual or important about your family that doesn't fit elsewhere..." />
      </FormField>

      <FormField label="Planned Meeting Date">
        <TextInput type="date" value={notes.meetingDate} onChange={set('meetingDate')} />
      </FormField>

      <FormField label="Additional Notes">
        <TextareaInput value={notes.additionalNotes} onChange={set('additionalNotes')} rows={3}
          placeholder="Anything else..." />
      </FormField>

      <Navigation
        currentSection={currentSection}
        onPrev={onPrev}
        onNext={onNext}
        isLastSection={true}
        onGoToNarrative={onGoToNarrative}
      />
    </SectionWrapper>
  )
}
