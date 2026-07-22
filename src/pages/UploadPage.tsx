import { Check, ChevronRight, CloudUpload, Film, RefreshCw, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { MobileShell } from '../components/MobileShell';
import { makeupService } from '../services/makeupService';

const recentTasks = [
  { name: '自然日常妆', date: '2026-07-20', status: '适配完成' },
  { name: '清透妆容', date: '2026-07-18', status: '可继续' },
  { name: '约会妆容', date: '2026-07-15', status: '解析完成' },
];

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function continueFlow() {
    if (!file || loading) return;
    setLoading(true);
    setError('');
    try {
      const result = await makeupService.uploadVideo(file);
      sessionStorage.setItem('makeupTask', JSON.stringify(result));
      navigate('/photo');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : '视频上传失败，请重新选择');
    } finally {
      setLoading(false);
    }
  }

  return (
    <MobileShell withNav className="upload-page">
      <header className="upload-heading"><span className="page-kicker">MY BEAUTY STUDIO</span></header>
      <section className="upload-suite" aria-label="上传视频与要求">
      <div className={`upload-card${file ? ' has-file' : ''}`}>
        <input
          id="video-upload"
          className="visually-hidden"
          type="file"
          accept="video/mp4,video/quicktime,.mp4,.mov"
          aria-label="选择教程视频"
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
            setError('');
          }}
        />
        <label htmlFor="video-upload" className="upload-card__label">
          <span className="upload-card__icon">{file ? <Film size={29} /> : <CloudUpload size={31} />}</span>
          <span id="upload-title" className="upload-card__title">{file ? file.name : '上传你的教程视频'}</span>
          <span className="upload-card__meta">{file ? `${formatSize(file.size)} · 点击重新选择` : '支持 MP4、MOV · 不超过 500MB'}</span>
        </label>
        {file && <Check className="upload-card__check" aria-hidden="true" size={19} />}
      </div>
      {error && <p className="inline-error" role="alert">{error}</p>}
      <div className="requirement-card" aria-labelledby="requirements-title">
        <div className="section-title-row">
          <span className="section-icon"><Sparkles size={18} /></span>
          <div><span className="section-eyebrow">上传前看一眼</span><h2 id="requirements-title">视频要求</h2></div>
        </div>
        <ul className="requirement-list">
          <li><Check size={15} />教程步骤明显</li>
          <li><Check size={15} />人脸清晰无遮挡</li>
          <li><Check size={15} />光线充足稳定</li>
        </ul>
      </div>
      </section>

      {file && (
        <button className="primary-button" type="button" onClick={continueFlow} disabled={loading}>
          {loading ? <><RefreshCw className="spin" size={18} />正在准备</> : <>下一步<ChevronRight size={18} /></>}
        </button>
      )}

      <section className="recent-section" aria-labelledby="recent-title">
        <div className="section-heading"><h2 id="recent-title">最近任务</h2><button type="button">查看全部</button></div>
        <div className="task-list">
          {recentTasks.map((task, index) => (
            <button className="task-card" type="button" key={task.name}>
              <span className={`task-card__thumb tone-${index + 1}`}><span /></span>
              <span className="task-card__body"><strong>{task.name}</strong><small>{task.date} · {task.status}</small></span>
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>
      <BottomNav />
    </MobileShell>
  );
}
