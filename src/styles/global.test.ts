import css from './global.css?raw';
import learningCss from './learning.css?raw';

test('locks the page to an iPhone 16 canvas with internal scrolling', () => {
  expect(css).toContain('--phone-width: 393px');
  expect(css).toContain('--phone-height: 852px');
  expect(css).toMatch(/body\s*\{[^}]*overflow:\s*hidden/);
  expect(css).toMatch(/\.mobile-shell\s*\{[^}]*overflow-y:\s*auto/);
});

test('uses the provided bitmap assets as page backgrounds', () => {
  expect(css).toContain("url('../assets/bg-home-collage.png')");
  expect(css).toContain("url('../assets/bg-photo-flower.png')");
  expect(css).toContain("url('../assets/bg-analysis-lilies.png')");
  expect(css).toContain("url('../assets/bg-custom-paper.png')");
  expect(learningCss).toContain("url('../assets/bg-library-flower.png')");
});
