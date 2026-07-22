import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/react';
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

test('combines upload and requirements without the top title card', () => {
  render(<MemoryRouter><UploadPage /></MemoryRouter>);

  expect(screen.queryByRole('heading', { name: '上传教程' })).not.toBeInTheDocument();
  const card = screen.getByRole('region', { name: '上传视频与要求' });
  expect(within(card).getByLabelText('选择教程视频')).toBeInTheDocument();
  expect(within(card).getByRole('heading', { name: '视频要求' })).toBeInTheDocument();
});
