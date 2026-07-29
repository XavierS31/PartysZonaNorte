import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article whileHover={{ y: -7 }} className="group overflow-hidden rounded-neo border-2 border-ink bg-gradient-to-b from-white via-pink-50 to-white shadow-neo">
      <img src={product.image} alt={product.title} loading="lazy" className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="p-5">
        <span className="inline-flex rounded-full border border-ink bg-sky px-2.5 py-1 text-xs font-bold text-ink">{product.service}</span>
        <h2 className="mt-3 font-display text-lg font-bold">{product.title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted">{product.description}</p>
        <Link to="/contact" className="neo-btn-primary mt-5 w-full text-xs uppercase"><MessageCircle size={16} />Solicitar información<ArrowRight size={15} /></Link>
      </div>
    </motion.article>
  )
}
