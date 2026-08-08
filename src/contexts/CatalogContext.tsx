import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { products as fallbackProducts } from '../data/products'
import { catalogApi, type NewCatalogItem } from '../lib/catalog'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type { CatalogItem } from '../types'

type CatalogContextValue = {
  items: CatalogItem[]
  isLoading: boolean
  error: string | null
  addItem: (item: NewCatalogItem) => Promise<CatalogItem>
}

const CatalogContext = createContext<CatalogContextValue | null>(null)

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CatalogItem[]>(fallbackProducts)
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Supabase no est\u00e1 configurado; se muestra el cat\u00e1logo local.')
      return
    }

    let active = true
    // This is deliberately the only complete catalog query for the app lifetime.
    void catalogApi.list().then(
      (catalog) => {
        if (!active) return
        // Preserve the current visual catalog until its existing items have been
        // imported into Supabase; once rows exist, Supabase is the source of truth.
        setItems(catalog.length ? catalog : fallbackProducts)
        setIsLoading(false)
      },
      () => {
        if (!active) return
        setError('No pudimos cargar el cat\u00e1logo en este momento.')
        setIsLoading(false)
      },
    )

    const channel = supabase
      .channel('catalog-items-inserts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'catalog_items' }, (payload) => {
        const item = payload.new as CatalogItem
        setItems((current) => current.some(({ id }) => id === item.id) ? current : [...current, item])
      })
      .subscribe()

    return () => {
      active = false
      void supabase.removeChannel(channel)
    }
  }, [])

  const value = useMemo<CatalogContextValue>(() => ({
    items,
    isLoading,
    error,
    async addItem(item) {
      const created = await catalogApi.create(item)
      setItems((current) => current.some(({ id }) => id === created.id) ? current : [...current, created])
      return created
    },
  }), [error, isLoading, items])

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCatalog() {
  const context = useContext(CatalogContext)
  if (!context) throw new Error('useCatalog debe utilizarse dentro de CatalogProvider.')
  return context
}
