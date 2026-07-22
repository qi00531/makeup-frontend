import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AdjustPage } from './AdjustPage';

test('submits selected adjustment and opens tutorial', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/adjust']}>
      <Routes>
        <Route path="/adjust" element={<AdjustPage />} />
        <Route path="/tutorial" element={<h1>图示教程</h1>} />
      </Routes>
    </MemoryRouter>,
  );

  await user.click(screen.getByRole('radio', { name: '更日常' }));
  await user.click(screen.getByRole('checkbox', { name: '只有手指' }));
  await user.type(screen.getByLabelText('补充要求'), '眼妆淡一点');
  await user.click(screen.getByRole('button', { name: '生成方案' }));

  expect(screen.getByRole('heading', { name: '图示教程' })).toBeInTheDocument();
});
