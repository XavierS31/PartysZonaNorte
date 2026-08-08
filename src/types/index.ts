export type CatalogItem = {
  id: string
  title: string
  service: string
  image: string
  badge?: string
  description: string
}

// Product is kept as an alias so existing presentational components stay simple.
export type Product = CatalogItem
