import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextareaInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'

const PROMPTS = [
  {
    field: 'howWeMet',
    label: 'How did you meet?',
    placeholder: 'Tell us how the three of you came together — where, when, and what the early days looked like.',
    rows: 4,
  },
  {
    field: 'howFamilyFormed',
    label: 'How did your family take its current form?',
    placeholder: 'How did your relationship evolve into the committed family structure you have today? Were there defining moments, conversations, or decisions that shaped this?',
    rows: 4,
  },
  {
    field: 'whyPolyamory',
    label: 'Why this structure?',
    placeholder: 'What drew you to polyamory? What makes this the right structure for your family? This isn\'t about justification — it\'s about helping your attorney understand who you are.',
    rows: 4,
  },
  {
    field: 'whatFamilyMeans',
    label: 'What does this family mean to each of you?',
    placeholder: 'How would each of you describe what this family means — its values, its commitments, what you\'ve built together?',
    rows: 4,
  },
  {
    field: 'dayToDayLife',
    label: 'Describe your day-to-day life',
    placeholder: 'What does a typical week look like in your household? Who does what? How do you share parenting, finances, domestic life?',
    rows: 4,
  },
  {
    field: 'whyEstatePlanning',
    label: 'What brought you here?',
    placeholder: 'What prompted you to seek estate planning now? Was there a specific event, life change, or conversation that made this feel urgent?',
    rows: 3,
  },
  {
    field: 'whatWantProtected',
    label: 'What do you most want your estate plan to protect or communicate?',
    placeholder: 'If your plan could do one thing above all — protect a person, secure a future, communicate a value — what would it be?',
    rows: 3,
  },
  {
    field: 'additionalContext',
    label: 'Anything else your attorney should know about your story?',
    placeholder: 'Is there anything about your history, your relationships, or your family that would help your attorney understand the full picture?',
    rows: 3,
  },
]

export default function SectionStory({ formData, updateSection, currentSection, onPrev, onNext }) {
  const story = formData.story || {}
  const set = (field) => (val) => updateSection('story', { ...story, [field]: val })

  const filledCount = PROMPTS.filter(p => story[p.field]?.trim()).length

  return (
    <SectionWrapper
      number={2}
      title="Our Story"
      description="This section is the heart of your narrative. Write in your own voice — your answers here will be folded directly into the family narrative document. There are no wrong answers."
    >
      <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-violet-800 font-medium mb-1">How this is used</p>
        <p className="text-xs text-violet-700 leading-relaxed">
          Your answers here are woven directly into the narrative generated at the end of this form.
          The more you share, the more personal and accurate the narrative will be. You can skip prompts
          that don't apply or that you'd prefer to discuss in person.
        </p>
        {filledCount > 0 && (
          <p className="text-xs text-violet-600 mt-2 font-medium">
            {filledCount} of {PROMPTS.length} prompts answered
          </p>
        )}
      </div>

      {PROMPTS.map(({ field, label, placeholder, rows }) => (
        <FormField key={field} label={label}>
          <TextareaInput
            value={story[field]}
            onChange={set(field)}
            placeholder={placeholder}
            rows={rows}
          />
        </FormField>
      ))}

      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
