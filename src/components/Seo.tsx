import { Helmet } from 'react-helmet-async'
import { business } from '../config/business'

const siteUrl = 'https://partyszonanorte.com'
const defaultTitle = 'PartysZonarteNorte | Decoraciones, arreglos y mas para tus fiestas'

export function Seo({ title }: { title?: string }) {
  const fullTitle = title ? `${title} | Partys Zona Norte` : defaultTitle

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Partys Zona Norte',
          url: siteUrl,
          image: `${siteUrl}/og-image.png`,
          email: business.contactEmail,
          telephone: business.phone,
          address: business.address,
          openingHours: business.hours,
          sameAs: [
            `https://instagram.com/${business.instagram}`,
            `https://facebook.com/${business.facebook}`,
            `https://tiktok.com/@${business.tiktok}`,
          ],
        })}
      </script>
    </Helmet>
  )
}
