'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  ArrowRight,
} from 'lucide-react'

const whatsappUrl =
  'https://wa.me/5594991492417?text=Ol%C3%A1!%20Quero%20agendar%20um%20hor%C3%A1rio%20na%20Loucas%20Por%20Esmaltes.'

const instagramUrl = 'https://www.instagram.com/loucasporesmaltesmaraba/'
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Av.+Castelo+Branco,+1887+-+Marab%C3%A1,+PA'

type ServiceCategory = 'Todos' | 'Maos' | 'Pes' | 'Combos'

interface ServiceItem {
  id: number
  category: ServiceCategory
  name: string
  price: string
  image: string
}

const services: ServiceItem[] = [
  {
    id: 1,
    category: 'Maos',
    name: 'Esmaltação em Gel',
    price: 'R$ 70,00',
    image: '/service-esmaltacao-gel.jpg',
  },
  {
    id: 2,
    category: 'Maos',
    name: 'Alongamento em Gel',
    price: 'R$ 220,00',
    image: '/service-alongamento-gel.jpg',
  },
  {
    id: 3,
    category: 'Maos',
    name: 'Banho em Gel Esmaltado',
    price: 'R$ 150,00',
    image: '/service-banho-gel.jpg',
  },
  {
    id: 4,
    category: 'Maos',
    name: 'Manicure Clássica',
    price: 'R$ 35,00',
    image: '/service-manicure.jpg',
  },
  {
    id: 5,
    category: 'Pes',
    name: 'Pedicure Spa',
    price: 'R$ 55,00',
    image: '/service-pedicure.jpg',
  },
  {
    id: 6,
    category: 'Combos',
    name: 'Combo Mãos + Pés',
    price: 'R$ 80,00',
    image: '/service-manicure.jpg',
  },
]

