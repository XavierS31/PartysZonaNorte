import { FormEvent, useState } from 'react'
import { CheckCircle2, ImagePlus, LayoutDashboard, LogOut, PlusCircle } from 'lucide-react'
import { AdminGuard } from '../components/AdminGuard'
import { Seo } from '../components/Seo'
import { useCatalog } from '../contexts/CatalogContext'
import { catalogApi } from '../lib/catalog'
import { supabase } from '../lib/supabase'
import { services } from '../data/products'

type AdminFormValues = {
  title: string
  service: string
  customService: string
  image: string
  badge: string
  description: string
}

const blankForm: AdminFormValues = {
  title: '',
  service: services[0],
  customService: '',
  image: '',
  badge: '',
  description: '',
}

export default function Admin() {
  return <AdminGuard><AdminForm /></AdminGuard>
}

function AdminForm() {
  const { addItem, items } = useCatalog()
  const [form, setForm] = useState(blankForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const isCustomService = form.service === '__custom__'

  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }))

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    const service = (isCustomService ? form.customService : form.service).trim()

    if (!imageFile) {
      try {
        const imageUrl = new URL(form.image)
        if (!['http:', 'https:'].includes(imageUrl.protocol)) throw new Error()
      } catch {
        setError('Selecciona una imagen o ingresa una URL de imagen valida (https://...).')
        return
      }
    }
    if (!service) {
      setError('Selecciona o escribe un servicio.')
      return
    }

    setSaving(true)
    try {
      const image = imageFile ? await catalogApi.uploadImage(imageFile) : form.image.trim()
      await addItem({
        title: form.title.trim(),
        service,
        image,
        badge: form.badge.trim() || undefined,
        description: form.description.trim(),
      })
      setForm(blankForm)
      setImageFile(null)
      setMessage('El elemento fue publicado y ya aparece en el catalogo.')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No fue posible publicar el elemento.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
        <Seo title="Administrar catalogo" />
      <section className="section relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-cyan-100">
        <div className="absolute -left-10 top-16 h-40 w-40 rounded-full border-2 border-ink bg-butter/70" />
        <div className="absolute -right-10 bottom-12 h-48 w-48 rounded-neo border-2 border-ink bg-sky/40" />
        <div className="shell relative max-w-4xl">
          <div className="flex flex-wrap items-start justify-between gap-5 rounded-neo border-2 border-ink bg-hot p-7 text-white shadow-neo sm:p-9">
            <div>
              <p className="neo-badge bg-butter text-ink">Solo administradores</p>
              <h1 className="mt-5 text-3xl font-extrabold uppercase sm:text-4xl">Panel del catalogo</h1>
              <p className="mt-3 max-w-xl text-white/90">Agrega una creacion al catalogo publico de PartyZonaNorte.</p>
            </div>
            <button onClick={() => void supabase.auth.signOut()} className="neo-btn-white text-xs uppercase">
              <LogOut size={16} /> Salir
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="neo-card flex items-center gap-4 p-5">
              <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-sky shadow-neo"><LayoutDashboard size={22} /></span>
              <div><p className="text-xs font-bold uppercase text-muted">Elementos visibles</p><p className="font-display text-3xl font-extrabold">{items.length}</p></div>
            </div>
            <div className="neo-card flex items-center gap-4 p-5">
              <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-butter shadow-neo"><ImagePlus size={22} /></span>
              <p className="text-sm font-bold leading-6">Publica con una imagen subida o una URL externa.</p>
            </div>
          </div>

          <form onSubmit={(event) => void submit(event)} className="neo-card mt-8 p-6 sm:p-9">
            <h2 className="font-display text-xl font-extrabold uppercase">Agregar nueva publicacion</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-bold">Titulo
                <input required value={form.title} onChange={(e) => update('title', e.target.value)} className="field" placeholder="Ej. Bouquet de cumpleanos" />
              </label>
              <label className="text-sm font-bold">Servicio
                <select value={form.service} onChange={(e) => update('service', e.target.value)} className="field">
                  {services.map((service) => <option key={service} value={service}>{service}</option>)}
                  <option value="__custom__">Otro servicio</option>
                </select>
              </label>
              {isCustomService && <label className="text-sm font-bold sm:col-span-2">Nombre del servicio
                <input required value={form.customService} onChange={(e) => update('customService', e.target.value)} className="field" placeholder="Escribe el servicio" />
              </label>}
              <label className="text-sm font-bold sm:col-span-2">Imagen
                <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="field cursor-pointer" />
                <span className="mt-1 block text-xs font-normal text-muted">Sube una imagen (PNG, JPG, WEBP o GIF) o usa una URL a continuacion.</span>
              </label>
              <label className="text-sm font-bold sm:col-span-2">URL de imagen (opcional si subes un archivo)
                <input type="url" value={form.image} onChange={(e) => update('image', e.target.value)} className="field" placeholder="https://..." />
              </label>
              <label className="text-sm font-bold sm:col-span-2">Etiqueta (opcional)
                <input value={form.badge} onChange={(e) => update('badge', e.target.value)} className="field" placeholder="Ej. Mas solicitado" />
              </label>
              <label className="text-sm font-bold sm:col-span-2">Descripcion
                <textarea required value={form.description} onChange={(e) => update('description', e.target.value)} className="field min-h-32 resize-y" placeholder="Describe el producto o servicio." />
              </label>
            </div>
            {error && <p role="alert" className="mt-5 rounded-lg border-2 border-ink bg-pink-100 p-3 text-sm font-bold text-berry">{error}</p>}
            {message && <p role="status" className="mt-5 flex items-center gap-2 rounded-lg border-2 border-ink bg-cyan-100 p-3 text-sm font-bold"><CheckCircle2 size={18} />{message}</p>}
            <button disabled={saving} className="neo-btn-primary mt-7 disabled:cursor-not-allowed disabled:opacity-60">
              <PlusCircle size={18} /> {saving ? 'Publicando...' : 'Publicar en el catalogo'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
