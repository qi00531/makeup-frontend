import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BeforeAfterSlider } from './BeforeAfterSlider';

test('supports complete before and after views', async () => {
  const user = userEvent.setup();
  render(<BeforeAfterSlider beforeSrc="before.svg" afterSrc="after.svg" />);

  await user.click(screen.getByRole('button', { name: '看妆后' }));
  expect(screen.getByRole('slider', { name: '妆前妆后对比位置' })).toHaveValue('100');
  await user.click(screen.getByRole('button', { name: '看原图' }));
  expect(screen.getByRole('slider', { name: '妆前妆后对比位置' })).toHaveValue('0');
});

test('changes comparison with keyboard arrows', async () => {
  const user = userEvent.setup();
  render(<BeforeAfterSlider beforeSrc="before.svg" afterSrc="after.svg" />);
  const slider = screen.getByRole('slider', { name: '妆前妆后对比位置' });

  slider.focus();
  await user.keyboard('{ArrowRight}');

  expect(slider).toHaveValue('55');
});
