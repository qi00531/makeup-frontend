import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LibraryPage } from './LibraryPage';

test('filters assets and sends a selected part to mix editor', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/library']}>
      <Routes>
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/mix" element={<h1>混搭编辑</h1>} />
      </Routes>
    </MemoryRouter>,
  );

  await user.click(await screen.findByRole('tab', { name: '部位' }));
  await user.type(screen.getByRole('searchbox'), '眼妆');
  await user.click(await screen.findByRole('button', { name: /清透玫瑰眼妆/ }));

  expect(screen.getByRole('heading', { name: '混搭编辑' })).toBeInTheDocument();
});
