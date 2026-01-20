# Nightrider Notary Website

Professional after-hours mobile notary and secure document courier services website for Auburn, WA and surrounding areas.

## Overview

This is a modern Next.js website built with:
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hook Form** for form handling
- Optimized for **Vercel** deployment

## Features

- 📱 Responsive design (mobile-first)
- 🎨 Professional midnight blue color scheme
- 🔍 SEO optimized with metadata and sitemap
- 📝 Contact form with validation
- 🗺️ Service area visualization
- ⚡ Fast page loads and performance
- 🔒 Security headers configured

## Pages

1. **Home** (`/`) - Hero section, service overview, why choose us, CTA
2. **Services** (`/services`) - Detailed courier and notary service information
3. **About** (`/about`) - Mission, values, credentials, service standards
4. **Service Area** (`/service-area`) - Coverage map, cities served, hours
5. **Contact** (`/contact`) - Contact form, FAQ, business hours

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

### Step 1: Prepare Your Repository

This site is ready to deploy to Vercel. Make sure all changes are committed:

```bash
git add .
git commit -m "Initial Nightrider Notary website"
git push -u origin claude/nightrider-notary-ae6Jq
```

### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow prompts to link to your Vercel account

5. For production deployment:
   ```bash
   vercel --prod
   ```

**Option B: Using Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

### Step 3: Configure Custom Domain (nightridernotary.com)

Once deployed to Vercel:

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Click "Domains"
   - Add `nightridernotary.com`
   - Add `www.nightridernotary.com` (optional)
   - Vercel will provide DNS records to add

2. **In Namecheap (Your Domain Registrar):**

   a. **Log in to Namecheap:**
      - Go to [namecheap.com](https://namecheap.com)
      - Navigate to Domain List
      - Click "Manage" next to nightridernotary.com

   b. **Update DNS Settings:**
      - Go to "Advanced DNS" tab
      - Remove existing A and CNAME records (if any)
      - Add new records as provided by Vercel:

      **For apex domain (nightridernotary.com):**
      ```
      Type: A Record
      Host: @
      Value: 76.76.21.21 (Vercel's IP - check Vercel dashboard for current IP)
      TTL: Automatic
      ```

      **For www subdomain (www.nightridernotary.com):**
      ```
      Type: CNAME Record
      Host: www
      Value: cname.vercel-dns.com
      TTL: Automatic
      ```

   c. **Save changes**

3. **Verify Domain:**
   - Back in Vercel, click "Verify" next to your domain
   - DNS propagation can take 24-48 hours (usually much faster)
   - You can check status at [dnschecker.org](https://dnschecker.org)

### Step 4: Set Up Proton Email (isaiah@nightridernotary.com)

**In Proton Mail:**

1. Log in to [proton.me](https://proton.me)
2. Go to Settings → Domains
3. Click "Add Domain"
4. Enter `nightridernotary.com`
5. Proton will provide MX records

**In Namecheap:**

1. Go back to Advanced DNS for nightridernotary.com
2. Add MX records provided by Proton:

   ```
   Type: MX Record
   Host: @
   Value: mail.protonmail.ch (or as provided by Proton)
   Priority: 10
   TTL: Automatic
   ```

   ```
   Type: MX Record
   Host: @
   Value: mailsec.protonmail.ch (or as provided by Proton)
   Priority: 20
   TTL: Automatic
   ```

3. Add SPF record (TXT):
   ```
   Type: TXT Record
   Host: @
   Value: v=spf1 include:_spf.protonmail.ch ~all
   TTL: Automatic
   ```

4. Add DKIM and DMARC records as provided by Proton

5. Verify in Proton Mail settings

**Create Email Address:**
- In Proton: Settings → Addresses
- Add `isaiah@nightridernotary.com`

## Environment Variables

Currently, this site doesn't require environment variables. However, when you integrate the contact form with an email service (like Resend, SendGrid, or Proton Bridge), you'll need to add:

```env
# .env.local (create this file locally, don't commit)
EMAIL_SERVICE_API_KEY=your_api_key_here
CONTACT_EMAIL_TO=isaiah@nightridernotary.com
```

## Contact Form Integration

The contact form currently logs submissions to console. To make it functional:

### Option 1: Using Vercel Forms (Simplest)

1. No code changes needed
2. Submissions appear in Vercel Dashboard
3. Can forward to email

### Option 2: Using Resend (Recommended for Production)

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Get API key
4. Install package: `npm install resend`
5. Update `src/components/ContactForm.tsx` to call API route
6. Create API route at `src/app/api/contact/route.ts`

Example API route:
```typescript
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const data = await request.json()

  await resend.emails.send({
    from: 'website@nightridernotary.com',
    to: 'isaiah@nightridernotary.com',
    subject: `New Contact Form: ${data.service}`,
    html: `<p>From: ${data.name} (${data.email})</p>...`
  })

  return NextResponse.json({ success: true })
}
```

## SEO Optimization

The site includes:
- ✅ Semantic HTML structure
- ✅ Meta tags for social sharing (Open Graph)
- ✅ Sitemap.xml generation
- ✅ Robots.txt
- ✅ Structured data for local business (can be enhanced)
- ✅ Mobile-responsive design
- ✅ Fast loading times

### Additional SEO Recommendations

1. **Google Business Profile:**
   - Create listing for "Nightrider Notary"
   - Add Auburn, WA location
   - Link to website

2. **Local Citations:**
   - Add to Yelp, Yellow Pages, etc.
   - Ensure NAP (Name, Address, Phone) consistency

3. **Schema Markup:**
   Consider adding LocalBusiness schema to layout:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "LocalBusiness",
     "name": "Nightrider Notary",
     "image": "https://nightridernotary.com/og-image.png",
     "@id": "https://nightridernotary.com",
     "url": "https://nightridernotary.com",
     "telephone": "+1-XXX-XXX-XXXX",
     "address": {
       "@type": "PostalAddress",
       "streetAddress": "Auburn",
       "addressLocality": "Auburn",
       "addressRegion": "WA",
       "postalCode": "98001",
       "addressCountry": "US"
     },
     "geo": {
       "@type": "GeoCoordinates",
       "latitude": 47.3073,
       "longitude": -122.2285
     },
     "openingHoursSpecification": [
       {
         "@type": "OpeningHoursSpecification",
         "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
         "opens": "17:00",
         "closes": "22:00"
       }
     ]
   }
   ```

## Performance

The site is optimized for performance:
- Server-side rendering with Next.js
- Automatic code splitting
- Optimized images (when added)
- Minimal JavaScript bundle
- CSS purging with Tailwind

## Security

Security headers configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## Future Enhancements

Consider adding:
- [ ] Online booking/scheduling system (Calendly integration)
- [ ] Payment processing (Stripe)
- [ ] Client portal
- [ ] Blog for SEO content
- [ ] Testimonials section
- [ ] Photo gallery
- [ ] Live chat widget
- [ ] Analytics (Google Analytics 4, Vercel Analytics)

## Support

For questions about the website:
- Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
- Check Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Check Tailwind docs: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## License

Copyright © 2026 Nightrider Notary. All rights reserved.

---

Built with ❤️ using Next.js and deployed on Vercel
