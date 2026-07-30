import { motion } from 'framer-motion'
import { Heart, PartyPopper, Search, SlidersHorizontal, Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { FloatingBalloon } from '../components/FloatingBalloon'
import { Seo } from '../components/Seo'
import { products, services } from '../data/products'

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const service = params.get('service') || 'Todas'
  const filtered = useMemo(
    () => products.filter((product) => (service === 'Todas' || product.service === service) && product.title.toLowerCase().includes(search.toLowerCase())),
    [search, service],
  )
  const setService = (value: string) => setParams(value === 'Todas' ? {} : { service: value })

  return (
    <>
      <Seo title="Catálogo" />
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-pink-50 to-cyan-100 py-14 sm:py-20">
        <div className="absolute -left-16 top-28 h-48 w-48 rounded-full border-2 border-ink bg-butter/80" />
        <div className="absolute -right-12 top-[28rem] h-52 w-52 rounded-full border-2 border-ink bg-sky/40" />
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [8, 14, 8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-6 top-20 hidden rounded-neo border-2 border-ink bg-butter p-3 shadow-neo lg:block"
        >
          <Star size={25} fill="currentColor" />
        </motion.div>
        <FloatingBalloon className="left-7 top-[29rem] hidden xl:block" colorClass="bg-hot" tailClass="border-t-hot" delay={0.45} />
        <FloatingBalloon className="right-5 bottom-20 hidden xl:block" colorClass="bg-butter" tailClass="border-t-butter" delay={0.2} size="sm" />
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [-10, -3, -10] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute left-8 top-[42rem] hidden rounded-full border-2 border-ink bg-hot p-3 text-white shadow-neo xl:block"
        >
          <Heart size={24} fill="currentColor" />
        </motion.div>

        <div className="shell relative">
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-neo border-2 border-ink bg-hot p-7 text-white shadow-neo sm:p-10"
          >
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(white_1.25px,transparent_1.25px)] [background-size:18px_18px]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-12 -right-6 h-36 w-36 rounded-full border-[18px] border-butter"
            />
            <div className="relative max-w-2xl">
              <h1 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
                Todo para celebrar a tu manera.
              </h1>
              <p className="mt-4 max-w-xl leading-7 text-white/95">
                Explora nuestros servicios y cuéntanos la idea que quieres hacer realidad.
              </p>
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="relative mt-8 rounded-neo border-2 border-ink bg-white/90 p-4 shadow-neo backdrop-blur-sm sm:p-5"
          >
            <div className="absolute -top-3 right-5 rounded-full border-2 border-ink bg-sky px-3 py-1 font-display text-xs font-extrabold shadow-neo">
              ¡Elige tu favorito!
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted" size={19} />
              <input
                aria-label="Buscar en el catálogo"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Busca en el catálogo"
                className="field mt-0 pl-10"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setService('Todas')}
                className={`rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 ${service === 'Todas' ? 'bg-butter shadow-neo' : 'bg-white hover:bg-pink-100'}`}
              >
                Todos
              </button>
              {services.map((item) => (
                <button
                  key={item}
                  onClick={() => setService(item)}
                  className={`rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 ${service === item ? 'bg-sky shadow-neo' : 'bg-white hover:bg-pink-100'}`}
                >
                  {item}
                </button>
              ))}
              <SlidersHorizontal className="ml-auto self-center text-berry" size={20} aria-hidden="true" />
            </div>
          </motion.div>

          <div className="mt-7 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-pink-200 shadow-neo">
              <PartyPopper size={17} />
            </span>
            <p className="font-display text-sm font-bold text-muted">
              Mostrando {filtered.length} {filtered.length === 1 ? 'servicio' : 'servicios'} para celebrar
            </p>
          </div>

          <div className="relative mt-5">
            <div className="absolute -left-5 top-12 hidden h-24 w-24 rotate-12 rounded-neo border-2 border-ink bg-pink-200/70 lg:block" />
            <div className="absolute -right-4 bottom-10 hidden h-20 w-20 rounded-full border-2 border-ink bg-butter/80 lg:block" />
            <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>

          {!filtered.length && (
            <p className="mt-6 rounded-neo border-2 border-ink bg-butter/40 p-8 text-center text-muted shadow-neo">
              No encontramos resultados. Prueba con otro filtro.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
