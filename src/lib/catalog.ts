import type { CatalogItem } from '../types'
import { createRateLimiter, isSupabaseConfigured, supabase } from './supabase'

const limitCatalogRequest = createRateLimiter()

type CatalogRow = {
  id: string
  title: string
  service: string
  image: string
  badge: string | null
  description: string
}

function toCatalogItem(row: CatalogRow): CatalogItem {
  return { ...row, badge: row.badge || undefined }
}

export type NewCatalogItem = Omit<CatalogItem, 'id'>

export const catalogApi = {
  async list(): Promise<CatalogItem[]> {
    if (!isSupabaseConfigured) throw new Error('Supabase no est\u00e1 configurado.')

    const { data, error } = await limitCatalogRequest(async () =>
      await supabase.from('catalog_items').select('id, title, service, image, badge, description').order('title'),
    )
    if (error) throw error
    return (data as CatalogRow[]).map(toCatalogItem)
  },

  async create(item: NewCatalogItem): Promise<CatalogItem> {
    if (!isSupabaseConfigured) throw new Error('Supabase no est\u00e1 configurado.')

    const { data, error } = await limitCatalogRequest(async () =>
      await supabase
        .from('catalog_items')
        .insert({ ...item, badge: item.badge || null })
        .select('id, title, service, image, badge, description')
        .single(),
    )
    if (error) throw error
    return toCatalogItem(data as CatalogRow)
  },

  async uploadImage(file: File): Promise<string> {
    if (!isSupabaseConfigured) throw new Error('Supabase no est\u00e1 configurado.')
    const extension = file.name.split('.').pop()?.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'jpg'
    const path = `catalog/${crypto.randomUUID()}.${extension}`
    const { error } = await limitCatalogRequest(async () =>
      await supabase.storage.from('catalog-images').upload(path, file, {
        cacheControl: '3600',
        contentType: file.type,
        upsert: false,
      }),
    )
    if (error) throw error
    return supabase.storage.from('catalog-images').getPublicUrl(path).data.publicUrl
  },
}
