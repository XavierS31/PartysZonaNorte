import { Helmet } from 'react-helmet-async';
import { business } from '../config/business';

export function Seo({ title, description }: { title?: string; description?: string }) {
  const full = title ? `${title} | ${business.name}` : `${business.name} | ${business.tagline}`;
  const desc =
    description ||
    'Decoración temática, globos, anchetas y piñatería para fiestas inolvidables en Cartagena, Colombia.';

  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: business.name,
          email: business.email,
          telephone: business.phone,
          address: business.address,
          openingHours: business.hours,
        })}
      </script>
    </Helmet>
  );
}
