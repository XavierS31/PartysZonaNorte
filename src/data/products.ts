import type { Product } from '../types'
import ancheta1 from '../../assets/services/ancheta1.webp'
import ancheta2 from '../../assets/services/ancheta2.webp'
import anchetas2 from '../../assets/services/anchetas2.jpg'
import bouquet1 from '../../assets/services/bouquet1.webp'
import bouquet2 from '../../assets/services/bouquet2.jpeg'
import cursos1 from '../../assets/services/cursos1.jpeg'
import decoracion1 from '../../assets/services/decoracion1.webp'
import decoracion2 from '../../assets/services/decoracion2.webp'
import desayuno1 from '../../assets/services/desayuno1.webp'
import desayuno2 from '../../assets/services/desayuno2.webp'
import desayuno3 from '../../assets/services/desayuno3.webp'
import flores1 from '../../assets/services/flores1.webp'
import flores2 from '../../assets/services/flores2.webp'
import pinateria from '../../assets/services/pinateria.jpeg'

export const services = [
  'Bouquet de Globos',
  'Decoraciones con Globos',
  'Anchetas',
  'Desayunos Sorpresas',
  'Arreglos Florales',
  'Piñatería',
  'Cursos',
] as const

const descriptions: Record<string, string> = {
  'Bouquet de Globos': 'Bouquet de globos personalizado para regalar una sonrisa.',
  'Decoraciones con Globos': 'Montaje con globos y detalles especiales para una celebración inolvidable.',
  Anchetas: 'Regalo preparado con detalles elegidos para sorprender.',
  'Desayunos Sorpresas': 'Una sorpresa pensada para empezar el día celebrando.',
  'Arreglos Florales': 'Composición floral hecha para dar un toque único a tu evento.',
  Piñatería: 'Detalles de piñatería para hacer tu fiesta aún más divertida.',
  Cursos: 'Aprende técnicas de decoración y crea montajes con tu propio estilo.',
}

const item = (id: string, title: string, service: string, image: string, badge?: string): Product => ({
  id,
  title,
  price: 0,
  service,
  image,
  badge,
  description: descriptions[service],
  colors: ['Personalizado'],
  inStock: true,
})

export const products: Product[] = [
  item('bouquet1', 'Bouquet de globos 1', 'Bouquet de Globos', bouquet1, 'Personalizable'),
  item('bouquet2', 'Bouquet de globos 2', 'Bouquet de Globos', bouquet2),
  item('decoracion1', 'Decoración con globos 1', 'Decoraciones con Globos', decoracion1, 'Más solicitado'),
  item('decoracion2', 'Decoración con globos 2', 'Decoraciones con Globos', decoracion2),
  item('ancheta1', 'Ancheta personalizada 1', 'Anchetas', ancheta1),
  item('ancheta2', 'Ancheta personalizada 2', 'Anchetas', ancheta2),
  item('anchetas2', 'Ancheta personalizada 3', 'Anchetas', anchetas2),
  item('desayuno1', 'Desayuno sorpresa 1', 'Desayunos Sorpresas', desayuno1),
  item('desayuno2', 'Desayuno sorpresa 2', 'Desayunos Sorpresas', desayuno2),
  item('desayuno3', 'Desayuno sorpresa 3', 'Desayunos Sorpresas', desayuno3),
  item('flores1', 'Arreglo floral 1', 'Arreglos Florales', flores1),
  item('flores2', 'Arreglo floral 2', 'Arreglos Florales', flores2),
  item('pinateria', 'Piñatería personalizada', 'Piñatería', pinateria),
  item('cursos1', 'Curso de decoración con globos', 'Cursos', cursos1, 'Aprende con nosotros'),
]
