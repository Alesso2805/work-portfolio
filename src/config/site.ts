import type { Locale } from '@/i18n/config';

export const site = {
  /**
   * Public origin for canonical, hreflang, Open Graph and sitemap URLs.
   * NEXT_PUBLIC_SITE_URL wins (custom domain); on Netlify, `URL` is set automatically at build time.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? 'http://localhost:3000',
  name: 'Alessandro David',
  fullName: 'Alessandro Alonso David Polanco',
  email: 'alessandrodp2222@gmail.com',
  github: 'https://github.com/Alesso2805',
  linkedin: 'https://www.linkedin.com/in/alessandro-david-polanco-71657421b/',
  paper: {
    url: 'https://ieeexplore.ieee.org/document/11541607',
    title:
      'Web Application for the Automatic Code Generation of Fullstack Projects Using Generative Artificial Intelligence (GPT-5)',
  },
  /**
   * CVs offered by the "CV ↓" button, in menu order. Files live in public/cv/
   * (public copies, without the phone number). `lang` is the language of the PDF itself.
   */
  cvs: [
    {
      href: '/cv/CV_Alessandro_David_Polanco_International_Remote.pdf',
      lang: 'en',
      label: { en: 'International remote', es: 'Remoto internacional' },
    },
    {
      href: '/cv/CV_Alessandro_David_Polanco_Espana_Remoto.pdf',
      lang: 'es',
      label: { en: 'Spain remote', es: 'Remoto España' },
    },
    {
      href: '/cv/CV_Alessandro_David_Polanco_Peru_Remoto.pdf',
      lang: 'es',
      label: { en: 'Peru remote', es: 'Remoto Perú' },
    },
  ] satisfies ReadonlyArray<{ href: string; lang: Locale; label: Record<Locale, string> }>,
} as const;
