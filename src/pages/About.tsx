import { HeartHandshake, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import aboutPhoto from '../../assets/photo3.jpeg'

export default function About() {
  return (
    <>
      <Seo title="Nosotros" />
      <section className="section bg-gradient-to-br from-cyan-100 via-white to-pink-100">
        <div className="shell">
          <div className="grid items-center gap-10 rounded-neo border-2 border-ink bg-white/80 p-6 shadow-neo lg:grid-cols-2 lg:p-10">
            <img
              src={aboutPhoto}
              alt="Diana Barón creando una decoración con globos"
              className="h-[420px] w-full rounded-neo border-2 border-ink object-cover shadow-neo"
            />
            <div>
              <p className="neo-badge">
                <Sparkles size={14} />
                Nuestra historia
              </p>
              <h1 className="mt-5 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
                Celebrar es nuestro lenguaje favorito.
              </h1>
              <p className="mt-5 leading-7 text-muted">
                PartyZonaNorte nació de la visión de Diana Barón, una creadora apasionada por el diseño, la
                moda, las fiestas y las decoraciones que hacen especial cada momento.
              </p>
              <p className="mt-4 leading-7 text-muted">
                Para Diana, cada celebración es una oportunidad de combinar color, estilo y detalles hechos
                con cariño. Su pasión es transformar ideas en ambientes que sorprenden y quedan en la memoria.
              </p>
              <div className="mt-7 rounded-neo border-2 border-ink bg-sky p-6 shadow-neo">
                <HeartHandshake className="text-ink" />
                <p className="mt-3 font-display font-bold">La promesa de Diana</p>
                <p className="mt-1 text-sm leading-6 text-ink/80">
                  Ideas alegres, atención cercana y creaciones hechas con cariño para tu celebración.
                </p>
              </div>
              <Link to="/contact" className="neo-btn-primary mt-7">
                Hablemos de tu evento
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
