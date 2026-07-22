import { Check, Circle, LoaderCircle, RefreshCw, Sparkles } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileShell } from '../components/MobileShell';
import { makeupService } from '../services/makeupService';
import type { AnalysisProgress, AnalysisStage } from '../types/makeup';

const initialStages: AnalysisStage[] = [
  { id: 'stage-1', label: '检查视频质量', status: 'active' },
  { id: 'stage-2', label: '识别妆容步骤', status: 'pending' },
  { id: 'stage-3', label: '生成适配预览', status: 'pending' },
  { id: 'stage-4', label: '整理关键建议', status: 'pending' },
];

function readTaskId() {
  try {
    return JSON.parse(sessionStorage.getItem('makeupTask') ?? '{}').taskId ?? 'demo-task';
  } catch {
    return 'demo-task';
  }
}

export function ParsingPage() {
  const navigate = useNavigate();
  const [runId, setRunId] = useState(0);
  const [progress, setProgress] = useState<AnalysisProgress>({
    taskId: readTaskId(), progress: 8, currentStage: '检查视频质量', remainingSeconds: 30,
    status: 'processing', stages: initialStages,
  });

  const retry = useCallback(() => {
    setProgress((current) => ({ ...current, progress: 8, status: 'processing', failureReason: undefined, stages: initialStages }));
    setRunId((value) => value + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        for await (const next of makeupService.analyze(readTaskId())) {
          if (cancelled) return;
          setProgress(next);
          sessionStorage.setItem('makeupProgress', JSON.stringify(next));
        }
        if (!cancelled) navigate('/preview');
      } catch (reason) {
        if (!cancelled) {
          setProgress((current) => ({
            ...current, status: 'failed',
            failureReason: reason instanceof Error ? reason.message : '解析暂时中断，请重新尝试',
          }));
        }
      }
    }
    void run();
    return () => { cancelled = true; };
  }, [navigate, runId]);

  return (
    <MobileShell className="parsing-page">
      <header className="centered-heading">
        <span className="page-kicker">AI MAKEUP ANALYSIS</span>
        <h1>{progress.status === 'failed' ? '解析遇到问题' : '解析中，请稍候…'}</h1>
        <p>{progress.status === 'failed' ? '你的视频和照片都已保留' : '正在把教程变成适合你的上妆方案'}</p>
      </header>

      <section className="progress-hero" aria-label={`解析进度 ${progress.progress}%`}>
        <div className="progress-ring" style={{ '--progress': progress.progress } as CSSProperties}>
          <div className="progress-ring__inner">
            <strong>{progress.progress}<small>%</small></strong>
            <span>{progress.status === 'completed' ? '已完成' : '解析进度'}</span>
          </div>
        </div>
        <div className="current-stage"><Sparkles size={16} /><span>当前阶段</span><strong>{progress.currentStage}</strong></div>
      </section>

      <section className="stage-card" aria-labelledby="stage-title">
        <div className="section-heading"><h2 id="stage-title">处理步骤</h2><span>{progress.stages.filter((stage) => stage.status === 'completed').length}/{progress.stages.length}</span></div>
        <ol className="stage-list">
          {progress.stages.map((stage) => (
            <li key={stage.id} className={`stage-list__item is-${stage.status}`}>
              <span className="stage-list__icon">
                {stage.status === 'completed' ? <Check size={15} /> : stage.status === 'active' ? <LoaderCircle className="spin" size={16} /> : <Circle size={13} />}
              </span>
              <span>{stage.label}</span>
              <small>{stage.status === 'completed' ? '已完成' : stage.status === 'active' ? '处理中' : '等待中'}</small>
            </li>
          ))}
        </ol>
      </section>

      {progress.status === 'failed' ? (
        <div className="analysis-error" role="alert"><p>{progress.failureReason}</p><button className="primary-button" type="button" onClick={retry}><RefreshCw size={17} />重新解析</button></div>
      ) : (
        <footer className="time-remaining"><span>预计剩余</span><strong>00:{String(progress.remainingSeconds).padStart(2, '0')}</strong><p>完成后将自动进入适配预览</p></footer>
      )}
    </MobileShell>
  );
}
