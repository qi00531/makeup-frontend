import { Route, Routes } from 'react-router-dom';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { PhotoPage } from './pages/PhotoPage';
import { UploadPage } from './pages/UploadPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="/photo" element={<PhotoPage />} />
      <Route path="/practice" element={<PlaceholderPage title="跟练" />} />
      <Route path="/library" element={<PlaceholderPage title="知识库" />} />
      <Route path="/profile" element={<PlaceholderPage title="我的" />} />
    </Routes>
  );
}

export default function App() {
  return <AppRoutes />;
}
