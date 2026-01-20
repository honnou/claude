import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-midnight-950 text-white">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Nightrider <span className="text-gold-400">Notary</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Professional after-hours mobile notary and secure document courier services.
            </p>
            <p className="text-sm text-gray-400">
              Serving Auburn, WA and surrounding 50-mile radius
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-gold-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-gold-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/service-area" className="text-gray-300 hover:text-gold-400 transition-colors">
                  Service Area
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-gold-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:isaiah@nightridernotary.com" className="hover:text-gold-400 transition-colors">
                  isaiah@nightridernotary.com
                </a>
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Evenings & Weekends
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-midnight-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Nightrider Notary. All rights reserved.</p>
          <p className="mt-2">Licensed & Insured | Professional | Reliable</p>
        </div>
      </div>
    </footer>
  )
}
