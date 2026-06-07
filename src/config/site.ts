export const site = {
  name: 'Sandrine',
  fullName: 'Sandrine Morel — Sandrine Coiffure',
  url: 'https://sandrine-coiffure-beziers.fr',
  title: 'Coiffeuse Béziers — Colorations Végétales | Sandrine Coiffure',
  description: 'Sandrine Morel, coiffeuse à Béziers. Spécialiste colorations végétales et coupes femmes. Salon chaleureux sur rendez-vous, du mardi au samedi.',

  address: {
    locality: 'Béziers',
    region: 'Hérault',
    postalCode: '34500',
    country: 'FR'
  },

  areaServed: [
    { type: 'City', name: 'Béziers' },
    { type: 'AdministrativeArea', name: 'Hérault' },
  ],

  priceRange: '€€',

  openingHours: [
    { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '12:00' },
    { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '13:30', closes: '18:30' }
  ],

  sections: ['hero', 'prestations', 'gallery', 'testimonials', 'about', 'contact'],

  design: {
    accent: '#D4A0A5',
    accentDark: '#B07F84',
    accentBg: '#FAF0F1',
    secondary: '#C5A55A',
    secondaryBg: '#FAF3E6',
    bg: '#FAF5F0',
    text: '#2A1F1E',
    textMuted: '#8A7068',
    font: 'Nunito Sans',
    style: 'féminin doux élégant',
    notes: 'Cocon, naturel, bienveillant. Belles photos de cheveux, matières douces. Pas de fond blanc froid — ivoire chaud uniquement. Inspiration : instituts de beauté haut de gamme sans paraître hors de prix. Colorations végétales = différenciateur clé à mettre en avant. Galerie photos centrale (source Instagram). Section avis clients indispensable pour la prise de RDV.',
  }
}
