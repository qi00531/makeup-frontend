import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LibraryPage } from './LibraryPage';

test('requires a decision for all five preset parts before generating', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/library?tab=mix']}>
      <Routes>
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/mix/generating" element={<h1>生成妆效中</h1>} />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.queryByRole('img', { name: '混搭妆容预览' })).not.toBeInTheDocument();
  for (const part of ['底妆', '眼妆', '腮红', '修容', '唇妆']) {
    expect(screen.getByRole('group', { name: `${part}选择` })).toBeInTheDocument();
  }
  const generate = screen.getByRole('button', { name: '生成效果' });
  expect(generate).toBeDisabled();

  for (const skip of screen.getAllByRole('button', { name: '跳过此部位' })) await user.click(skip);

  expect(screen.getByText('已完成 5/5')).toBeInTheDocument();
  expect(generate).toBeEnabled();
  await user.click(generate);
  expect(screen.getByRole('heading', { name: '生成妆效中' })).toBeInTheDocument();
});
