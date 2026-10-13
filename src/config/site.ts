import type { Locale } from '@/i18n/config';

export const site = {
  /** Public origin used for canonical, hreflang and sitemap URLs. Set NEXT_PUBLIC_SITE_URL in Netlify. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
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
   * CV downloaded from each locale. Files live in public/cv/.
   * Spanish alternative: /cv/CV_Alessandro_David_Polanco_Peru_Remoto.pdf
   */
  cv: {
    en: '/cv/CV_Alessandro_David_Polanco_International_Remote.pdf',
    es: '/cv/CV_Alessandro_David_Polanco_Espana_Remoto.pdf',
  } satisfies Record<Locale, string>,
} as const;
