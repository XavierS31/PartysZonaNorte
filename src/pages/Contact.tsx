import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CakeSlice, Flower2, Gift, Loader2, Mail, MapPin, MessageCircle, PartyPopper, Phone, Sprout, ToyBrick } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { business } from '../config/business'
import { sendContactEmail, type ContactPayload } from '../services/email'
import { Seo } from '../components/Seo'
import { FloatingBalloon } from '../components/FloatingBalloon'

const schema = z.object({
  firstName: z.string().min(2, 'Escribe tu nombre'),
  lastName: z.string().min(2, 'Escribe tu apellido'),
  email: z.string().email('Ingresa un correo válido'),
  phone: z.string().min(7, 'Ingresa un teléfono válido'),
  subject: z.string().min(3, 'Agrega un asunto'),
  message: z.string().min(10, 'Cuéntanos un poco más'),
})

export default function Contact() {
  const [status, setStatus] = useState<{ type: 'ok' | 'error'; text: string } | null>(null)
  const [params] = useSearchParams()
  const requestedService = params.get('service')
  const requestedProduct = params.get('product')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactPayload>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: requestedService ? `Solicitud: ${requestedService}` : '',
      message: requestedService
        ? `Hola, me gustaría solicitar algo como ${requestedProduct || 'esta creación'} en la categoría ${requestedService}.`
        : '',
    },
  })
  const submit = async (data: ContactPayload) => {
    setStatus(null)
    try {
      await sendContactEmail(data)
      setStatus({ type: 'ok', text: '¡Gracias! Tu mensaje fue enviado a nuestro equipo.' })
      reset()
    } catch (error) {
      setStatus({
        type: 'error',
        text: error instanceof Error ? error.message : 'Algo salió mal. Por favor, inténtalo de nuevo.',
      })
    }
  }
  const err = (error?: { message?: string }) =>
    error && <p className="mt-1 text-xs text-[#ba1a1a]">{error.message}</p>

  return (
    <>
      <Seo title="Contacto" />
      <section className="section relative overflow-hidden bg-sky">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(white_1.2px,transparent_1.2px)] [background-size:19px_19px]" />
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [-7, 5, -7] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-5 top-12 hidden rounded-neo border-2 border-ink bg-butter p-3 text-ink shadow-neo xl:block"
        >
          <CakeSlice size={27} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [7, -5, 7] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute right-5 top-20 hidden rounded-full border-2 border-ink bg-pink-200 p-3 text-ink shadow-neo xl:block"
        >
          <Gift size={27} />
        </motion.div>
        <div className="absolute bottom-14 left-[8%] hidden rounded-full border-2 border-ink bg-white p-3 shadow-neo lg:block">
          <Flower2 size={26} />
        </div>
        <div className="absolute bottom-10 right-[10%] hidden rotate-12 rounded-neo border-2 border-ink bg-butter p-3 shadow-neo lg:block">
          <ToyBrick size={25} />
        </div>
        <div className="absolute right-[19%] top-[46%] hidden rounded-full border-2 border-ink bg-cyan-100 p-3 shadow-neo xl:block">
          <Sprout size={24} />
        </div>
        <FloatingBalloon className="left-8 top-[47%] hidden xl:block" colorClass="bg-hot" tailClass="border-t-hot" delay={0.25} />
        <FloatingBalloon className="right-8 bottom-24 hidden xl:block" colorClass="bg-butter" tailClass="border-t-butter" delay={0.6} size="sm" />
        <div className="shell relative">
          <div className="grid gap-10 rounded-neo border-2 border-ink bg-white p-6 shadow-neo lg:grid-cols-[.8fr_1.2fr] lg:p-10">
            <div className="rounded-neo border-2 border-ink bg-berry p-6 text-white shadow-neo sm:p-8">
              <p className="neo-badge">Hagamos magia</p>
              <h1 className="mt-5 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
                Cuéntanos sobre tu celebración.
              </h1>
              <p className="mt-4 leading-7 text-white/95">
                ¿Tienes una idea, una pregunta o una fecha para planear? Nos encantará conocer todos los
                detalles.
              </p>
              <div className="mt-8 grid gap-5 text-sm">
                <p className="flex gap-3">
                  <Phone className="shrink-0 text-butter" />
                  <span>
                    <b>Llámanos o escríbenos</b>
                    <br />
                    {business.phone}
                  </span>
                </p>
                <div className="flex gap-3">
                  <Mail className="mt-1 shrink-0 text-butter" />
                  <span>
                    <b>Correo</b>
                    <br />
                    <a
                      href={`mailto:${business.contactEmail}`}
                      className="block underline decoration-butter underline-offset-2"
                    >
                      {business.contactEmail}
                    </a>
                  </span>
                </div>
                <p className="flex gap-3">
                  <MapPin className="shrink-0 text-butter" />
                  <span>
                    <b>Ubicación</b>
                    <br />
                    {business.address}
                  </span>
                </p>
                <div className="rounded-neo border-2 border-ink bg-[#25D366] p-5 text-ink shadow-neo">
                  <p className="font-display font-bold">¿Quieres contactarnos por WhatsApp?</p>
                  <a
                    href={`https://wa.me/${business.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="neo-btn-white mt-4"
                  >
                    <MessageCircle size={18} />
                    Escríbenos por WhatsApp
                  </a>
                </div>
              </div>
            </div>
            <form
              noValidate
              onSubmit={handleSubmit(submit)}
              className="rounded-neo border-2 border-ink bg-cyan p-6 text-white shadow-neo sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-bold">
                  Nombre
                  <input {...register('firstName')} className="field" />
                  {err(errors.firstName)}
                </label>
                <label className="text-sm font-bold">
                  Apellido
                  <input {...register('lastName')} className="field" />
                  {err(errors.lastName)}
                </label>
                <label className="text-sm font-bold">
                  Correo electrónico
                  <input type="email" {...register('email')} className="field" />
                  {err(errors.email)}
                </label>
                <label className="text-sm font-bold">
                  Teléfono
                  <input type="tel" {...register('phone')} className="field" />
                  {err(errors.phone)}
                </label>
              </div>
              <label className="mt-5 block text-sm font-bold">
                Asunto
                <input {...register('subject')} className="field" />
                {err(errors.subject)}
              </label>
              <label className="mt-5 block text-sm font-bold">
                Mensaje
                <textarea rows={5} {...register('message')} className="field resize-y" />
                {err(errors.message)}
              </label>
              {status && (
                <div
                  role="status"
                  className={`mt-5 rounded-xl p-3 text-sm ${status.type === 'ok' ? 'bg-cyan-100 text-cyan' : 'bg-red-50 text-[#ba1a1a]'}`}
                >
                  {status.text}
                </div>
              )}
              <button disabled={isSubmitting} className="neo-btn-primary mt-6 w-full disabled:opacity-60">
                {isSubmitting && <Loader2 size={17} className="animate-spin" />}
                {isSubmitting ? 'Enviando…' : 'Enviar mensaje'}
              </button>
            </form>
          </div>
          
        </div>
      </section>
    </>
  )
}
