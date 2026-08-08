import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MessageCircle, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { Product } from '../types'

export function ProductCard({ product }: { product: Product }) {
  const [focused, setFocused] = useState(false)
  const contactSearch = new URLSearchParams({ service: product.service, product: product.title }).toString()

  return (
    <>
      <motion.article
        whileHover={{ y: -7 }}
        className="group overflow-hidden rounded-neo border-2 border-ink bg-gradient-to-b from-white via-pink-50 to-white shadow-neo"
      >
        <button type="button" onClick={() => setFocused(true)} className="block w-full text-left">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="p-5">
            <span className="inline-flex rounded-full border border-ink bg-sky px-2.5 py-1 text-xs font-bold text-ink">
              {product.service}
            </span>
            <h2 className="mt-3 font-display text-lg font-bold">{product.title}</h2>
            <p className="mt-2 text-xs font-bold uppercase tracking-wide text-berry">
              Toca para ver detalles
            </p>
          </div>
        </button>
      </motion.article>
      <AnimatePresence>
        {focused && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={product.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFocused(false)}
            className="fixed inset-0 z-[100] grid place-items-center bg-ink/75 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(event) => event.stopPropagation()}
              className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-neo border-2 border-ink bg-white shadow-neo-lg md:grid-cols-2"
            >
              <button
                type="button"
                onClick={() => setFocused(false)}
                aria-label="Cerrar detalles"
                className="absolute right-3 top-3 z-10 rounded-full border-2 border-ink bg-white p-2 shadow-neo"
              >
                <X size={18} />
              </button>
              <img src={product.image} alt={product.title} className="h-72 w-full object-cover md:h-full" />
              <div className="p-7 sm:p-9">
                <span className="inline-flex rounded-full border border-ink bg-sky px-3 py-1 text-xs font-bold text-ink">
                  {product.service}
                </span>
                <h2 className="mt-4 font-display text-2xl font-extrabold uppercase">{product.title}</h2>
                <p className="mt-4 leading-7 text-muted">{product.description}</p>
                {product.badge && (
                  <span className="mt-6 inline-flex rounded-full border border-ink bg-butter/40 px-3 py-1 text-xs font-bold">
                    {product.badge}
                  </span>
                )}
                <Link
                  to={`/contact?${contactSearch}`}
                  className="neo-btn-primary mt-8 w-full"
                  onClick={() => setFocused(false)}
                >
                  <MessageCircle size={18} />
                  Quiero algo así
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