const categories: { key: ServiceCategory; label: string }[] = [
  { key: 'Todos', label: 'Todos' },
  { key: 'Maos', label: 'Mãos' },
  { key: 'Pes', label: 'Pés' },
  { key: 'Combos', label: 'Combos' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('Todos')
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Track viewport size for responsive carousel cards count
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredServices =
    activeCategory === 'Todos'
      ? services
      : services.filter((s) => s.category === activeCategory)

  const cardsPerView = isMobile ? 1 : 3
  const gapPx = isMobile ? 16 : 24
  const maxIndex = Math.max(0, filteredServices.length - cardsPerView)
  const canPrev = carouselIndex > 0
  const canNext = carouselIndex < maxIndex

  function prev() {
    setCarouselIndex((i) => Math.max(0, i - 1))
  }

  function next() {
    setCarouselIndex((i) => Math.min(maxIndex, i + 1))
  }

  useEffect(() => {
    setCarouselIndex(0)
  }, [activeCategory])

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Mobile swipe support
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.targetTouches[0].clientX
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.targetTouches[0].clientX
  }

  function handleTouchEnd() {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 45) {
      next()
    } else if (diff < -45) {
      prev()
    }
    touchStartX.current = 0
    touchEndX.current = 0
  }

  return (
    <main className="site-shell">
      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className={headerScrolled ? 'site-header scrolled' : 'site-header'}>
        <a href="#inicio" className="brand" aria-label="Loucas Por Esmaltes">
          <span>Loucas Por Esmaltes</span>
        </a>
        <nav
          className={menuOpen ? 'main-nav open' : 'main-nav'}
          aria-label="Navegação principal"
          onClick={() => setMenuOpen(false)}
        >
          <a href="#servicos">Serviços</a>
          <a href="#esmaltes">Esmaltes</a>
          <a href="#sobre">A loja</a>
          <a href="#contato">Contato</a>
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
          <a className="nav-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
            Agendar ↗
          </a>
        </nav>
        <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          Agendar horário <ArrowUpRight size={14} />
        </a>
        <button
          className="menu-button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={(e) => {
            e.stopPropagation()
            setMenuOpen(!menuOpen)
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="hero" id="inicio">
        <div className="hero-bg" style={{ backgroundImage: 'url(/hero-salon.jpg)' }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={11} />
            <span>Beleza que começa nos detalhes</span>
          </div>
          <h1>
            Seu ritual de<br />
            <em>cor</em> e cuidado.
          </h1>
          <p className="hero-text">
            Esmaltes escolhidos com carinho e serviços pensados para deixar suas mãos e pés ainda mais bonitos.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              Agendar pelo WhatsApp <ArrowUpRight size={16} />
            </a>
            <a className="btn btn-outline" href="#servicos">
              Ver Serviços
            </a>
          </div>
        </div>
      </section>

      {/* ── INTRO STRIP ────────────────────────────────────── */}
      <section className="intro-strip" id="sobre">
        <div className="intro-left">
          <p className="section-kicker">Loucas Por Esmaltes · Marabá, PA</p>
          <p className="intro-statement">
            Um espaço para escolher sua próxima cor, cuidar de si e sair se sentindo ainda mais você.
          </p>
        </div>
        <div className="intro-features">
          <div className="intro-feat">
            <Heart size={16} />
            <span>Atendimento personalizado</span>
          </div>
          <div className="intro-feat">
            <Sparkles size={16} />
            <span>Produtos de alta qualidade</span>
          </div>
          <a
            className="intro-feat"
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            title="Abrir endereço no Google Maps"
          >
            <MapPin size={16} />
            <span>Marabá, PA ↗</span>
          </a>
        </div>
      </section>

      {/* ── SERVIÇOS (Inspirado fielmente na referência anexada) ── */}
      <section className="services-section" id="servicos">
        <div className="services-container">
          <div className="services-head">
            <h2>
              Nossos <em>Serviços</em>
            </h2>
            <p className="services-subtitle">
              Cuidados pensados para <strong>realçar sua beleza</strong> com sofisticação e carinho.
            </p>
            <div className="section-line">
              <span className="section-dot" />
            </div>
          </div>

          {/* Filter tabs */}
          <div className="filter-tabs" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.key}
                role="tab"
                aria-selected={activeCategory === cat.key}
                className={activeCategory === cat.key ? 'filter-tab active' : 'filter-tab'}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Responsive Carousel */}
          <div
            className="carousel-wrap"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className={canPrev ? 'c-arrow prev' : 'c-arrow prev disabled'}
              onClick={prev}
              aria-label="Anterior"
              disabled={!canPrev}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="carousel-viewport">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(calc(-${carouselIndex * (100 / cardsPerView)}% - ${carouselIndex * gapPx}px))`,
                }}
              >
                {filteredServices.map((s) => (
                  <div className="svc-card" key={s.id}>
                    <div className="svc-img">
                      <img src={s.image} alt={s.name} loading="lazy" />
                    </div>
                    <div className="svc-body">
                      <h3 className="svc-name">{s.name}</h3>
                      <span className="svc-price">{s.price}</span>
                      <a className="svc-btn" href={whatsappUrl} target="_blank" rel="noreferrer">
                        <span>Agendar</span>
                        <span className="svc-btn-circle">
                          <ArrowRight size={14} />
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={canNext ? 'c-arrow next' : 'c-arrow next disabled'}
              onClick={next}
              aria-label="Próximo"
              disabled={!canNext}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {filteredServices.length > cardsPerView && (
            <div className="carousel-dots">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  className={i === carouselIndex ? 'c-dot active' : 'c-dot'}
                  onClick={() => setCarouselIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── ESMALTES ───────────────────────────────────────── */}
      <section className="polish-section section-wrap" id="esmaltes">
        <div className="polish-head">
          <div>
            <p className="section-kicker">A prateleira da vez</p>
            <h2>Cores que <em>falam.</em></h2>
          </div>
          <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">
            Falar com a loja <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="polish-grid">
          {[
            { color: '#dc2f83', name: 'Rosa Manhã', swatch: 'Cremoso' },
            { color: '#8c1c70', name: 'Uva Intensa', swatch: 'Cremoso' },
            { color: '#f08aae', name: 'Ballet', swatch: 'Delicado' },
            { color: '#64145f', name: 'Noite em Marabá', swatch: 'Cremoso' },
          ].map((p, i) => (
            <div className="polish-card" key={p.name}>
              <div
                className="polish-visual"
                style={{ background: `linear-gradient(145deg, ${p.color} 0%, #3a123e 100%)` }}
              >
                <div className="pb">
                  <div className="pb-cap" />
                  <div className="pb-body" style={{ background: `linear-gradient(135deg, ${p.color}cc, ${p.color})` }} />
                </div>
                <span className="polish-num">0{i + 1}</span>
              </div>
              <div className="polish-info">
                <div>
                  <strong>{p.name}</strong>
                  <span>{p.swatch}</span>
                </div>
                <Heart size={16} className="polish-heart" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTATO & LOCALIZAÇÃO ───────────────────────────── */}
      <section className="contact-section" id="contato">
        <div className="contact-glow" />
        
        <div className="contact-content">
          <p className="eyebrow light">
            <Sparkles size={12} /> Vamos marcar seu momento?
          </p>
          <h2>
            Agende seu horário<br />
            <em>pelo WhatsApp.</em>
          </h2>
          <p className="contact-desc">
            Venha conhecer nosso espaço em Marabá, escolher suas cores favoritas e viver uma experiência completa de cuidado e beleza.
          </p>
          <a className="btn btn-light" href={whatsappUrl} target="_blank" rel="noreferrer">
            Chamar no WhatsApp <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Card Interativo com Mapa e Informações (Conforme solicitado) */}
        <div className="location-card">
          <div className="map-frame">
            <iframe
              title="Mapa Loucas Por Esmaltes Marabá"
              src="https://maps.google.com/maps?q=Av.+Castelo+Branco,+1887+-+Marab%C3%A1,+PA&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="location-card-body">
            <h3 className="location-card-title">Loucas Por Esmaltes — Marabá</h3>

            <div className="location-item">
              <div className="loc-icon-circle">
                <MapPin size={18} />
              </div>
              <div className="loc-text">
                <span className="loc-label">Endereço</span>
                <p className="loc-value">
                  Av. Castelo Branco, nº 1887<br />
                  Marabá — PA · 68501-700
                </p>
              </div>
            </div>

            <div className="location-item">
              <div className="loc-icon-circle">
                <Phone size={18} />
              </div>
              <div className="loc-text">
                <span className="loc-label">WhatsApp</span>
                <a className="loc-value loc-link" href={whatsappUrl} target="_blank" rel="noreferrer">
                  (94) 99149-2417
                </a>
              </div>
            </div>

            <a
              className="location-map-btn"
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ArrowUpRight size={16} />
              <span>Ver no Google Maps</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-col footer-col-brand">
            <a href="#inicio" className="footer-logo-text">Loucas Por Esmaltes</a>
            <p className="footer-about">
              Espaço especializado em cuidados para mãos e pés em Marabá, PA.
              Venha nos visitar e sinta a diferença de um atendimento feito com carinho.
            </p>
            <div className="footer-social">
              <a
                href={instagramUrl}
                aria-label="Instagram @loucasporesmaltesmaraba"
                target="_blank"
                rel="noreferrer"
                title="Siga no Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href={whatsappUrl} aria-label="WhatsApp" target="_blank" rel="noreferrer" title="Falar no WhatsApp">
                <Phone size={16} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Navegação</h4>
            <ul className="footer-links">
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#esmaltes">Esmaltes</a></li>
              <li><a href="#sobre">A loja</a></li>
              <li><a href="#contato">Contato</a></li>
              <li><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram ↗</a></li>
              <li><a href={whatsappUrl} target="_blank" rel="noreferrer">Agendar horário</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Contato &amp; Localização</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={13} />
                <a href={mapsUrl} target="_blank" rel="noreferrer" title="Ver no Google Maps">
                  Av. Castelo Branco, nº 1887<br />Marabá, PA · 68501-700 ↗
                </a>
              </li>
              <li>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <a href={instagramUrl} target="_blank" rel="noreferrer">
                  @loucasporesmaltesmaraba ↗
                </a>
              </li>
              <li>
                <Phone size={13} />
                <a href={whatsappUrl} target="_blank" rel="noreferrer">(94) 99149-2417</a>
              </li>
              <li>
                <Clock3 size={13} />
                <span>Consulte horários pelo WhatsApp</span>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Serviços</h4>
            <ul className="footer-links">
              <li><a href="#servicos">Manicure Clássica</a></li>
              <li><a href="#servicos">Pedicure Spa</a></li>
              <li><a href="#servicos">Esmaltação em Gel</a></li>
              <li><a href="#servicos">Alongamento em Gel</a></li>
              <li><a href="#servicos">Banho em Gel Esmaltado</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Loucas Por Esmaltes · Marabá, PA. Todos os direitos reservados.</p>
          <p className="footer-tagline">Cor, cuidado e um tempo só seu.</p>
        </div>
      </footer>
    </main>
  )
}
