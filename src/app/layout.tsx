import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://nightridernotary.com'),
  title: 'Nightrider Notary | After-Hours Mobile Notary & Courier Services in Auburn, WA',
  description: 'Professional after-hours mobile notary and secure document courier services serving Auburn, WA and surrounding 50-mile radius. Available evenings and weekends.',
  keywords: ['mobile notary', 'Auburn WA', 'after-hours notary', 'document courier', 'notary services', 'evening notary', 'weekend notary'],
  openGraph: {
    title: 'Nightrider Notary - After-Hours Professional Services',
    description: 'Mobile notary and secure document courier available when you need us - evenings and weekends.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
