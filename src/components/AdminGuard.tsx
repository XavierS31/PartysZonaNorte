import { useEffect, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const allowedEmails = new Set(['EMAIL', 'EMAIL2'])

function isAllowed(user: User | null) {
  return Boolean(user?.email && allowedEmails.has(user.email.toLowerCase()))
}

export function AdminGuard({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setChecking(false)
      return
    }

    let active = true
    const applySession = (nextUser: User | null) => {
      if (!active) return
      if (nextUser && !isAllowed(nextUser)) {
        setUser(null)
        setDenied(true)
        void supabase.auth.signOut()
      } else {
        setUser(nextUser)
        setDenied(false)
      }
      setChecking(false)
    }

    void supabase.auth.getSession().then(({ data }) => applySession(data.session?.user ?? null))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => applySession(session?.user ?? null))
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

  if (!user) {
    return (
      <AccessPanel
        message={denied ? 'Esta cuenta no tiene permiso para administrar el cat\u00e1logo.' : 'Inicia sesi\u00f3n con una cuenta autorizada para administrar el cat\u00e1logo.'}
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
        <h1 className="mt-5 text-2xl font-extrabold uppercase">Portal de administraci\u00f3n</h1>
        <p className="mt-4 leading-7 text-muted">{message}</p>
        {action && <div className="mt-7">{action}</div>}
      </div>
    </section>
  )
}
