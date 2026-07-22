import css from './global.css?raw';

test('locks the page to an iPhone 16 canvas with internal scrolling', () => {
  expect(css).toContain('--phone-width: 393px');
  expect(css).toContain('--phone-height: 852px');
  expect(css).toMatch(/body\s*\{[^}]*overflow:\s*hidden/);
  expect(css).toMatch(/\.mobile-shell\s*\{[^}]*overflow-y:\s*auto/);
});
