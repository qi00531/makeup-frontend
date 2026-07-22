import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MixPage } from './MixPage';

test('uses a preselected asset and generates a tutorial', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/mix?part=eyes&asset=eyes-rose']}>
      <Routes><Route path="/mix" element={<MixPage />} /><Route path="/tutorial" element={<h1>图示教程</h1>} /></Routes>
    </MemoryRouter>,
  );

  expect(await screen.findAllByText('清透玫瑰眼妆')).toHaveLength(2);
  await user.click(screen.getByRole('button', { name: '生成教程' }));

  expect(screen.getByRole('heading', { name: '图示教程' })).toBeInTheDocument();
});
