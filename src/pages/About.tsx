import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, HeartHandshake, Instagram, MapPin, Palette, PartyPopper, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { business } from '../config/business'
import { Seo } from '../components/Seo'
import { FloatingBalloon } from '../components/FloatingBalloon'
import founderPhoto from '../../assets/photo2.jpeg'
import creationPhoto from '../../assets/photo3.jpeg'

const highlights = [
  {
    icon: GraduationCap,
    title: 'Educación + moda',
    description: 'Una mirada sensible que une aprendizaje, diseño y mucha imaginación.',
    color: 'bg-butter',
  },
  {
    icon: Palette,
    title: 'Arte en cada detalle',
    description: 'Crear, decorar y representar ideas es el corazón de cada montaje.',
    color: 'bg-sky',
  },
  {
    icon: PartyPopper,
    title: 'Celebraciones con alma',
    description: 'Diseños hechos para emocionar y hacer que cada fecha se recuerde.',
    color: 'bg-pink-200',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  return (
    <>
      <Seo title="Nosotros" />

      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-100 via-white to-pink-100 py-14 sm:py-20">
        <div className="absolute -left-16 top-14 h-40 w-40 rounded-full border-2 border-ink bg-butter opacity-80" />
        <div className="absolute right-5 top-28 hidden h-16 w-16 rotate-12 rounded-neo border-2 border-ink bg-hot sm:block" />
        <FloatingBalloon className="-right-4 bottom-8 hidden lg:block" colorClass="bg-sky" tailClass="border-t-sky" delay={0.35} size="lg" />
        <div className="shell relative">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12 }}
            className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]"
          >
            <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-xl lg:mx-0">
              <div className="absolute -left-3 -top-3 h-full w-full rounded-neo border-2 border-ink bg-butter sm:-left-5 sm:-top-5" />
              <motion.img
                whileHover={{ rotate: -1, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                src={founderPhoto}
                alt="Fundadora de Party Zona Norte"
                className="relative aspect-[3/4] w-full rounded-neo border-2 border-ink object-cover shadow-neo"
              />
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-5 -right-2 rounded-neo border-2 border-ink bg-white px-4 py-3 shadow-neo sm:right-5"
              >
                <p className="font-display text-lg font-extrabold text-berry">Desde 2018</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">creando sonrisas</p>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="neo-badge bg-white">
                <Sparkles size={14} />
                Nuestra historia
              </p>
              <h1 className="mt-5 max-w-2xl text-4xl font-extrabold uppercase leading-[1.06] tracking-tight text-ink sm:text-5xl">
                Una idea con color se convirtió en una ciudad de celebraciones.
              </h1>
              <p className="mt-6 max-w-xl leading-7 text-muted">
                Party Zona Norte nace en 2018 de la visión de una licenciada en Educación y diseñadora de modas,
                apasionada por el arte, el diseño, las decoraciones y la alegría de crear.
              </p>
              <p className="mt-4 max-w-xl leading-7 text-muted">
                Lo que empezó llevando magia al sector de Zona Norte de Cartagena de Indias creció con dedicación,
                creatividad y el deseo de transformar cada idea en un momento para recordar. Hoy celebramos junto a
                toda la ciudad.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-sky px-4 py-2 text-sm font-bold shadow-neo">
                  <MapPin size={17} /> Cartagena de Indias
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-bold shadow-neo">
                  <HeartHandshake size={17} /> Hecho con cariño
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section relative overflow-hidden bg-ink text-white">
        <div className="absolute left-0 top-0 h-24 w-full bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,.25)_1px,_transparent_0)] bg-[size:18px_18px]" />
        <FloatingBalloon className="left-5 bottom-6 hidden lg:block" colorClass="bg-butter" tailClass="border-t-butter" delay={0.15} />
        <div className="shell relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid gap-5 md:grid-cols-3"
          >
            {highlights.map(({ icon: Icon, title, description, color }) => (
              <motion.article
                key={title}
                variants={fadeUp}
                whileHover={{ y: -8, rotate: -0.5 }}
                className="rounded-neo border-2 border-white bg-white p-5 text-ink shadow-[5px_5px_0_0_#e9007a]"
              >
                <div className={`grid h-11 w-11 place-items-center rounded-full border-2 border-ink ${color}`}>
                  <Icon size={21} />
                </div>
                <h2 className="mt-5 font-display text-xl font-extrabold uppercase">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section relative overflow-hidden bg-mist">
        <FloatingBalloon className="right-6 top-12 hidden lg:block" colorClass="bg-hot" tailClass="border-t-hot" delay={0.55} />
        <div className="shell">
          <div className="grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr]">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="order-2 lg:order-1"
            >
              <p className="neo-badge bg-butter">
                <PartyPopper size={14} />
                El viaje continúa
              </p>
              <h2 className="mt-5 text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
                De una pasión personal a la fiesta de toda Cartagena.
              </h2>
              <p className="mt-5 max-w-xl leading-7 text-muted">
                Cada globo, color y detalle cuenta una parte de nuestra historia. Creamos ambientes que representan
                a quienes celebran: auténticos, alegres y llenos de personalidad.
              </p>
              <div className="mt-6 rounded-neo border-2 border-ink bg-hot p-5 text-white shadow-neo">
                <p className="font-display text-lg font-extrabold">“Crear es mi forma favorita de celebrar.”</p>
                <p className="mt-1 text-sm text-white/90">Party Zona Norte</p>
              </div>
              <div className="mt-5 rounded-neo border-2 border-ink bg-white p-5 shadow-neo">
                <p className="font-display font-extrabold">Para estar al tanto de nuestros productos, síguenos en Instagram.</p>
                <a
                  href={`https://www.instagram.com/${business.instagram}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="neo-btn-teal mt-4"
                >
                  <Instagram size={18} /> @{business.instagram}
                </a>
              </div>
              <Link to="/contact" className="neo-btn-primary mt-7">
                Creemos algo inolvidable <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="relative order-1 mx-auto w-full max-w-xl lg:order-2"
            >
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-neo border-2 border-ink bg-sky" />
              <motion.img
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                src={creationPhoto}
                alt="Una creación de Party Zona Norte"
                className="relative h-[460px] w-full rounded-neo border-2 border-ink object-cover shadow-neo sm:h-[540px] lg:h-[610px]"
              />
              <div className="absolute left-4 top-4 rotate-[-4deg] rounded-full border-2 border-ink bg-butter px-4 py-2 font-display text-sm font-extrabold shadow-neo">
                Diseñado para celebrar
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
