import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { site } from '@/config/site';
import { CvMenu } from './cv-menu';

describe('CvMenu', () => {
  it('offers every CV as a download, labelled in the page language', () => {
    render(<CvMenu locale="es" />);
    const links = within(screen.getByRole('list')).getAllByRole('link');
    expect(links.map((a) => a.textContent)).toEqual([
      'Remoto internacionalEN',
      'Remoto EspañaES',
      'Remoto PerúES',
    ]);
    for (const [i, link] of links.entries()) {
      expect(link).toHaveAttribute('href', site.cvs[i]?.href);
      expect(link).toHaveAttribute('download');
    }
  });

  it('points only at files that exist in public/', () => {
    for (const cv of site.cvs) {
      expect(existsSync(join(process.cwd(), 'public', cv.href)), cv.href).toBe(true);
    }
  });
});
