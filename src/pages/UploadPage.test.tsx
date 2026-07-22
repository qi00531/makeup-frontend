import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { UploadPage } from './UploadPage';

test('shows selected video and enables continue', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <UploadPage />
    </MemoryRouter>,
  );
  const file = new File(['video'], 'daily-look.mp4', { type: 'video/mp4' });

  await user.upload(screen.getByLabelText('选择教程视频'), file);

  expect(screen.getByText('daily-look.mp4')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '下一步' })).toBeEnabled();
  expect(screen.getByRole('navigation', { name: '主导航' })).toBeInTheDocument();
});
