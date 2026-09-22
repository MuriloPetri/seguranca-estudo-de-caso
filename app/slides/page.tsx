'use client'

export default function SlidesPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      <iframe
        src="/slides.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        title="Slides — Quebra de Confidencialidade"
        allowFullScreen
      />
    </div>
  )
}
