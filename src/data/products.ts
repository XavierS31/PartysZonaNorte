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
  service,
  image,
  badge,
  description: descriptions[service],
})

export const products: Product[] = [
  item('bouquet1', 'Bouquet Cumpleaños 50 años', 'Bouquet de Globos', bouquet1, 'Personalizable'),
  item('bouquet2', 'Bouquet de Bodas', 'Bouquet de Globos', bouquet2),
  item('decoracion1', 'Decoracion Minnie Mouse', 'Decoraciones con Globos', decoracion1, 'Más solicitado'),
  item('decoracion2', 'Decoración personalizada', 'Decoraciones con Globos', decoracion2),
  item('ancheta1', 'Ancheta Dia de Madres 1', 'Anchetas', ancheta1),
  item('ancheta2', 'Ancheta Dia de Madres 2', 'Anchetas', ancheta2),
  item('anchetas2', 'Ancheta de Graduacion', 'Anchetas', anchetas2),
  item('desayuno1', 'Desayuno sorpresa de amor', 'Desayunos Sorpresas', desayuno1),
  item('desayuno2', 'Desayuno sorpresa de bandeja', 'Desayunos Sorpresas', desayuno2),
  item('desayuno3', 'Desayuno sorpresa de Cumpleaños', 'Desayunos Sorpresas', desayuno3),
  item('flores1', 'Arreglo floral 1', 'Arreglos Florales', flores1),
  item('flores2', 'Arreglo floral de bienvenida', 'Arreglos Florales', flores2),
  item('pinateria', 'Piñatería personalizada', 'Piñatería', pinateria),
  item('cursos1', 'Curso de decoración', 'Cursos', cursos1, 'Aprende con nosotros'),
]
