import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Nightrider Notary - Get in Touch',
  description: 'Contact Nightrider Notary to schedule courier services or learn more about our mobile notary services. Available evenings and weekends.',
}

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-midnight-900 text-white py-16">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Ready to schedule a service or have questions? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Methods & Form */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Contact Information Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Business Hours */}
              <div className="bg-midnight-900 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Business Hours
                </h3>
                <div className="space-y-3 text-gray-200">
                  <div>
                    <div className="font-semibold text-gold-400">Monday - Friday</div>
                    <div className="text-sm">5:00 PM - 10:00 PM</div>
                    <div className="text-xs text-gray-400">Pickup: 5:00 PM - 8:00 PM</div>
                  </div>
                  <div className="border-t border-midnight-700 pt-3">
                    <div className="font-semibold text-gold-400">Saturday - Sunday</div>
                    <div className="text-sm">By Appointment</div>
                    <div className="text-xs text-gray-400">Flexible scheduling</div>
                  </div>
                </div>
              </div>

              {/* Direct Contact */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-midnight-900 mb-4">Direct Contact</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center text-midnight-900 font-semibold mb-1">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </div>
                    <a
                      href="mailto:isaiah@nightridernotary.com"
                      className="text-gray-700 hover:text-midnight-900 transition-colors"
                    >
                      isaiah@nightridernotary.com
                    </a>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center text-midnight-900 font-semibold mb-1">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Service Area
                    </div>
                    <p className="text-gray-700">
                      Auburn, WA<br />
                      50-mile service radius
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Response Time
                </h3>
                <p className="text-blue-800 text-sm">
                  We typically respond to inquiries within 24 hours, often much sooner during evening hours.
                </p>
              </div>

              {/* Current Availability */}
              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h3 className="font-bold text-green-900 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Now Available
                </h3>
                <p className="text-green-800 text-sm mb-2">
                  <strong>Document Courier Services:</strong> Accepting bookings now
                </p>
                <p className="text-green-700 text-sm">
                  <strong>Notary Services:</strong> Join our Q2 2026 waitlist
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-midnight-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-midnight-900 mb-12 text-center">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border-l-4 border-midnight-900">
                <h3 className="text-lg font-bold text-midnight-900 mb-2">
                  How quickly can you pick up a document?
                </h3>
                <p className="text-gray-700">
                  For jobs within our primary service area (Auburn and immediate surroundings), we can often accommodate same-evening pickups if scheduled before 6:00 PM. Extended service areas may require advance scheduling.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-midnight-900">
                <h3 className="text-lg font-bold text-midnight-900 mb-2">
                  What are your rates?
                </h3>
                <p className="text-gray-700">
                  Standard courier service rates range from $100-$150 per delivery, depending on distance and timing. Contact us with your specific needs for an accurate quote. We provide transparent pricing with no hidden fees.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-midnight-900">
                <h3 className="text-lg font-bold text-midnight-900 mb-2">
                  Do you serve my area?
                </h3>
                <p className="text-gray-700">
                  We serve Auburn and all locations within a 50-mile radius. This includes most of South King County and surrounding areas. Not sure if you're covered? Contact us with your city or ZIP code and we'll confirm.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-midnight-900">
                <h3 className="text-lg font-bold text-midnight-900 mb-2">
                  When will notary services be available?
                </h3>
                <p className="text-gray-700">
                  We're currently in the Washington State notary commission application process and expect to launch notary services in Q2 2026 (April-May). You can join our waitlist through the contact form to be notified when we launch.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-midnight-900">
                <h3 className="text-lg font-bold text-midnight-900 mb-2">
                  How do you ensure document security?
                </h3>
                <p className="text-gray-700">
                  All documents are transported in locked hard cases utilizing our motorcycle's secure saddlebag system. We maintain chain-of-custody documentation, enable GPS tracking, and make no stops between pickup and delivery. We're fully insured with general liability coverage.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-midnight-900">
                <h3 className="text-lg font-bold text-midnight-900 mb-2">
                  Can you handle rush deliveries?
                </h3>
                <p className="text-gray-700">
                  Yes, subject to availability and weather conditions. Contact us as soon as possible with your timeline and we'll do our best to accommodate. Same-evening deliveries are often possible for primary service area locations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-midnight-900 mb-6">Serving Auburn & Surrounding Areas</h2>
            <div className="bg-gray-100 rounded-lg p-12 border-2 border-gray-300">
              <svg className="w-16 h-16 text-midnight-900 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-xl font-semibold text-midnight-900 mb-2">Based in Auburn, WA</p>
              <p className="text-gray-600">Serving a 50-mile radius</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
