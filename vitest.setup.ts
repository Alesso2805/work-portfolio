import '@testing-library/jest-dom/vitest';

// jsdom has no pointer capture, which the carousel takes while a screen is being dragged.
Element.prototype.setPointerCapture ??= () => {};
