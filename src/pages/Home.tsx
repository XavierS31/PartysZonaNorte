import { motion } from 'framer-motion';
import {
  ArrowRight,
  Gift,
  MessageCircle,
  Palette,
  PartyPopper,
  Phone,
  Sparkles,
  Wind,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { business } from '../config/business';
import { Seo } from '../components/Seo';

const services = [
  {
    title: 'Decoración Temática',
    description: 'Transformamos tu espacio en mundos mágicos con colores y detalles únicos.',
    icon: Palette,
    color: 'bg-hot',
    cta: 'Ver Programa',
    link: '/categories',
  },
  {
    title: 'Globos y Arreglos',
    description: 'Desde arcos gigantes hasta bouquets personalizados que vuelan.',
    icon: Wind,
    color: 'bg-sky',
    cta: 'Ver Diseños',
    link: '/products?category=Globos',
  },
  {
    title: 'Anchetas',
    description: 'Elegancia y sabor en una sola cesta, ideal para regalar amor.',
    icon: Gift,
    color: 'bg-butter',
    cta: 'Personalizar',
    link: '/products',
  },
  {
    title: 'Piñatería',
    description: 'La mejor selección de personajes clásicos para las caritas más felices.',
    icon: PartyPopper,
    color: 'bg-hot',
    cta: 'Ver Stock',
    link: '/products',
  },
];

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85',
    alt: 'Mesa decorada para fiesta temática',
    className: 'row-span-2 min-h-[280px] sm:min-h-[420px]',
  },
  {
    src: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=900&q=85',
    alt: 'Ancheta decorada con globos',
    className: 'min-h-[130px] sm:min-h-[200px]',
  },
  {
    src: 'https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?auto=format&fit=crop&w=900&q=85',
    alt: 'Arco de globos coloridos',
    className: 'min-h-[130px] sm:min-h-[200px]',
  },
  {
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85',
    alt: 'Fiesta infantil con detalles temáticos',
    className: 'min-h-[130px] sm:min-h-[200px]',
  },
];

export default function Home() {
  return (
    <>
      <Seo />

      {/* Hero */}
      <section className="bg-hot">
        <div className="shell grid min-h-[620px] items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="neo-badge"
            >
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
              Especialistas en artículos de decoración para fiestas temáticas, anchetas, piñatería,
              venta y creación de arreglos a tu gusto.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/products" className="neo-btn-primary">
                Ver Catálogo <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="neo-btn-teal">
                <Phone size={18} />
                Contactanos
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="relative overflow-hidden rounded-neo border-2 border-black shadow-neo-lg">
              <img
                src="https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1000&q=85"
                alt="Anchetas y arreglos de regalo"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-white">
        <div className="shell">
          <div className="text-center">
            <h2 className="heading">Nuestros Servicios</h2>
            <div className="gold-underline" />
            <p className="copy mx-auto mt-4 text-center">
              Todo lo que necesitas para que tu evento sea único y lleno de color.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="neo-card flex flex-col p-6"
              >
                <div
                  className={`grid h-14 w-14 place-items-center rounded-full border-2 border-black ${service.color} shadow-neo`}
                >
                  <service.icon size={24} className="text-ink" />
                </div>
                <h3 className="mt-5 font-display text-sm font-extrabold uppercase tracking-wide">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">{service.description}</p>
                <Link to={service.link} className="neo-btn-white mt-6 w-fit text-xs uppercase">
                  {service.cta} <ArrowRight size={14} />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery / Creations */}
      <section className="section bg-hot">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="heading text-white">Nuestras Creaciones</h2>
              <p className="mt-3 max-w-lg text-white/90">
                Cada detalle es diseñado con amor. Inspírate con algunos de nuestros proyectos.
              </p>
            </div>
            <a
              href={`https://instagram.com/${business.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="neo-btn-white shrink-0 text-xs uppercase"
            >
              Ver todo el Instagram
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-[1.2fr_1fr] sm:grid-rows-3">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`overflow-hidden rounded-neo border-2 border-black shadow-neo-lg ${img.className}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-hot pb-16 pt-4 sm:pb-20">
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-pink-300/40" />
        <div className="pointer-events-none absolute -right-10 top-8 h-40 w-40 rounded-full bg-sky/30" />

        <div className="shell relative">
          <div className="neo-card mx-auto max-w-4xl p-8 sm:p-12">
            <h2 className="text-center font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
              ¿Tienes un evento en mente?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-7 text-muted sm:text-base">
              Cuéntanos tu idea y nosotros nos encargamos de que sea inolvidable. Asesoría
              personalizada por expertos.
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
              <span className="font-display text-xs font-bold uppercase tracking-widest text-muted">
                Atención inmediata
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
