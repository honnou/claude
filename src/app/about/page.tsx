import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About | Nightrider Notary - Professional After-Hours Services',
  description: 'Learn about Nightrider Notary - professional, ethical, and reliable document services available when you need them most.',
}

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-midnight-900 text-white py-16">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Nightrider Notary</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional document services built on reliability, ethics, and availability when you need it most.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-midnight-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              Nightrider Notary exists to serve legal professionals, estate planners, and individuals who need reliable document services outside traditional business hours. We understand that important paperwork doesn't always fit into a 9-to-5 schedule, and time-sensitive documents can't wait until Monday morning.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Founded on the principle that professional service should be accessible when you need it, we provide secure document courier services now, with mobile notary services launching in Q2 2026.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-midnight-900 mb-12 text-center">Our Core Values</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Reliability */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-midnight-900 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-midnight-900 mb-3">Reliability</h3>
                <p className="text-gray-700">
                  When we commit to a pickup or delivery, we follow through. Your documents are handled with professional care, and we maintain clear communication throughout the process. No surprises, no excuses.
                </p>
              </div>

              {/* Ethics */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-midnight-900 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-midnight-900 mb-3">Ethics</h3>
                <p className="text-gray-700">
                  We maintain strict ethical boundaries. No conflicts of interest, no shortcuts, no compromises on professional standards. Our notary services (when launched) will adhere fully to Washington State law and best practices.
                </p>
              </div>

              {/* Professionalism */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-midnight-900 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-midnight-900 mb-3">Professionalism</h3>
                <p className="text-gray-700">
                  From secure document handling to proper chain-of-custody documentation, we approach every job with the same professional standards you'd expect during business hours. Insured, licensed, and accountable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why After-Hours */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-midnight-900 mb-6">Why After-Hours?</h2>
            <p className="text-lg text-gray-700 mb-6">
              The "Nightrider" name isn't just branding - it's a commitment to being available when traditional services aren't. Many professionals work late, clients have scheduling conflicts, and time-sensitive documents don't respect business hours.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              By specializing in evening and weekend availability, we fill a genuine need in the Auburn area's legal and estate planning community. Estate attorneys working with elderly clients often need flexibility beyond 9-5. Fiduciaries coordinating across multiple parties need options that fit everyone's schedule.
            </p>
            <p className="text-lg text-gray-700">
              That's where we come in.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials & Insurance */}
      <section className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-midnight-900 mb-8 text-center">Licensed, Insured, Professional</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg border-2 border-midnight-900">
                <h3 className="text-xl font-bold text-midnight-900 mb-4">Current Coverage</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><strong>General Liability Insurance:</strong> $1M coverage</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><strong>Commercial Auto Insurance:</strong> Full coverage for business operations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><strong>Auburn Business License:</strong> Properly registered and compliant</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-blue-600">
                <h3 className="text-xl font-bold text-midnight-900 mb-4">Coming Q2 2026</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700"><strong>WA Notary Commission:</strong> 4-year term, currently in application process</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700"><strong>Notary E&O Insurance:</strong> Professional liability coverage</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700"><strong>Notary Bond:</strong> Required surety bond filed with WA State</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-midnight-50 border-l-4 border-midnight-900 p-6">
              <h4 className="font-bold text-midnight-900 mb-2">Your Protection Matters</h4>
              <p className="text-gray-700">
                We maintain professional insurance coverage not because it's required (though it often is), but because it's the right thing to do. When you entrust us with important documents, you deserve the peace of mind that comes with working with a fully insured professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Standards */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-midnight-900 mb-6">Our Service Standards</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-gold-500 pl-6">
                <h3 className="text-xl font-bold text-midnight-900 mb-2">Clear Communication</h3>
                <p className="text-gray-700">
                  We confirm pickup and delivery times, provide updates when requested, and maintain transparency throughout every job. You'll never wonder where your documents are.
                </p>
              </div>

              <div className="border-l-4 border-gold-500 pl-6">
                <h3 className="text-xl font-bold text-midnight-900 mb-2">Secure Handling</h3>
                <p className="text-gray-700">
                  Documents are transported in locked hard cases. No stops between pickup and delivery unless pre-arranged. GPS tracking available for complete accountability.
                </p>
              </div>

              <div className="border-l-4 border-gold-500 pl-6">
                <h3 className="text-xl font-bold text-midnight-900 mb-2">Professional Documentation</h3>
                <p className="text-gray-700">
                  Every job includes chain-of-custody logging. You'll receive confirmation of pickup and delivery, with timestamps and any relevant notes.
                </p>
              </div>

              <div className="border-l-4 border-gold-500 pl-6">
                <h3 className="text-xl font-bold text-midnight-900 mb-2">Ethical Boundaries</h3>
                <p className="text-gray-700">
                  We decline work that creates conflicts of interest. We don't provide legal advice. We follow Washington State regulations to the letter. No exceptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-midnight-900 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Experience professional document services built on reliability, ethics, and availability.
          </p>
          <Link href="/contact" className="btn-primary bg-gold-500 hover:bg-gold-600 text-midnight-900">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
