'use client'

export default function SimuladorPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      <iframe
        src="/simulador.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        title="Simulador de Confidencialidade — Segurança de Sistemas Computacionais"
        allowFullScreen
      />
    </div>
  )
}
