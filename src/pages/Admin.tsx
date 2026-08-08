import { FormEvent, useState } from 'react'
import { CakeSlice, CheckCircle2, Gift, LayoutDashboard, LogOut, Pencil, PlusCircle, Trash2 } from 'lucide-react'
import { AdminGuard } from '../components/AdminGuard'
import { FloatingBalloon } from '../components/FloatingBalloon'
import { Seo } from '../components/Seo'
import { useCatalog } from '../contexts/CatalogContext'
import { services } from '../data/products'
import { catalogApi } from '../lib/catalog'
import { supabase } from '../lib/supabase'
import type { CatalogItem } from '../types'

type AdminFormValues = {
  title: string
  service: string
  customService: string
  image: string
  badge: string
  description: string
}

const blankForm: AdminFormValues = {
  title: '', service: services[0], customService: '', image: '', badge: '', description: '',
}

export default function Admin() {
  return <AdminGuard><AdminDashboard /></AdminGuard>
}

function AdminDashboard() {
  const { addItem, deleteItem, items, updateItem } = useCatalog()
  const [form, setForm] = useState(blankForm)
  const [editing, setEditing] = useState<CatalogItem | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [fileInputKey, setFileInputKey] = useState(0)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const isCustomService = form.service === '__custom__'

  const update = (field: keyof AdminFormValues, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const resetForm = () => {
    setForm(blankForm)
    setEditing(null)
    setImageFile(null)
    setFileInputKey((key) => key + 1)
  }

  const startEditing = (item: CatalogItem) => {
    const knownService = services.includes(item.service as (typeof services)[number])
    setForm({
      title: item.title,
      service: knownService ? item.service : '__custom__',
      customService: knownService ? '' : item.service,
      image: item.image,
      badge: item.badge || '',
      description: item.description,
    })
    setEditing(item)
    setImageFile(null)
    setFileInputKey((key) => key + 1)
    setMessage(null)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    const service = (isCustomService ? form.customService : form.service).trim()
    if (!service) return setError('Selecciona o escribe un servicio.')

    if (!imageFile) {
      try {
        const url = new URL(form.image)
        if (!['http:', 'https:'].includes(url.protocol)) throw new Error()
      } catch {
        return setError('Selecciona una imagen o ingresa una URL de imagen válida (https://...).')
      }
    }

    setSaving(true)
    try {
      const image = imageFile ? await catalogApi.uploadImage(imageFile) : form.image.trim()
      const payload = { title: form.title.trim(), service, image, badge: form.badge.trim() || undefined, description: form.description.trim() }
      if (editing) {
        await updateItem(editing.id, payload)
        setMessage('La publicación fue actualizada y el catálogo ya muestra los cambios.')
      } else {
        await addItem(payload)
        setMessage('La publicación fue creada y ya aparece en el catálogo.')
      }
      resetForm()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No fue posible guardar la publicación.')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (item: CatalogItem) => {
    if (!window.confirm(`¿Eliminar “${item.title}” del catálogo? Esta acción no se puede deshacer.`)) return
    setDeletingId(item.id)
    setError(null)
    try {
      await deleteItem(item.id)
      if (editing?.id === item.id) resetForm()
      setMessage('La publicación fue eliminada del catálogo.')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No fue posible eliminar la publicación.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <Seo title="Administrar catálogo" />
      <section className="section relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-cyan-100">
        <div className="absolute -left-10 top-16 h-40 w-40 rounded-full border-2 border-ink bg-butter/70" />
        <div className="absolute -right-10 bottom-12 h-48 w-48 rounded-neo border-2 border-ink bg-sky/40" />
        <FloatingBalloon className="left-8 top-[30rem] hidden xl:block" colorClass="bg-hot" tailClass="border-t-hot" delay={0.3} />
        <FloatingBalloon className="right-10 top-32 hidden xl:block" colorClass="bg-butter" tailClass="border-t-butter" delay={0.6} size="sm" />
        <div className="shell relative max-w-6xl">
          <header className="relative overflow-hidden rounded-neo border-2 border-ink bg-hot p-7 text-white shadow-neo sm:p-9">
            <CakeSlice className="absolute -bottom-5 right-8 rotate-12 text-butter" size={86} strokeWidth={1.5} />
            <div className="relative flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="neo-badge bg-butter text-ink">Solo administradores</p>
                <h1 className="mt-5 text-3xl font-extrabold uppercase sm:text-4xl">Panel del catálogo</h1>
                <p className="mt-3 max-w-xl text-white/90">Crea, edita y organiza las creaciones de PartyZonaNorte.</p>
              </div>
              <button type="button" onClick={() => void supabase.auth.signOut()} className="neo-btn-white text-xs uppercase"><LogOut size={16} /> Salir</button>
            </div>
          </header>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="neo-card flex items-center gap-4 p-5"><span className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-sky shadow-neo"><LayoutDashboard size={22} /></span><div><p className="text-xs font-bold uppercase text-muted">Elementos en catálogo</p><p className="font-display text-3xl font-extrabold">{items.length}</p></div></div>
            <div className="neo-card flex items-center gap-4 p-5"><span className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-butter shadow-neo"><Gift size={22} /></span><p className="text-sm font-bold leading-6">Sube una imagen o usa una URL. Cada cambio se refleja al instante.</p></div>
          </div>

          <form onSubmit={(event) => void submit(event)} className="neo-card mt-8 p-6 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-display text-xl font-extrabold uppercase">{editing ? 'Editar publicación' : 'Agregar publicación'}</h2>{editing && <button type="button" onClick={resetForm} className="neo-btn-white text-xs uppercase">Cancelar edición</button>}</div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-bold">Título<input required value={form.title} onChange={(e) => update('title', e.target.value)} className="field" placeholder="Ej. Bouquet de cumpleaños" /></label>
              <label className="text-sm font-bold">Servicio<select value={form.service} onChange={(e) => update('service', e.target.value)} className="field">{services.map((service) => <option key={service} value={service}>{service}</option>)}<option value="__custom__">Otro servicio</option></select></label>
              {isCustomService && <label className="text-sm font-bold sm:col-span-2">Nombre del servicio<input required value={form.customService} onChange={(e) => update('customService', e.target.value)} className="field" placeholder="Escribe el servicio" /></label>}
              <label className="text-sm font-bold sm:col-span-2">Imagen<input key={fileInputKey} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="field cursor-pointer" /><span className="mt-1 block text-xs font-normal text-muted">PNG, JPG, WEBP o GIF. Al editar, deja vacío para conservar la imagen actual.</span></label>
              <label className="text-sm font-bold sm:col-span-2">URL de imagen (opcional si subes archivo)<input type="url" value={form.image} onChange={(e) => update('image', e.target.value)} className="field" placeholder="https://..." /></label>
              <label className="text-sm font-bold sm:col-span-2">Etiqueta (opcional)<input value={form.badge} onChange={(e) => update('badge', e.target.value)} className="field" placeholder="Ej. Más solicitado" /></label>
              <label className="text-sm font-bold sm:col-span-2">Descripción<textarea required value={form.description} onChange={(e) => update('description', e.target.value)} className="field min-h-32 resize-y" placeholder="Describe el producto o servicio." /></label>
            </div>
            {error && <p role="alert" className="mt-5 rounded-lg border-2 border-ink bg-pink-100 p-3 text-sm font-bold text-berry">{error}</p>}
            {message && <p role="status" className="mt-5 flex items-center gap-2 rounded-lg border-2 border-ink bg-cyan-100 p-3 text-sm font-bold"><CheckCircle2 size={18} />{message}</p>}
            <button disabled={saving} className="neo-btn-primary mt-7 disabled:cursor-not-allowed disabled:opacity-60"><PlusCircle size={18} />{saving ? 'Guardando...' : editing ? 'Guardar cambios' : 'Publicar en el catálogo'}</button>
          </form>

          <section className="mt-10">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-pink-200 shadow-neo"><Gift size={18} /></span><div><h2 className="font-display text-2xl font-extrabold uppercase">Publicaciones actuales</h2><p className="text-sm text-muted">Estas son las tarjetas que se muestran en el catálogo.</p></div></div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => <article key={item.id} className="group overflow-hidden rounded-neo border-2 border-ink bg-white shadow-neo"><img src={item.image} alt={item.title} className="h-52 w-full bg-pink-50 object-cover" /><div className="p-5"><span className="rounded-full border border-ink bg-sky px-2 py-1 text-xs font-bold">{item.service}</span><h3 className="mt-3 font-display font-extrabold">{item.title}</h3><p className="mt-2 line-clamp-2 text-sm text-muted">{item.description}</p><div className="mt-5 flex gap-2"><button type="button" onClick={() => startEditing(item)} className="neo-btn-white flex-1 text-xs uppercase"><Pencil size={15} />Editar</button><button type="button" disabled={deletingId === item.id} onClick={() => void remove(item)} className="neo-btn flex-1 border-2 border-ink bg-pink-200 px-3 py-2 text-xs font-bold uppercase shadow-neo disabled:opacity-60"><Trash2 size={15} />{deletingId === item.id ? '...' : 'Eliminar'}</button></div></div></article>)}
            </div>
          </section>
        </div>
      </section>
    </>
  )
}
