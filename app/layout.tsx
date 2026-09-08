import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://esmalte-louca.vercel.app'),
  title: 'Loucas Por Esmaltes | Marabá',
  description:
    'Esmaltação em gel, manicure clássica, pedicure e cuidados completos em Marabá, PA. Agende seu horário pelo WhatsApp!',
  keywords: [
    'Loucas Por Esmaltes',
    'Esmalteria Marabá',
    'Manicure Marabá',
    'Pedicure Marabá',
    'Esmaltação em Gel',
    'Alongamento em Gel',
    'Salão de Beleza Marabá',
  ],
  authors: [{ name: 'Loucas Por Esmaltes' }],
  creator: 'Loucas Por Esmaltes',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Loucas Por Esmaltes | Marabá',
    description:
      'Esmaltação em gel, manicure clássica, pedicure e cuidados completos em Marabá, PA. Agende seu horário pelo WhatsApp!',
    url: 'https://esmalte-louca.vercel.app',
    siteName: 'Loucas Por Esmaltes',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/hero-salon.jpg',
        width: 1200,
        height: 630,
        alt: 'Loucas Por Esmaltes · Marabá, PA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loucas Por Esmaltes | Marabá',
    description:
      'Esmaltação em gel, manicure e pedicure em Marabá, PA. Agende seu horário pelo WhatsApp!',
    images: ['/hero-salon.jpg'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#4e0d3a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
