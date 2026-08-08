import { createClient } from '@supabase/supabase-js'

// Accept the requested .env names and the existing VITE_* aliases.
const supabaseUrl = import.meta.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// A placeholder client makes a missing local .env fail gracefully in the UI instead
// of crashing the whole React application. It is never used when configuration is absent.
export const supabase = createClient(
  supabaseUrl || 'https://example.supabase.co',
  supabaseAnonKey || 'missing-anon-key',
)

type AsyncOperation<T> = () => PromiseLike<T>

/**
 * Serializes requests and spaces their start times. Catalog reads are already
 * cached by CatalogProvider; this is a second guard for writes/retries.
 */
export function createRateLimiter(minimumIntervalMs = 250) {
  let nextAvailableAt = 0
  let queue = Promise.resolve()

  return function limit<T>(operation: AsyncOperation<T>) {
    const run = queue.then(async () => {
      const waitMs = Math.max(0, nextAvailableAt - Date.now())
      if (waitMs) await new Promise((resolve) => window.setTimeout(resolve, waitMs))
      nextAvailableAt = Date.now() + minimumIntervalMs
      return operation()
    })

    // Keep the queue usable if a request fails while returning the original rejection.
    queue = run.then(() => undefined, () => undefined)
    return run
  }
}
