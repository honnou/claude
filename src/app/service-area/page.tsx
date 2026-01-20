import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Service Area | Nightrider Notary - Serving Auburn, WA & Surrounding Areas',
  description: 'Nightrider Notary serves Auburn, WA and surrounding areas within a 50-mile radius. See if we cover your location.',
}

export default function ServiceAreaPage() {
  const majorCities = [
    'Auburn',
    'Kent',
    'Federal Way',
    'Renton',
    'Tacoma',
    'Puyallup',
    'Enumclaw',
    'Maple Valley',
    'Covington',
    'Black Diamond',
    'Bonney Lake',
    'Sumner',
    'Pacific',
    'Algona',
    'Milton',
  ]

  return (
    <>
      {/* Header */}
      <section className="bg-midnight-900 text-white py-16">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Service Area</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional after-hours document services throughout Auburn and the greater South King County area.
          </p>
        </div>
      </section>

      {/* Primary Service Area */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-midnight-900 mb-4">Coverage Radius</h2>
              <p className="text-xl text-gray-600">
                We serve Auburn, WA and all areas within a 50-mile radius
              </p>
            </div>

            {/* Visual Coverage Indicator */}
            <div className="bg-gradient-to-br from-midnight-50 to-gray-50 rounded-lg p-12 mb-12 text-center">
              <div className="relative inline-block">
                {/* Outer circle - 50 mile radius */}
                <div className="w-80 h-80 rounded-full border-4 border-midnight-300 flex items-center justify-center relative">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-midnight-900 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    50-mile radius
                  </div>

                  {/* Inner circle - Auburn center */}
                  <div className="w-20 h-20 rounded-full bg-midnight-900 flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="text-white font-bold text-sm">Auburn</div>
                      <div className="text-gold-400 text-xs">HQ</div>
                    </div>
                  </div>

                  {/* Direction markers */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-midnight-700 font-semibold text-sm">
                    North
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-midnight-700 font-semibold text-sm">
                    South
                  </div>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-midnight-700 font-semibold text-sm">
                    West
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-midnight-700 font-semibold text-sm">
                    East
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-midnight-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Primary Service Zone
                </h3>
                <p className="text-gray-700 mb-4">
                  Auburn and immediately surrounding cities receive priority scheduling and standard pricing. Most deliveries within this zone can be completed same-evening.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-midnight-900 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Fastest response times
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-midnight-900 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Standard pricing
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-midnight-900 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Same-evening delivery available
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-midnight-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Extended Service Zone
                </h3>
                <p className="text-gray-700 mb-4">
                  Areas within the 50-mile radius but farther from Auburn. Service available with advance scheduling and distance-adjusted pricing.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-midnight-900 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Advance scheduling required
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-midnight-900 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Distance-based pricing
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-midnight-900 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Next-day delivery typical
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities We Serve */}
      <section className="py-20 bg-gray-50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-midnight-900 mb-8 text-center">Cities We Serve</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              These are some of the major cities within our service area. If your location isn't listed, contact us - we likely serve your area!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {majorCities.map((city) => (
                <div
                  key={city}
                  className="bg-white p-4 rounded-lg text-center border-2 border-gray-200 hover:border-midnight-900 transition-colors"
                >
                  <svg className="w-6 h-6 text-midnight-900 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="font-semibold text-midnight-900">{city}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-midnight-50 border-l-4 border-midnight-900 p-6">
              <h3 className="font-bold text-midnight-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Don't See Your City?
              </h3>
              <p className="text-gray-700">
                This list includes major cities but is not exhaustive. We serve many smaller communities and unincorporated areas throughout South King County and beyond. <Link href="/contact" className="text-midnight-900 font-semibold underline hover:text-gold-600">Contact us</Link> with your location and we'll confirm coverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Availability */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-midnight-900 mb-8 text-center">Service Hours</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-midnight-900 text-white p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-2xl font-bold">Weeknights</h3>
                </div>
                <p className="text-gray-200 mb-4">Monday - Friday</p>
                <div className="text-3xl font-bold text-gold-400 mb-2">5:00 PM - 10:00 PM</div>
                <p className="text-gray-300 text-sm">
                  Pickup window: 5:00 PM - 8:00 PM
                </p>
              </div>

              <div className="bg-midnight-900 text-white p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold">Weekends</h3>
                </div>
                <p className="text-gray-200 mb-4">Saturday - Sunday</p>
                <div className="text-3xl font-bold text-gold-400 mb-2">By Appointment</div>
                <p className="text-gray-300 text-sm">
                  Flexible scheduling available
                </p>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-midnight-900 mb-3 text-lg">Service Limitations</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Weather:</strong> Services may be delayed or rescheduled during severe weather (heavy snow, ice, dangerous conditions)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Capacity:</strong> Limited to 6-10 jobs per month to maintain quality and work-life balance</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Advance Booking Recommended:</strong> While we accept same-day requests, scheduling in advance ensures availability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-midnight-900 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-4">Serving Your Area?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Contact us to confirm we serve your location and schedule your courier service.
          </p>
          <Link href="/contact" className="btn-primary bg-gold-500 hover:bg-gold-600 text-midnight-900">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
