import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { products, services } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { Seo } from '../components/Seo'

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const service = params.get('service') || 'Todas'
  const filtered = useMemo(() => products.filter((product) => (service === 'Todas' || product.service === service) && product.title.toLowerCase().includes(search.toLowerCase())), [search, service])
  const setService = (value: string) => setParams(value === 'Todas' ? {} : { service: value })

  return <><Seo title="Catálogo" /><section className="section bg-gradient-to-br from-white via-pink-50 to-cyan-100"><div className="shell"><div className="rounded-neo border-2 border-ink bg-hot p-7 text-white shadow-neo sm:p-10"><p className="neo-badge">Catálogo</p><h1 className="mt-4 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">Todo para celebrar a tu manera.</h1><p className="mt-4 max-w-2xl leading-7 text-white/95">Explora nuestros servicios y cuéntanos la idea que quieres hacer realidad.</p></div><div className="mt-8 rounded-neo border-2 border-ink bg-white/80 p-4 shadow-neo"><div className="relative"><Search className="absolute left-3 top-3 text-muted" size={19} /><input aria-label="Buscar en el catálogo" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Busca en el catálogo" className="field mt-0 pl-10" /></div><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => setService('Todas')} className={`rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition ${service === 'Todas' ? 'bg-butter' : 'bg-white hover:bg-pink-100'}`}>Todos</button>{services.map((item) => <button key={item} onClick={() => setService(item)} className={`rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition ${service === item ? 'bg-sky' : 'bg-white hover:bg-pink-100'}`}>{item}</button>)}<SlidersHorizontal className="ml-auto self-center text-berry" size={20} /></div></div><p className="mt-6 font-display text-sm font-bold text-muted">Mostrando {filtered.length} {filtered.length === 1 ? 'servicio' : 'servicios'}</p><div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div>{!filtered.length && <p className="mt-6 rounded-neo border-2 border-ink bg-butter/40 p-8 text-center text-muted shadow-neo">No encontramos resultados. Prueba con otro filtro.</p>}</div></section></>
}
