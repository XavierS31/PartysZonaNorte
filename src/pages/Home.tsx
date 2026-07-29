import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import {
  ArrowRight,
  Coffee,
  Flower2,
  Gift,
  GraduationCap,
  MessageCircle,
  Palette,
  PartyPopper,
  Phone,
  Sparkles,
  Wind,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { business } from '../config/business'
import { Seo } from '../components/Seo'
import { products } from '../data/products'
import birthdayPhoto from '../../assets/services/bouquet2.jpeg'

const services = [
  {
    title: 'Bouquet de Globos',
    description: 'Bouquets personalizados para regalar una sonrisa.',
    icon: Wind,
    color: 'bg-sky',
    link: '/products?service=Bouquet%20de%20Globos',
  },
  {
    title: 'Decoraciones con Globos',
    description: 'Montajes llenos de color para cada celebración.',
    icon: PartyPopper,
    color: 'bg-hot text-white',
    link: '/products?service=Decoraciones%20con%20Globos',
  },
  {
    title: 'Anchetas',
    description: 'Detalles especiales preparados con mucho cariño.',
    icon: Gift,
    color: 'bg-butter',
    link: '/products?service=Anchetas',
  },
  {
    title: 'Desayunos Sorpresas',
    description: 'Una forma deliciosa de empezar a celebrar.',
    icon: Coffee,
    color: 'bg-pink-200',
    link: '/products?service=Desayunos%20Sorpresas',
  },
  {
    title: 'Arreglos Florales',
    description: 'Flores y detalles para momentos memorables.',
    icon: Flower2,
    color: 'bg-cyan-100',
    link: '/products?service=Arreglos%20Florales',
  },
  {
    title: 'Piñatería',
    description: 'Todo lo necesario para una fiesta muy divertida.',
    icon: Palette,
    color: 'bg-butter',
    link: '/products?service=Piñater%C3%ADa',
  },
  {
    title: 'Cursos',
    description: 'Aprende a crear decoraciones que enamoran.',
    icon: GraduationCap,
    color: 'bg-sky',
    link: '/products?service=Cursos',
  },
]

const featuredCreations = [
  { primaryId: 'decoracion1', alternateId: 'decoracion2' },
  { primaryId: 'flores2', alternateId: 'flores1' },
  { primaryId: 'ancheta2', alternateId: 'ancheta1' },
  { primaryId: 'bouquet1', alternateId: 'bouquet2' },
]

export default function Home() {
  const [toggledCreation, setToggledCreation] = useState<string | null>(null)

  return (
    <>
      <Seo />
      <section className="bg-hot">
        <div className="shell grid min-h-[540px] items-center gap-8 py-12 lg:grid-cols-2 lg:py-14">
          <div className="relative z-10">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="neo-badge">
              <Sparkles size={14} />
              ¡Hacemos tus sueños realidad!
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="hero-title mt-6 max-w-xl text-4xl font-extrabold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Creando momentos inolvidables
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-lg text-lg leading-8 text-white/95"
            >
              Especialistas en detalles para tus celebraciones: decoraciones, regalos, arreglos y mucho más.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/products" className="neo-btn-white">
                Ver catálogo <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="neo-btn-teal">
                <Phone size={18} />
                Contáctanos
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="relative overflow-hidden rounded-neo border-2 border-black shadow-neo-lg">
              <img
                src={birthdayPhoto}
                alt="Decoración de cumpleaños feliz"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
      <section className="section bg-gradient-to-br from-white via-pink-100 to-cyan-100">
        <div className="shell">
          <div className="text-center">
            <h2 className="heading">Nuestros Servicios</h2>
            <div className="gold-underline" />
            <p className="copy mx-auto mt-4 text-center">
              Todo lo que necesitas para convertir una ocasión especial en un recuerdo inolvidable.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(24,minmax(0,1fr))]">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`neo-card flex flex-col p-6 lg:col-span-6 ${index === 4 ? 'lg:col-start-4' : ''}`}
              >
                <div
                  className={`grid h-14 w-14 place-items-center rounded-full border-2 border-black shadow-neo ${service.color}`}
                >
                  <service.icon size={24} />
                </div>
                <h3 className="mt-5 font-display text-sm font-extrabold uppercase tracking-wide">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">{service.description}</p>
                <Link to={service.link} className="neo-btn-white mt-6 w-fit text-xs uppercase">
                  Ver catálogo <ArrowRight size={14} />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-cyan">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="heading text-white">Nuestras Creaciones</h2>
              <p className="mt-3 max-w-lg text-white/90">
                Cada detalle está diseñado con amor. Inspírate con algunos de nuestros proyectos.
              </p>
            </div>
            <Link to="/products" className="neo-btn-white shrink-0 text-xs uppercase">
              Ver catálogo
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCreations.map(({ primaryId, alternateId }, index) => {
              const primary = products.find((product) => product.id === primaryId)
              const alternate = products.find((product) => product.id === alternateId)
              if (!primary || !alternate) return null
              const isToggled = toggledCreation === primaryId
              const activeProduct = isToggled ? alternate : primary

              return (
                <motion.button
                  key={primaryId}
                  type="button"
                  aria-pressed={isToggled}
                  aria-label={`Cambiar imagen de ${primary.service}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, rotate: index % 2 ? -1.5 : 1.5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, type: 'spring', stiffness: 240, damping: 18 }}
                  onClick={() => setToggledCreation(isToggled ? null : primaryId)}
                  className="group relative overflow-hidden rounded-neo border-2 border-black text-left shadow-neo-lg"
                  style={{ perspective: 1000 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={activeProduct.id}
                      src={activeProduct.image}
                      alt={activeProduct.title}
                      initial={{ opacity: 0, scale: 1.1, rotateY: -16 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.94, rotateY: 16 }}
                      transition={{ duration: 0.35 }}
                      className="h-72 w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent p-5 text-white">
                    <p className="font-display text-sm font-extrabold uppercase">{activeProduct.service}</p>
                    <p className="mt-1 text-xs text-white/85">Toca para cambiar la creación</p>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-gradient-to-r from-white via-pink-200 to-sky py-16 sm:py-20">
        <div className="shell relative">
          <div className="neo-card mx-auto max-w-4xl bg-white/90 p-8 sm:p-12">
            <h2 className="text-center font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
              ¿Tienes un evento en mente?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-7 text-muted sm:text-base">
              Cuéntanos tu idea y nosotros nos encargamos de que sea inolvidable. Asesoría personalizada por
              expertos.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="neo-btn-primary px-8 py-4 text-base uppercase"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
              <Link to="/contact" className="neo-btn-teal px-8 py-4 text-base uppercase">
                Enviar correo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
