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

  expect(screen.getByRole('group', { name: /个人风格/ })).toBeInTheDocument();
  expect(screen.getByRole('group', { name: /脸部匹配/ })).toBeInTheDocument();
  expect(screen.getByRole('group', { name: /工具/ })).toBeInTheDocument();
  expect(screen.queryByLabelText('补充要求')).not.toBeInTheDocument();

  await user.click(screen.getByRole('checkbox', { name: '清透自然' }));
  await user.click(screen.getByRole('checkbox', { name: '清冷高级' }));
  await user.click(screen.getByRole('checkbox', { name: '通勤工作' }));
  await user.click(screen.getByRole('checkbox', { name: '眼妆' }));
  await user.click(screen.getByRole('radio', { name: '敏感肌' }));
  await user.click(screen.getByRole('checkbox', { name: '放大眼睛' }));
  await user.click(screen.getByRole('checkbox', { name: '没有专业刷具' }));
  await user.click(screen.getByRole('button', { name: '生成方案' }));

  expect(screen.getByRole('heading', { name: '图示教程' })).toBeInTheDocument();
});

test('removes the previous adjustment questions', () => {
  render(<MemoryRouter><AdjustPage /></MemoryRouter>);

  expect(screen.queryByText('适配场合')).not.toBeInTheDocument();
  expect(screen.queryByText('执行工具')).not.toBeInTheDocument();
  expect(screen.queryByText('自由文本')).not.toBeInTheDocument();
});
