'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function RevealSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

const MEMBERS = [
  { name: 'Membro 1', ra: 'RA: XXXXXXX' },
  { name: 'Membro 2', ra: 'RA: XXXXXXX' },
  { name: 'Membro 3', ra: 'RA: XXXXXXX' },
  { name: 'Membro 4', ra: 'RA: XXXXXXX' },
]

const SECTIONS = [
  {
    id: 'triade',
    eyebrow: 'Fundamentos',
    title: 'A Tríade CIA',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    content: (
      <div className="cia-grid">
        <div className="cia-pillar cia-intact">
          <h4>Integridade</h4>
          <p>A informação não pode ser alterada indevidamente por pessoas não autorizadas.</p>
        </div>
        <div className="cia-pillar cia-avail">
          <h4>Disponibilidade</h4>
          <p>A informação precisa estar acessível e utilizável quando necessário.</p>
        </div>
        <div className="cia-pillar cia-conf cia-target">
          <div className="cia-target-badge">🎯 Foco desta simulação</div>
          <h4>Confidencialidade</h4>
          <p>Somente pessoas devidamente autorizadas podem acessar a informação.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'falhas',
    eyebrow: 'Vetores de Ataque',
    title: 'Como a Confidencialidade é Quebrada',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    content: (
      <div className="falhas-grid">
        <div className="falha-card human">
          <div className="falha-tag">Falha Humana</div>
          <h4>Engenharia Social</h4>
          <p>A pessoa autorizada é convencida a entregar credenciais voluntariamente — via e-mail, ligação, SMS ou instalador malicioso baixado da internet.</p>
          <div className="falha-examples">
            <span>Phishing</span>
            <span>Vishing</span>
            <span>Smishing</span>
            <span>Pretexting</span>
          </div>
        </div>
        <div className="falha-card tech">
          <div className="falha-tag">Falha Técnica</div>
          <h4>Vulnerabilidade de Sistema</h4>
          <p>Uma configuração aberta, código vulnerável a injeção, ou uma atualização não aplicada deixa a porta destrancada sem qualquer interação humana.</p>
          <div className="falha-examples">
            <span>SQL Injection</span>
            <span>SSRF</span>
            <span>Patch não aplicado</span>
            <span>Excesso de permissão</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'casos',
    eyebrow: 'Casos Reais',
    title: 'Incidentes Documentados',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    content: (
      <div className="casos-grid">
        {[
          { year: '2011', org: 'RSA Security', type: 'human', label: 'Humana', desc: 'Planilha Excel com exploit zero-day enviada por phishing comprometeu tokens SecurID usados por 40 milhões de pessoas.' },
          { year: '2020', org: 'Twitter', type: 'human', label: 'Humana', desc: 'Vishing contra funcionários do suporte comprometeu 130 contas verificadas, incluindo Obama e Elon Musk.' },
          { year: '2021', org: 'Colonial Pipeline', type: 'tech', label: 'Técnica', desc: 'Conta de VPN legada sem 2FA foi usada para instalar ransomware, interrompendo 45% do fornecimento de combustível do leste dos EUA.' },
          { year: '2017', org: 'Equifax', type: 'tech', label: 'Técnica', desc: 'Vulnerabilidade Apache Struts não corrigida por 9 semanas expôs dados de 147 milhões de pessoas.' },
          { year: '2019', org: 'Capital One', type: 'tech', label: 'Técnica', desc: 'SSRF combinado com permissões excessivas no firewall vazou dados de 106 milhões de clientes.' },
          { year: '2022', org: 'Twilio / 0ktapus', type: 'human', label: 'Humana', desc: 'Campanha de smishing em larga escala capturava OTPs em tempo real, driblando autenticação em duas etapas.' },
        ].map((c) => (
          <div className={`caso-card ${c.type}`} key={c.org}>
            <div className="caso-header">
              <span className="caso-year">{c.year}</span>
              <span className={`caso-type ${c.type}`}>{c.label}</span>
            </div>
            <h4 className="caso-org">{c.org}</h4>
            <p className="caso-desc">{c.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'gatilhos',
    eyebrow: 'Psicologia da Persuasão',
    title: 'Os Gatilhos por Trás de Cada Decisão',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    content: (
      <div className="gatilhos-list">
        {[
          { name: 'Autoridade', type: 'human', ex: '"Aqui é do suporte de TI" — ataque à Twitter, 2020', desc: 'Pessoas obedecem mais facilmente a quem parece ocupar posição de poder ou conhecimento técnico.' },
          { name: 'Urgência e Escassez', type: 'human', ex: '"Sua senha expira hoje" — campanha 0ktapus, 2022', desc: 'Prazos curtos cortam o tempo de reflexão da vítima, impedindo verificações básicas.' },
          { name: 'Curiosidade', type: 'human', ex: '"2011 Recruitment Plan.xls" — RSA Security, 2011', desc: 'Um nome de arquivo bem escolhido motiva uma ação que, em outro contexto, pareceria arriscada.' },
          { name: 'Complacência Técnica', type: 'tech', ex: 'Correção disponível e não aplicada por semanas — Equifax, 2017', desc: 'Configurações provisórias e atualizações pendentes viram permanentes porque "está funcionando".' },
          { name: 'Excesso de Permissão', type: 'tech', ex: 'Firewall com leitura em centenas de áreas — Capital One, 2019', desc: 'Conceder mais acesso do que o necessário transforma uma falha pequena em um vazamento gigante.' },
        ].map((g) => (
          <div className={`gatilho-item ${g.type}`} key={g.name}>
            <div className="gatilho-header">
              <strong className="gatilho-name">{g.name}</strong>
              <span className={`gatilho-badge ${g.type}`}>{g.type === 'human' ? 'Humano' : 'Técnico'}</span>
            </div>
            <p className="gatilho-desc">{g.desc}</p>
            <p className="gatilho-ex">Ex: {g.ex}</p>
          </div>
        ))}
      </div>
    ),
  },
]

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="pres-shell">
      {/* Ambient blobs */}
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />
      <div className="blob blob-c" aria-hidden="true" />

      {/* ── TOPBAR ── */}
      <header className={`pres-topbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="topbar-brand">
          <div className="topbar-mark" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1408" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <span className="topbar-title">Sala de Casos</span>
            <small>Segurança de Sistemas Computacionais</small>
          </div>
        </div>
        <nav className="topbar-nav">
          {SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`} className="topbar-link">{s.eyebrow}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href="/slides" className="topbar-cta" style={{ background: 'rgba(255,255,255,.06)', color: 'var(--text-light)', boxShadow: 'none', border: '1px solid var(--glass-brd)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            Ver Slides
          </Link>
          <Link href="/simulador" className="topbar-cta">
            Abrir Simulador
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
          </Link>
        </div>
      </header>

      <div className="pres-content">
        {/* ── HERO ── */}
        <section className="pres-hero" id="inicio">
          <div className="hero-kicker">Trabalho de Apresentação</div>
          <h1 className="hero-h1">
            Quebra de<br />
            <em>Confidencialidade</em>
          </h1>
          <p className="hero-sub">
            Um simulador interativo de incidentes reais de segurança da informação.<br />
            Explore cenários de engenharia social e falhas técnicas que comprometeram organizações ao redor do mundo.
          </p>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>Segurança de Sistemas Computacionais</span>
            </div>
            <div className="hero-meta-sep" aria-hidden="true">·</div>
            <div className="hero-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>{new Date().getFullYear()}</span>
            </div>
          </div>

          <div className="hero-actions">
            <Link href="/simulador" className="hero-btn-primary">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Iniciar Simulador
            </Link>
            <Link href="/slides" className="hero-btn-outline">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              Ver Slides
            </Link>
            <a href="#triade" className="hero-btn-outline">
              Ver Conteúdo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
            </a>
          </div>

          {/* Stats strip */}
          <div className="hero-stats">
            {[
              { n: '10', label: 'Cenários interativos' },
              { n: '6', label: 'Casos reais documentados' },
              { n: '3', label: 'Ferramentas práticas' },
              { n: '1', label: 'Painel do analista (SOC)' },
            ].map(s => (
              <div className="hero-stat" key={s.label}>
                <span className="hero-stat-n">{s.n}</span>
                <span className="hero-stat-l">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── MEMBERS ── */}
        <RevealSection className="members-section">
          <p className="members-eyebrow">Grupo</p>
          <div className="members-grid">
            {MEMBERS.map((m) => (
              <div className="member-card" key={m.name}>
                <div className="member-avatar" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <p className="member-name">{m.name}</p>
                  <p className="member-ra">{m.ra}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ── CONTENT SECTIONS ── */}
        {SECTIONS.map((sec, i) => (
          <section className="pres-section" id={sec.id} key={sec.id}>
            <RevealSection delay={0}>
              <div className="sec-eyebrow">{sec.eyebrow}</div>
              <div className="sec-head">
                <div className="sec-icon" aria-hidden="true">{sec.icon}</div>
                <h2 className="sec-h2">{sec.title}</h2>
              </div>
            </RevealSection>
            <RevealSection delay={80}>
              {sec.content}
            </RevealSection>
          </section>
        ))}

        {/* ── CTA FINAL ── */}
        <RevealSection>
          <div className="cta-final">
            <div className="cta-glow" aria-hidden="true" />
            <div className="cta-inner">
              <div className="cta-eyebrow">Simulador Interativo</div>
              <h2 className="cta-title">Explore os cenários<br />na prática</h2>
              <p className="cta-desc">
                Dez casos com interfaces únicas: e-mails de phishing, terminais de acesso remoto, painéis SOC, formulários de injeção SQL e muito mais.
              </p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/simulador" className="cta-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Abrir o Simulador Completo
                </Link>
                <Link href="/slides" className="cta-btn" style={{ background: 'rgba(255,255,255,.06)', color: 'var(--text-light)', border: '1px solid var(--glass-brd)', boxShadow: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                  Ver Slides
                </Link>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ── FOOTER ── */}
        <footer className="pres-footer">
          <p>Simulador de Quebra de Confidencialidade · Segurança de Sistemas Computacionais · {new Date().getFullYear()}</p>
        </footer>
      </div>
    </main>
  )
}
