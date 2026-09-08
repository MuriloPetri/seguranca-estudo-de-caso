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
} from 'lucide-react'

const logoUrl =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wOKI2oJ79tb8mnGq5pKuJH3mPLPcQ6.png'
const whatsappUrl =
  'https://wa.me/5594991492417?text=Ol%C3%A1!%20Quero%20agendar%20um%20hor%C3%A1rio%20na%20Lou%C3%A7as%20Por%20Esmaltes.'

type ServiceCategory = 'Todos' | 'Maos' | 'Pes' | 'Combos'

const services = [
  {
    id: 1,
    category: 'Maos' as ServiceCategory,
    name: 'Esmaltacao em Gel',
    description: 'Brilho intenso e durabilidade excepcional para o dia a dia.',
    price: 'R$ 70,00',
    image: '/service-esmaltacao-gel.jpg',
    tag: 'Mais Pedido',
  },
  {
    id: 2,
    category: 'Maos' as ServiceCategory,
    name: 'Alongamento em Gel',
    description: 'Unhas alongadas com gel de alta qualidade, forma perfeita.',
    price: 'R$ 220,00',
    image: '/service-alongamento-gel.jpg',
    tag: 'Premium',
  },
  {
    id: 3,
    category: 'Maos' as ServiceCategory,
    name: 'Banho em Gel Esmaltado',
    description: 'Acabamento impecavel com gel esmaltado de longa duracao.',
    price: 'R$ 150,00',
    image: '/service-banho-gel.jpg',
    tag: null,
  },
  {
    id: 4,
    category: 'Maos' as ServiceCategory,
    name: 'Manicure Classica',
    description: 'Cuidado completo para maos, cuticulas e unhas impecaveis.',
    price: 'R$ 35,00',
    image: '/service-manicure.jpg',
    tag: null,
  },
  {
    id: 5,
    category: 'Pes' as ServiceCategory,
    name: 'Pedicure Spa',
    description: 'Um ritual completo de cuidado para pes leves e bem tratados.',
    price: 'R$ 55,00',
    image: '/service-pedicure.jpg',
    tag: 'Favorita',
  },
  {
    id: 6,
    category: 'Combos' as ServiceCategory,
    name: 'Combo Maos + Pes',
    description: 'Manicure e pedicure juntos com desconto especial.',
    price: 'R$ 80,00',
    image: '/service-manicure.jpg',
    tag: 'Oferta',
  },
]



