import { afterEach, describe, expect, it } from 'vitest';
import { headCleanupScript } from './head-cleanup';

describe('headCleanupScript', () => {
  afterEach(() => {
    document.head.innerHTML = '';
  });

  it('removes injected comments and whitespace nodes from <head>, keeping elements', () => {
    document.head.innerHTML =
      '<meta charset="utf-8">\n<!-- This site is hosted on Netlify. -->\n<meta name="viewport" content="width=device-width">';

    new Function(headCleanupScript)();

    expect([...document.head.childNodes].map((node) => node.nodeName)).toEqual(['META', 'META']);
  });

  it('leaves a clean <head> untouched', () => {
    document.head.innerHTML = '<meta charset="utf-8"><title>Portfolio</title>';
    new Function(headCleanupScript)();
    expect(document.head.innerHTML).toBe('<meta charset="utf-8"><title>Portfolio</title>');
  });
});
