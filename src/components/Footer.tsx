import { Link } from 'react-router-dom';
import { ArrowUp, Instagram } from 'lucide-react';
import { business } from '../config/business';

const logo = new URL('../../assets/logo2-white-small.png', import.meta.url).href;

export function Footer() {
  return (
    <footer className="border-t border-butter/40 bg-gradient-to-br from-white via-pink-50 to-cyan-50">
      <div className="shell flex flex-wrap items-center justify-between gap-6 py-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white">
            <img src={logo} alt="Logo de PartyZonaNorte" className="h-16 w-16 object-contain" />
          </span>
          <div>
            <p className="font-display text-sm font-extrabold uppercase tracking-wide">
              <span className="text-butter">PartyZonaNorte</span>
            </p>
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} {business.name}. Celebra con alegría.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-display font-bold uppercase tracking-wide">
          <Link to="/privacy" className="transition hover:text-hot">
            Política de Privacidad
          </Link>
          <Link to="/terms" className="transition hover:text-hot">
            Términos de Servicio
          </Link>
          <Link to="/contact" className="transition hover:text-hot">
            Soporte
          </Link>
          <a
            href={`https://instagram.com/${business.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 transition hover:text-hot"
          >
            <Instagram size={14} />
            Instagram
          </a>
        </div>

        <button
          aria-label="Volver arriba"
          onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
          className="rounded-full border-2 border-butter bg-white p-2.5 shadow-pink transition hover:scale-105"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
