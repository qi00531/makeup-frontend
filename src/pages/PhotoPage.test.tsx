import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { PhotoPage } from './PhotoPage';

beforeEach(() => {
  vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:photo-preview');
  vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
});

afterEach(() => vi.restoreAllMocks());

function renderPhotoPage() {
  return render(
    <MemoryRouter initialEntries={['/photo']}>
      <Routes>
        <Route path="/photo" element={<PhotoPage />} />
        <Route path="/parsing" element={<h1>正在解析</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}

test('allows the user to skip a personal photo', async () => {
  const user = userEvent.setup();
  renderPhotoPage();

  await user.click(screen.getByRole('button', { name: '暂时跳过' }));

  expect(screen.getByRole('heading', { name: '正在解析' })).toBeInTheDocument();
});

test('previews a selected image before confirmation', async () => {
  const user = userEvent.setup();
  renderPhotoPage();

  await user.upload(
    screen.getByLabelText('上传本人照片'),
    new File(['face'], 'face.jpg', { type: 'image/jpeg' }),
  );

  expect(screen.getByRole('img', { name: '待确认的本人照片' })).toHaveAttribute('src', 'blob:photo-preview');
});
