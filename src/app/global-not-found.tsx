import type { Metadata } from 'next';
import { ButtonLink } from '@/components/button-link';
import { Container } from '@/components/container';
import { RootDocument } from '@/components/root-document';
import { SiteFooter } from '@/components/site-footer';
import { SkipLink } from '@/components/skip-link';
import { site } from '@/config/site';
import { en } from '@/i18n/en';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: '404 — Alessandro David',
  robots: { index: false },
};

/** Any unmatched URL. Bilingual because the locale is unknown here. */
export default function GlobalNotFound() {
  return (
    <RootDocument lang="en">
      <SkipLink label={en.skipLink} />
      <Container>
        <header className="border-rule border-b-2 py-[22px]">
          <a href="/" className="font-extrabold text-[18px] tracking-[-0.01em] no-underline">
            Alessandro David
          </a>
        </header>
        <main id="main" className="pt-[clamp(48px,7vw,96px)] pb-[clamp(48px,6vw,80px)]">
          <h1 className="text-display">404</h1>
          <p className="mt-10 font-medium text-[22px] leading-[1.35]">
            Page not found.
            <br />
            <span lang="es">Página no encontrada.</span>
          </p>
          <div className="mt-10 flex flex-wrap gap-2.5">
            <ButtonLink variant="primary" href="/en" hrefLang="en">
              English
            </ButtonLink>
            <ButtonLink variant="secondary" href="/es" hrefLang="es" lang="es">
              Español
            </ButtonLink>
          </div>
        </main>
        <SiteFooter dict={en} />
      </Container>
    </RootDocument>
  );
}
