import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ProfilePage } from './ProfilePage';

test('edits and persists personal makeup preferences', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter><ProfilePage /></MemoryRouter>);

  expect(screen.getByRole('heading', { name: '我的' })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: '偏好风格 清透自然' }));
  await user.click(screen.getByRole('option', { name: '冷感高级' }));

  expect(screen.getByRole('button', { name: '偏好风格 冷感高级' })).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem('makeupProfile') ?? '{}').style).toBe('冷感高级');
});
