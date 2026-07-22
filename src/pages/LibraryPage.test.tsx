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
        <Route path="/tutorial" element={<h1>图示教程</h1>} />
      </Routes>
    </MemoryRouter>,
  );

  await user.click(await screen.findByRole('tab', { name: '部位' }));
  await user.type(screen.getByRole('searchbox'), '眼妆');
  await user.click(await screen.findByRole('button', { name: /清透玫瑰眼妆/ }));

  expect(screen.getByRole('heading', { name: '混搭编辑' })).toBeInTheDocument();
});

test('replaces the product tab with the embedded mix editor', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter initialEntries={['/library']}><LibraryPage /></MemoryRouter>);

  expect(screen.queryByRole('heading', { name: '知识库' })).not.toBeInTheDocument();
  expect(screen.queryByRole('tab', { name: '产品' })).not.toBeInTheDocument();
  await user.click(screen.getByRole('tab', { name: '混搭' }));

  expect(screen.getByRole('heading', { name: '混搭编辑' })).toBeInTheDocument();
});
