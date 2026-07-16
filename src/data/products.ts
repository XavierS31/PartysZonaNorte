import type { Product } from '../types'

export const products: Product[] = [
  { id:'blush-balloon', title:'Kit de arco de globos rosados', price:48, category:'Globos', occasion:'Cumpleaños', badge:'Más vendido', image:'https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?auto=format&fit=crop&w=900&q=85', description:'Una combinación soñada de globos rosa, durazno y coral para una celebración perfecta en fotos.', colors:['Rosa','Durazno','Coral'], inStock:true },
  { id:'gold-party', title:'Caja de cumpleaños dorada', price:36, category:'Kits de fiesta', occasion:'Cumpleaños', badge:'Nuevo', image:'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=900&q=85', description:'Todo lo que necesitas para un cumpleaños dorado, coordinado con mucho estilo en una sola caja.', colors:['Dorado','Crema'], inStock:true },
  { id:'baby-shower', title:'Set baby shower Pequeña Estrella', price:58, category:'Baby shower', occasion:'Baby shower', image:'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=85', description:'Detalles celestiales y suaves para hacer aún más mágica la bienvenida de tu bebé.', colors:['Azul','Amarillo'], inStock:true },
  { id:'pastel-table', title:'Vajilla de fiesta pastel', price:24, category:'Mesa', occasion:'Cumpleaños', image:'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85', description:'Platos, vasos, servilletas y pequeños detalles premium en una alegre paleta pastel.', colors:['Rosa','Azul','Amarillo'], inStock:true },
  { id:'disco', title:'Fondo de ensueño disco', price:72, category:'Fondos', occasion:'Graduación', badge:'Edición limitada', image:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85', description:'Un fondo brillante que se roba todas las miradas en pistas de baile y fotos memorables.', colors:['Plateado','Rosa'], inStock:false },
  { id:'garden', title:'Kit de fiesta picnic jardín', price:44, category:'Kits de fiesta', occasion:'Baby shower', image:'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85', description:'Piezas florales llenas de encanto para una tarde al aire libre.', colors:['Salvia','Rosa'], inStock:true },
  { id:'graduation', title:'Set de celebración de graduación', price:39, category:'Decoración', occasion:'Graduación', image:'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=85', description:'Un conjunto elegante para brindar por cada gran logro.', colors:['Negro','Dorado'], inStock:true },
  { id:'rainbow', title:'Globos de confeti arcoíris', price:18, category:'Globos', occasion:'Cumpleaños', image:'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=900&q=85', description:'Globos transparentes llenos de confeti alegre para celebrar a todo color.', colors:['Arcoíris'], inStock:true },
]

export const categories = [
  {name:'Globos', image:products[0].image, note:'Arcos, bouquets y mucho más'},
  {name:'Kits de fiesta', image:products[1].image, note:'Listos para celebrar'},
  {name:'Baby shower', image:products[2].image, note:'Dulces bienvenidas'},
  {name:'Mesa', image:products[3].image, note:'Una mesa llena de alegría'},
]
