import SectionWrapper from '../ui/SectionWrapper.jsx'
import FormField, { TextInput } from '../ui/FormField.jsx'
import Navigation from '../layout/Navigation.jsx'

function AdvisorCard({ title, advisorKey, advisors, updateSection }) {
  const advisor = advisors[advisorKey] || {}
  const set = (field) => (val) => updateSection('advisors', {
    ...advisors,
    [advisorKey]: { ...advisor, [field]: val }
  })

  return (
    <div className="array-item-card mb-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <FormField label="Name">
          <TextInput value={advisor.name} onChange={set('name')} placeholder="Full name" />
        </FormField>
        <FormField label="Firm / Company">
          <TextInput value={advisor.firm} onChange={set('firm')} placeholder="Firm or company name" />
        </FormField>
        <FormField label="Phone">
          <TextInput type="tel" value={advisor.phone} onChange={set('phone')} placeholder="(555) 555-5555" />
        </FormField>
        <FormField label="Email">
          <TextInput type="email" value={advisor.email} onChange={set('email')} placeholder="email@firm.com" />
        </FormField>
      </div>
    </div>
  )
}

export default function Section11ProfessionalAdvisors({ formData, updateSection, currentSection, onPrev, onNext }) {
  const advisors = formData.advisors || {}

  return (
    <SectionWrapper
      number={11}
      title="Professional Advisors"
      description="List your existing professional advisors so your estate planning attorney can coordinate with them."
    >
      <p className="text-sm text-gray-600 mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
        Your estate planning attorney may need to coordinate with your CPA, financial advisor, and insurance agent to ensure your plan is comprehensive and tax-efficient. If you don't have an advisor in a category, leave it blank.
      </p>

      <AdvisorCard title="CPA / Tax Advisor" advisorKey="cpa" advisors={advisors} updateSection={updateSection} />
      <AdvisorCard title="Financial Advisor / Planner" advisorKey="financialAdvisor" advisors={advisors} updateSection={updateSection} />
      <AdvisorCard title="Insurance Agent" advisorKey="insuranceAgent" advisors={advisors} updateSection={updateSection} />
      <AdvisorCard title="Other Advisor (Business Attorney, etc.)" advisorKey="otherAdvisor" advisors={advisors} updateSection={updateSection} />

      <Navigation currentSection={currentSection} onPrev={onPrev} onNext={onNext} isLastSection={false} />
    </SectionWrapper>
  )
}
