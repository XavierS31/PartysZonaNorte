import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { business } from '../config/business'

const logo = new URL('../../assets/topbarlogo.png', import.meta.url).href

const links = [
  ['Inicio', '/'],
  ['Nosotros', '/about'],
  ['Catálogo', '/products'],
  ['Contacto', '/contact'],
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const cls = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-sm font-display font-bold transition hover:text-butter after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-butter after:transition-all ${isActive ? 'text-butter after:w-full' : 'text-ink after:w-0 hover:after:w-full'}`

  return (
    <header className="sticky top-0 z-50 border-b-2 border-butter/70 bg-white">
      <nav className="shell flex h-24 items-center justify-between gap-4" aria-label="Navegación principal">
        <Link to="/" className="flex shrink-0 items-center" aria-label={`${business.name} inicio`}>
          <img
            src={logo}
            alt="Logo de PartyZonaNorte"
            className="h-20 w-auto max-w-[82vw] object-contain sm:h-[84px] sm:max-w-[420px]"
          />
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} className={cls}>
              {label}
            </NavLink>
          ))}
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            aria-label="Ver catálogo"
            to="/products"
            className="rounded-full border-2 border-ink bg-butter p-2 shadow-neo transition hover:scale-105"
          >
            <ShoppingBag size={19} />
          </Link>
          <Link to="/contact" className="neo-btn-primary px-5 py-2.5">
            Contáctanos
          </Link>
        </div>
        <button
          className="rounded-full border-2 border-ink bg-white p-2 shadow-neo lg:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="shell border-t-2 border-butter/50 bg-pink-50 py-4 lg:hidden">
          <div className="grid gap-3">
            {links.map(([label, path]) => (
              <NavLink key={path} onClick={() => setOpen(false)} to={path} className={cls}>
                {label}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="neo-btn-primary mt-2 w-fit">
              Contáctanos
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
