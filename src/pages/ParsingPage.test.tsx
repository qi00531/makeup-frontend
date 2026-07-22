import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ParsingPage } from './ParsingPage';

test('shows progress stages and opens preview when complete', async () => {
  sessionStorage.setItem('makeupTask', JSON.stringify({ taskId: 'task-1' }));
  render(
    <MemoryRouter initialEntries={['/parsing']}>
      <Routes>
        <Route path="/parsing" element={<ParsingPage />} />
        <Route path="/preview" element={<h1>适配预览</h1>} />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getAllByText('检查视频质量')).toHaveLength(2);
  await waitFor(
    () => expect(screen.getByRole('heading', { name: '适配预览' })).toBeInTheDocument(),
    { timeout: 3000 },
  );
});