const categories = [
  { key: 'Todos' as ServiceCategory, label: 'Todos' },
  { key: 'Maos' as ServiceCategory, label: 'Mãos' },
  { key: 'Pes' as ServiceCategory, label: 'Pés' },
  { key: 'Combos' as ServiceCategory, label: 'Combos' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('Todos')
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [headerScrolled, setHeaderScrolled] = useState(false)

  const filteredServices =
    activeCategory === 'Todos'
      ? services
      : services.filter((s) => s.category === activeCategory)

  const cardsPerView = 3
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
    const handleScroll = () => setHeaderScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="site-shell">

      {/* HEADER */}
      <header className={headerScrolled ? 'site-header scrolled' : 'site-header'}>
        <a href="#inicio" className="brand" aria-label="Louças Por Esmaltes, início">
          <span>Louças Por Esmaltes</span>
        </a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Navegação principal">
          <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
          <a href="#esmaltes" onClick={() => setMenuOpen(false)}>Esmaltes</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>A loja</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
        </nav>
        <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          Agendar <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="hero-bg" style={{ backgroundImage: 'url(/hero-salon.jpg)' }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={12} />
            <span>Beleza que começa nos detalhes</span>
          </div>
          <h1>Seu ritual de<br /><em>cor</em> e cuidado.</h1>
          <p className="hero-text">
            Esmaltes escolhidos com carinho e serviços pensados para deixar suas mãos e pés ainda mais bonitos.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              Agendar pelo WhatsApp <ArrowUpRight size={16} />
            </a>
            <a className="btn btn-outline" href="#servicos">
              Ver Serviços <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="intro-strip" id="sobre">
        <p className="section-kicker">Louças Por Esmaltes &middot; Marabá, PA</p>
        <p className="intro-statement">
          Um espaço para escolher sua próxima cor, cuidar de si e sair se sentindo ainda mais você.
        </p>
        <div className="intro-features">
          <div className="intro-feat">
            <Heart size={17} />
            <span>Atendimento personalizado</span>
          </div>
          <div className="intro-feat">
            <Sparkles size={17} />
            <span>Produtos de alta qualidade</span>
          </div>
          <div className="intro-feat">
            <MapPin size={17} />
            <span>Marabá, PA</span>
          </div>
        </div>
      </section>

      {/* SERVICOS */}
      <section className="services-section" id="servicos">
        <div className="services-head">
          <p className="section-kicker center">Para suas mãos &amp; pés</p>
          <h2>Nossos <em>Serviços</em></h2>
          <p className="services-subtitle">
            Cuidados pensados para <mark>realçar sua beleza</mark> com sofisticação e carinho.
          </p>
          <div className="section-line">
            <span className="section-dot" />
          </div>
        </div>

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

        <div className="carousel-wrap">
          <button
            className={canPrev ? 'c-arrow c-arrow-left' : 'c-arrow c-arrow-left disabled'}
            onClick={prev}
            aria-label="Anterior"
            disabled={!canPrev}
          >
            <ChevronLeft size={22} />
          </button>

          <div className="carousel-viewport">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(calc(-${carouselIndex * (100 / cardsPerView)}% - ${carouselIndex * 20}px))`,
              }}
            >
              {filteredServices.map((s) => (
                <div className="svc-card" key={s.id}>
                  <div className="svc-img">
                    <img src={s.image} alt={s.name} loading="lazy" />
                    {s.tag && <span className="svc-tag">{s.tag}</span>}
                  </div>
                  <div className="svc-body">
                    <h3 className="svc-name">{s.name}</h3>
                    <p className="svc-desc">{s.description}</p>
                    <div className="svc-footer">
                      <span className="svc-price">{s.price}</span>
                      <a className="svc-btn" href={whatsappUrl} target="_blank" rel="noreferrer">
                        Agendar <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={canNext ? 'c-arrow c-arrow-right' : 'c-arrow c-arrow-right disabled'}
            onClick={next}
            aria-label="Proximo"
            disabled={!canNext}
          >
            <ChevronRight size={22} />
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
      </section>

      {/* ESMALTES */}
      <section className="polish-section section-wrap" id="esmaltes">
        <div className="polish-head">
          <div>
            <p className="section-kicker">A prateleira da vez</p>
            <h2>Cores que <em>falam.</em></h2>
          </div>
          <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">
            Falar com a loja <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="polish-grid">
          {[
            { color: '#dc2f83', name: 'Rosa Manha', swatch: 'Cremoso' },
            { color: '#8c1c70', name: 'Uva Intensa', swatch: 'Cremoso' },
            { color: '#f08aae', name: 'Ballet', swatch: 'Delicado' },
            { color: '#64145f', name: 'Noite em Maraba', swatch: 'Cremoso' },
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
                <Heart size={17} className="polish-heart" />
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* CONTATO */}
      <section className="contact-section" id="contato">
        <div className="contact-glow" />
        <div className="contact-content">
          <p className="eyebrow light"><Sparkles size={13} /> Vamos marcar seu momento?</p>
          <h2>Seu próximo<br /><em>colorido</em> começa aqui.</h2>
          <a className="btn btn-light" href={whatsappUrl} target="_blank" rel="noreferrer">
            Chamar no WhatsApp <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="contact-details">
          <div>
            <MapPin size={18} />
            <span>Avenida Castelo Branco, nº 1887<br />Marabá, PA · 68501-700</span>
          </div>
          <div>
            <Phone size={18} />
            <span>(94) 99149-2417</span>
          </div>
          <div>
            <Clock3 size={18} />
            <span>Consulte horários<br />pelo WhatsApp</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          {/* Coluna 1 — Marca */}
          <div className="footer-col footer-col-brand">
            <a href="#inicio" className="footer-logo-text">Louças Por Esmaltes</a>
            <p className="footer-about">
              Espaço especializado em cuidados para mãos e pés, localizado em Marabá, PA.
              Venha nos visitar e sinta a diferença de um atendimento feito com carinho.
            </p>
            <div className="footer-social">
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href={whatsappUrl} aria-label="WhatsApp" target="_blank" rel="noreferrer">
                <Phone size={17} />
              </a>
            </div>
          </div>

          {/* Coluna 2 — Navegação */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navegação</h4>
            <ul className="footer-links">
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#esmaltes">Esmaltes</a></li>
              <li><a href="#sobre">A loja</a></li>
              <li><a href="#contato">Contato</a></li>
              <li><a href={whatsappUrl} target="_blank" rel="noreferrer">Agendar horário</a></li>
            </ul>
          </div>

          {/* Coluna 3 — Contato */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contato</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={14} />
                <span>Av. Castelo Branco, nº 1887<br />Marabá, PA · 68501-700</span>
              </li>
              <li>
                <Phone size={14} />
                <a href={whatsappUrl} target="_blank" rel="noreferrer">(94) 99149-2417</a>
              </li>
              <li>
                <Clock3 size={14} />
                <span>Consulte horários pelo WhatsApp</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4 — Serviços destaque */}
          <div className="footer-col">
            <h4 className="footer-col-title">Serviços</h4>
            <ul className="footer-links">
              <li><a href="#servicos">Manicure</a></li>
              <li><a href="#servicos">Pedicure</a></li>
              <li><a href="#servicos">Esmaltação em Gel</a></li>
              <li><a href="#servicos">Alongamento em Gel</a></li>
              <li><a href="#servicos">Banho em Gel Esmaltado</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Louças Por Esmaltes · Marabá, PA. Todos os direitos reservados.</p>
          <p className="footer-tagline">Cor, cuidado e um tempo só seu.</p>
        </div>
      </footer>
    </main>
  )
}
