import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PreviewPage } from './PreviewPage';

test('shows comparison, makeup summary and suitability decisions', async () => {
  sessionStorage.setItem('makeupTask', JSON.stringify({ taskId: 'task-1' }));
  render(<MemoryRouter><PreviewPage /></MemoryRouter>);

  expect(await screen.findByRole('heading', { name: '适配预览' })).toBeInTheDocument();
  await waitFor(() => expect(screen.getByRole('slider', { name: '妆前妆后对比位置' })).toBeInTheDocument());
  expect(screen.getByRole('button', { name: '适合我' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '需要微调' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '不适合我' })).toBeInTheDocument();
});
