import { describe, expect, it } from 'vitest';
import { en } from './en';
import { es } from './es';

/** Every key path, with array indexes, e.g. `experience.items.0.role`. */
function keyPaths(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object') return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    keyPaths(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe('dictionaries', () => {
  it('EN and ES have exactly the same keys', () => {
    expect(keyPaths(es).sort()).toEqual(keyPaths(en).sort());
  });

  it('has no empty strings', () => {
    for (const dict of [en, es]) {
      const empty = keyPaths(dict).filter((path) => {
        const value = path.split('.').reduce<unknown>((node, key) => {
          return (node as Record<string, unknown>)[key];
        }, dict);
        return value === '';
      });
      expect(empty).toEqual([]);
    }
  });
});
