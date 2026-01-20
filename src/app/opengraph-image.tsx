import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Nightrider Notary - Professional After-Hours Services'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1e3a5f, #102a43)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
          }}
        >
          Nightrider <span style={{ color: '#f59e0b' }}>Notary</span>
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#d9e2ec',
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          Professional After-Hours Mobile Notary & Document Courier
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#bcccdc',
            marginTop: 30,
          }}
        >
          Serving Auburn, WA & Surrounding Areas
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
