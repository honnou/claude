import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services | Nightrider Notary - Mobile Notary & Document Courier',
  description: 'Professional document courier services available now, with mobile notary services launching Q2 2026. Serving Auburn, WA and surrounding areas.',
}

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-midnight-900 text-white py-16">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional document services designed for legal professionals, estate planners, and individuals who need reliable after-hours assistance.
          </p>
        </div>
      </section>

      {/* Courier Service Section */}
      <section id="courier" className="py-20 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <div className="bg-midnight-900 text-white p-4 rounded-lg mr-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-midnight-900">Secure Document Courier</h2>
                <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded mt-2">
                  Available Now
                </span>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-lg text-gray-700 mb-6">
                Professional document courier service designed specifically for legal professionals, estate planning attorneys, and fiduciaries who need secure, reliable document transport outside traditional business hours.
              </p>

              <h3 className="text-2xl font-bold text-midnight-900 mb-4">What We Offer</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-midnight-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Same-Day Delivery
                  </h4>
                  <p className="text-gray-600">Evening pickups with same-night or next-business-day delivery options</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-midnight-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Secure Transport
                  </h4>
                  <p className="text-gray-600">Documents transported in locked hard cases with no stops between pickup and delivery</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-midnight-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Chain of Custody
                  </h4>
                  <p className="text-gray-600">Complete documentation of pickup, transport, and delivery for your records</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-midnight-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    GPS Tracking
                  </h4>
                  <p className="text-gray-600">Real-time tracking available for complete transparency and peace of mind</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-midnight-900 mb-4">Ideal For</h3>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-midnight-900 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-700">Estate planning attorneys needing secure document transport</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-midnight-900 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-700">Professional fiduciaries and trustees</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-midnight-900 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-700">Small law firms requiring after-hours courier services</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-midnight-900 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-700">Trust administrators with time-sensitive deliveries</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-midnight-900 mb-4">Pricing</h3>
              <div className="bg-midnight-50 border-l-4 border-midnight-900 p-6 mb-8">
                <p className="text-gray-700 mb-2">
                  <strong className="text-midnight-900">Standard Rate:</strong> $100-$150 per delivery
                </p>
                <p className="text-gray-700 mb-2">
                  <strong className="text-midnight-900">Service Hours:</strong> Monday-Friday 5:00 PM - 10:00 PM, Weekends by appointment
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  Pricing varies based on distance and timing. Contact us for a specific quote.
                </p>
              </div>
            </div>

            <Link href="/contact" className="btn-primary">
              Schedule Courier Service
            </Link>
          </div>
        </div>
      </section>

      {/* Notary Service Section */}
      <section id="notary" className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <div className="bg-midnight-900 text-white p-4 rounded-lg mr-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-midnight-900">Mobile Notary Services</h2>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded mt-2">
                  Launching Q2 2026
                </span>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-lg text-gray-700 mb-6">
                Professional mobile notary services will be available starting in Q2 2026. Once commissioned, we'll provide Washington State notary services at your location, when it's convenient for you.
              </p>

              <h3 className="text-2xl font-bold text-midnight-900 mb-4">Upcoming Services</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                  <h4 className="font-bold text-midnight-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    General Notarizations
                  </h4>
                  <p className="text-gray-600">Affidavits, acknowledgments, jurats, and other standard notarial acts</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                  <h4 className="font-bold text-midnight-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Estate Planning Documents
                  </h4>
                  <p className="text-gray-600">Wills, trusts, powers of attorney, and healthcare directives</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                  <h4 className="font-bold text-midnight-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Mobile Service
                  </h4>
                  <p className="text-gray-600">We come to your location - home, office, or care facility</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                  <h4 className="font-bold text-midnight-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    After-Hours Available
                  </h4>
                  <p className="text-gray-600">Evening and weekend appointments to fit your schedule</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-midnight-900 mb-4">Our Commitment</h3>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><strong>Licensed:</strong> Washington State Notary Commission</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><strong>Insured:</strong> Errors & Omissions coverage for your protection</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><strong>Ethical:</strong> Strict adherence to Washington State notary laws and best practices</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700"><strong>Professional:</strong> Detailed record-keeping and proper identification procedures</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                <h4 className="font-bold text-yellow-800 mb-2">Important Note:</h4>
                <p className="text-yellow-700">
                  Notary services are currently in the licensing process. We expect to begin offering these services in April-May 2026. Want to be notified when we launch? <Link href="/contact" className="underline font-semibold">Contact us</Link> to join our waitlist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-midnight-900 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-4">Need Document Services?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Our courier services are available now. Contact us to schedule a pickup or learn more about our services.
          </p>
          <Link href="/contact" className="btn-primary bg-gold-500 hover:bg-gold-600 text-midnight-900">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
