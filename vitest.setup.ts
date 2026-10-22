import '@testing-library/jest-dom/vitest';

// jsdom has no Element.scrollTo, which the carousel calls to move between screens.
Element.prototype.scrollTo ??= () => {};
