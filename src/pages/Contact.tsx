import { motion } from 'framer-motion'
import { CakeSlice, Flower2, Gift, Instagram, Mail, MapPin, MessageCircle, Phone, Sprout, ToyBrick } from 'lucide-react'
import { business } from '../config/business'
import { Seo } from '../components/Seo'
import { FloatingBalloon } from '../components/FloatingBalloon'

export default function Contact() {
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
          <div className="grid gap-8 rounded-neo border-2 border-ink bg-white p-6 shadow-neo lg:grid-cols-2 lg:items-stretch lg:p-10">
            <div className="flex h-full flex-col rounded-neo border-2 border-ink bg-berry p-6 text-white shadow-neo sm:p-8">
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
              </div>
            </div>
            <aside className="flex h-full flex-col rounded-neo border-2 border-ink bg-cyan p-6 text-white shadow-neo sm:p-8">
              <p className="neo-badge bg-white">Síguenos</p>
              <h2 className="mt-5 text-2xl font-extrabold uppercase tracking-tight">Hablemos y mantente al día.</h2>
              <p className="mt-3 text-sm leading-6">Consulta por WhatsApp los productos que quieres comprar o síguenos en Instagram para ver las novedades.</p>
              <div className="mt-auto grid gap-5 pt-8">
                <div className="rounded-neo border-2 border-ink bg-[#25D366] p-6 text-ink shadow-neo sm:p-7">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={29} strokeWidth={2.5} />
                    <p className="font-display text-xl font-extrabold uppercase tracking-tight">
                      Contáctanos por WhatsApp
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/${business.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="neo-btn-white mt-5 w-full justify-center py-3 text-sm uppercase"
                  >
                    <MessageCircle size={18} />
                    Ir a WhatsApp
                  </a>
                </div>
                <div className="rounded-neo border-2 border-ink bg-[linear-gradient(135deg,#833AB4_0%,#FD1D1D_52%,#FCAF45_100%)] p-6 text-white shadow-neo sm:p-7">
                  <div className="flex items-center gap-3">
                    <Instagram size={29} strokeWidth={2.5} />
                    <p className="font-display text-xl font-extrabold uppercase tracking-tight">Síguenos en Instagram</p>
                  </div>
                  <a
                    href={`https://www.instagram.com/${business.instagram}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="neo-btn-white mt-5 w-full justify-center py-3 text-sm uppercase"
                  >
                    <Instagram size={18} />
                    @{business.instagram}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
