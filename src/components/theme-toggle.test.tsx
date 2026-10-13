import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { THEME_STORAGE_KEY } from '@/lib/theme';
import { ThemeToggle } from './theme-toggle';

const labels = { toDark: 'Switch to dark mode', toLight: 'Switch to light mode' };

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', () => ({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('labels the action, toggles the theme and remembers the choice', async () => {
    document.documentElement.setAttribute('data-theme', 'light');
    render(<ThemeToggle labels={labels} />);

    const button = screen.getByRole('button', { name: labels.toDark });
    await act(async () => fireEvent.click(button));

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(button).toHaveAccessibleName(labels.toLight);

    await act(async () => fireEvent.click(button));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(button).toHaveAccessibleName(labels.toDark);
  });

  it('starts from the theme already applied by the head script', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    render(<ThemeToggle labels={labels} />);
    expect(screen.getByRole('button')).toHaveAccessibleName(labels.toLight);
  });

  it('hides its icons from assistive tech', () => {
    const { container } = render(<ThemeToggle labels={labels} />);
    for (const svg of container.querySelectorAll('svg')) {
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    }
  });
});
