import { useEffect, useState, type ReactNode } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

export function AdminGuard({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [checking, setChecking] = useState(true)
  const [denied, setDenied] = useState(false)
  const [accessError, setAccessError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setChecking(false)
      return
    }

    let active = true
    const applySession = async (hasUser: boolean) => {
      if (!active) return
      if (!hasUser) {
        setIsAdmin(false)
        setChecking(false)
        return
      }

      // This RPC returns only a boolean; the allowlist stays in Supabase.
      const { data, error } = await supabase.rpc('is_catalog_admin')
      if (!active) return
      if (error || data !== true) {
        setIsAdmin(false)
        setDenied(true)
        setAccessError(error ? `No se pudo comprobar el acceso: ${error.message}` : null)
        void supabase.auth.signOut()
      } else {
        setIsAdmin(true)
        setDenied(false)
        setAccessError(null)
      }
      setChecking(false)
    }

    void supabase.auth.getSession().then(({ data }) => applySession(Boolean(data.session?.user)))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => void applySession(Boolean(session?.user)))
    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signIn = async () => {
    setDenied(false)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/admin` },
    })
    if (error) setDenied(true)
  }

  if (checking) {
    return <div className="grid min-h-[60vh] place-items-center"><div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-200 border-t-hot" /></div>
  }

  if (!isSupabaseConfigured) {
    return <AccessPanel message="Faltan las variables SUPABASE_URL y SUPABASE_ANON_KEY." />
  }

  if (!isAdmin) {
    return (
      <AccessPanel
        message={accessError || (denied ? 'Esta cuenta no tiene permiso para administrar el cat\u00e1logo.' : 'Inicia sesi\u00f3n con una cuenta autorizada para administrar el cat\u00e1logo.')}
        action={<button onClick={() => void signIn()} className="neo-btn-primary">Continuar con Google</button>}
      />
    )
  }

  return <>{children}</>
}

function AccessPanel({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <section className="section grid min-h-[60vh] place-items-center bg-gradient-to-br from-pink-50 via-white to-cyan-100">
      <div className="neo-card max-w-lg p-8 text-center sm:p-10">
        <p className="neo-badge bg-butter">Acceso restringido</p>
        <h1 className="mt-5 text-2xl font-extrabold uppercase">Portal de administracion</h1>
        <p className="mt-4 leading-7 text-muted">{message}</p>
        {action && <div className="mt-7">{action}</div>}
      </div>
    </section>
  )
}
