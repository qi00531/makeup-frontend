import { learningService } from './learningService';

test('filters library assets by search and category', async () => {
  const assets = await learningService.listAssets({ query: '眼妆', category: 'part' });

  expect(assets.every((asset) => asset.category === 'part')).toBe(true);
  expect(assets.some((asset) => asset.title.includes('眼妆'))).toBe(true);
});

test('reports a style conflict for strong eyes and sheer cheeks', async () => {
  const result = await learningService.checkCompatibility({ eyes: 'eyes-smoky', blush: 'blush-sheer' });

  expect(result).toContainEqual(expect.objectContaining({ type: 'style-conflict' }));
});
