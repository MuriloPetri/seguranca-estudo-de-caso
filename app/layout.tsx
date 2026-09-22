import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sala de Casos — Simulador de Confidencialidade',
  description:
    'Simulador interativo de quebra de confidencialidade em segurança da informação. Explore cenários reais de engenharia social e falhas técnicas que comprometeram grandes organizações.',
  keywords: [
    'Segurança da Informação',
    'Confidencialidade',
    'Engenharia Social',
    'Phishing',
    'Simulador',
    'Segurança de Sistemas Computacionais',
    'CIA Triad',
  ],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0f1624',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
