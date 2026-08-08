import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// SUPABASE_* is intentionally exposed because only the public anon key belongs
// in this frontend. Never use this prefix for a service-role key.
export default defineConfig({ plugins: [react()], envPrefix: ['VITE_', 'SUPABASE_'] })
