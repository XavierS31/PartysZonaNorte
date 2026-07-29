import type { Product } from '../types'
import photo1 from '../../assets/photo1.jpeg'
import photo2 from '../../assets/photo2.jpeg'
import photo3 from '../../assets/photo3.jpeg'
import photo4 from '../../assets/photo4.jpeg'
import photo5 from '../../assets/photo5.jpeg'
import photo6 from '../../assets/photo6.jpeg'
import photo7 from '../../assets/photo7.jpeg'

export const services = [
  'Bouquet de Globos',
  'Decoraciones con Globos',
  'Anchetas',
  'Desayunos Sorpresas',
  'Arreglos Florales',
  'Piñatería',
  'Cursos',
] as const

export const products: Product[] = [
  {
    id: 'bouquet-bride-to-be',
    title: 'Bouquet de globos Bride to Be',
    price: 0,
    service: 'Bouquet de Globos',
    badge: 'Personalizable',
    image: photo7,
    description: 'Bouquet de globos personalizado para celebrar momentos especiales.',
    colors: ['Rosa', 'Blanco', 'Rose gold'],
    inStock: true,
  },
  {
    id: 'decoracion-cumpleanos',
    title: 'Decoración orgánica para cumpleaños',
    price: 0,
    service: 'Decoraciones con Globos',
    badge: 'Más solicitado',
    image: photo6,
    description: 'Montaje con globos y detalles especiales para una celebración inolvidable.',
    colors: ['Negro', 'Dorado'],
    inStock: true,
  },
  {
    id: 'ancheta-personalizada',
    title: 'Ancheta personalizada',
    price: 0,
    service: 'Anchetas',
    image: photo5,
    description: 'Regalos preparados con detalles elegidos para sorprender.',
    colors: ['Personalizado'],
    inStock: true,
  },
  {
    id: 'desayuno-sorpresa',
    title: 'Desayuno sorpresa',
    price: 0,
    service: 'Desayunos Sorpresas',
    image: photo2,
    description: 'Una sorpresa pensada para empezar el día celebrando.',
    colors: ['Personalizado'],
    inStock: true,
  },
  {
    id: 'arreglo-floral-globos',
    title: 'Arreglo floral con globos',
    price: 0,
    service: 'Arreglos Florales',
    image: photo3,
    description: 'Composición de globos y flores para dar un toque único a tu evento.',
    colors: ['Verde salvia', 'Dorado', 'Blanco'],
    inStock: true,
  },
  {
    id: 'pinateria-personalizada',
    title: 'Piñatería personalizada',
    price: 0,
    service: 'Piñatería',
    image: photo4,
    description: 'Detalles de piñatería para hacer tu fiesta aún más divertida.',
    colors: ['Personalizado'],
    inStock: true,
  },
  {
    id: 'curso-decoracion',
    title: 'Curso de decoración con globos',
    price: 0,
    service: 'Cursos',
    badge: 'Aprende con nosotros',
    image: photo1,
    description: 'Aprende técnicas de decoración y crea montajes con tu propio estilo.',
    colors: ['Todos los estilos'],
    inStock: true,
  },
]
