import { ArrowLeft, Check, Clock3, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { MobileShell } from '../components/MobileShell';
import { learningService } from '../services/learningService';
import { makeupService } from '../services/makeupService';
import type { MakeupPreview } from '../types/makeup';

function taskId() {
  try { return JSON.parse(sessionStorage.getItem('makeupTask') ?? '{}').taskId ?? 'demo-task'; }
  catch { return 'demo-task'; }
}

export function PreviewPage() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<MakeupPreview | null>(null);

  useEffect(() => { void makeupService.getPreview(taskId()).then(setPreview); }, []);

  return (
    <MobileShell className="preview-page">
      <header className="detail-header">
        <button className="icon-button" type="button" aria-label="返回" onClick={() => navigate('/', { replace: true })}><ArrowLeft size={21} /></button>
        <div><span className="page-kicker">YOUR MAKEUP MATCH</span><h1>适配预览</h1></div>
        <span className="header-spacer" />
      </header>

      {preview ? (
        <>
          <BeforeAfterSlider beforeSrc={preview.beforeImage} afterSrc={preview.afterImage} />

          <section className="makeup-summary" aria-labelledby="summary-title">
            <div className="summary-heading"><div><span className="section-eyebrow">解析妆容</span><h2 id="summary-title">{preview.title}</h2></div><span className="difficulty-pill">{preview.difficulty}</span></div>
            <div className="palette" aria-label="妆容配色">
              {preview.palette.map((color, index) => <span key={color} style={{ backgroundColor: color }} title={`妆容色 ${index + 1}`} />)}
            </div>
            <div className="summary-meta"><span><Sparkles size={14} />{preview.style}</span><span><Clock3 size={14} />{preview.duration}</span><span>{preview.occasion}</span></div>
          </section>

          <section className="adaptation-section" aria-labelledby="adapt-title">
            <div className="section-heading"><h2 id="adapt-title">关键适配提示</h2><span>为你调整</span></div>
            <div className="hint-list">
              {preview.hints.map((hint) => (
                <article className={`hint-card tone-${hint.tone}`} key={hint.title}>
                  <span>{hint.tone === 'positive' ? <Check size={16} /> : hint.tone === 'adjust' ? <SlidersHorizontal size={16} /> : <Sparkles size={16} />}</span>
                  <div><h3>{hint.title}</h3><p>{hint.description}</p></div>
                </article>
              ))}
            </div>
          </section>

          <section className="decision-card" aria-label="妆容适配判断">
            <h2>这个妆适合你吗？</h2>
            <p>你的选择会帮助我们继续优化教程</p>
            <div className="decision-actions">
              <button type="button" className="is-positive" onClick={async () => { const tutorial = await learningService.getTutorial('tutorial-rose-commute'); navigate('/tutorial', { state: { from: '/preview', tutorialId: tutorial.id } }); }}><Check size={17} />适合我</button>
              <button type="button" onClick={() => navigate('/adjust')}><SlidersHorizontal size={17} />需要微调</button>
            </div>
          </section>
        </>
      ) : <div className="preview-loading"><Sparkles className="spin" size={26} /><p>正在生成你的适配效果…</p></div>}
    </MobileShell>
  );
}
