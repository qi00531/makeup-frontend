import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';

test('uses a preselected asset and generates a tutorial', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/mix?part=eyes&asset=eyes-rose']}>
      <AppRoutes />
    </MemoryRouter>,
  );

  expect(await screen.findAllByText('清透玫瑰眼妆')).toHaveLength(2);
  await user.click(screen.getByRole('button', { name: '生成教程' }));

  expect(await screen.findByRole('heading', { name: '图示教程' })).toBeInTheDocument();
});
