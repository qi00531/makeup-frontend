import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';

test('moves from preview through adjustment to tutorial and eye guide', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={['/preview']}><AppRoutes /></MemoryRouter>);

  await user.click(await screen.findByRole('button', { name: '需要微调' }));
  await user.click(screen.getByRole('button', { name: '生成方案' }));
  await user.click(await screen.findByRole('button', { name: '4. 眼影打底' }));
  await user.click(screen.getByRole('link', { name: '查看眼部精讲' }));

  expect(screen.getByRole('heading', { name: '眼部精讲' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /跟练/ })).not.toBeInTheDocument();
});

test('preselects any part asset in mix and generates its tutorial', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={['/mix?part=blush&asset=blush-peach']}><AppRoutes /></MemoryRouter>);

  expect((await screen.findAllByText('蜜桃氛围腮红')).length).toBeGreaterThan(0);
  await user.click(screen.getByRole('button', { name: '生成教程' }));

  expect(await screen.findByRole('heading', { name: '图示教程' })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: '5. 腮红上移' }));
  expect(screen.getByText('蜜桃氛围腮红')).toBeInTheDocument();
});
