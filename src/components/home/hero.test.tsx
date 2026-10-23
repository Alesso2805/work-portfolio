import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getDictionary } from '@/i18n';
import { Hero } from './hero';

const dict = getDictionary('en');

describe('Hero', () => {
  it('reads the name whole, though its letters are split for the entrance', () => {
    render(<Hero locale="en" dict={dict} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Alessandro David' })).toBeInTheDocument();
  });

  it('keeps every figure as text, though the visible digits are drawn by a CSS counter', () => {
    render(<Hero locale="en" dict={dict} />);
    const stats = screen.getByRole('list', { name: dict.stats.at });
    expect(stats).toHaveTextContent('97% test coverage with Pytest');
    expect(stats).toHaveTextContent('20+ REST endpoints');
    expect(stats).toHaveTextContent('40% faster queries');
  });
});
