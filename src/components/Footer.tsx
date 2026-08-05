import { Link } from 'react-router-dom'
import { ArrowUp, Instagram } from 'lucide-react'
import { business } from '../config/business'

const logo = new URL('../../assets/logo.jpg', import.meta.url).href

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-hot text-white">
      <div className="shell flex flex-wrap items-center justify-between gap-6 py-8">
        <div className="flex items-center gap-3">
          <span className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-ink bg-white shadow-neo">
            <img
              src={logo}
              alt="Logo de PartyZonaNorte"
              className="h-full w-full scale-125 object-cover object-center -translate-y-1"
            />
          </span>
          <div>
            <p className="font-display text-sm font-extrabold uppercase tracking-wide">PartyZonaNorte</p>
            <p className="text-xs text-white/85">
              © {new Date().getFullYear()} {business.name}. Celebra con alegría.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs font-display font-bold uppercase tracking-wide">
          <Link to="/" className="transition hover:text-butter">
            Inicio
          </Link>
          <Link to="/about" className="transition hover:text-butter">
            Nosotros
          </Link>
          <Link to="/products" className="transition hover:text-butter">
            Catálogo
          </Link>
          <Link to="/contact" className="transition hover:text-butter">
            Contacto
          </Link>
          <a
            href={`https://instagram.com/${business.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 transition hover:text-butter"
          >
            <Instagram size={14} />
            Instagram
          </a>
        </div>
        <button
          aria-label="Volver arriba"
          onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
          className="rounded-full border-2 border-ink bg-butter p-2.5 text-ink shadow-neo transition hover:scale-105"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  )
}
