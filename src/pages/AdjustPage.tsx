import { ArrowLeft, BriefcaseBusiness, Check, ChevronRight, Hand, Palette, Sparkles, WandSparkles } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { MobileShell } from '../components/MobileShell';
import { learningService } from '../services/learningService';

const styles = ['更日常', '更甜', '更冷感', '更清透', '更低攻击感'];
const occasions = ['通勤', '约会', '拍照', '聚会', '面试'];
const tools = ['只有手指', '没有刷子', '产品颜色不全', '新手不会晕染'];

export function AdjustPage() {
  const navigate = useNavigate();
  const [style, setStyle] = useState('更日常');
  const [occasion, setOccasion] = useState('通勤');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function toggleTool(tool: string) {
    setSelectedTools((current) => current.includes(tool) ? current.filter((item) => item !== tool) : [...current, tool]);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    const tutorial = await learningService.saveAdjustment({ style, occasion, tools: selectedTools, notes });
    navigate('/tutorial', { state: { from: '/adjust', tutorialId: tutorial.id } });
  }

  return (
    <MobileShell withNav className="learning-page adjust-page">
      <header className="detail-header">
        <button className="icon-button" type="button" aria-label="返回" onClick={() => navigate('/preview')}><ArrowLeft size={21} /></button>
        <div><span className="page-kicker">PERSONALIZE</span><h1>微调设置</h1></div><span className="header-spacer" />
      </header>

      <div className="adjust-intro"><WandSparkles size={19} /><p>告诉我们你想怎么调整，我们会改写范围、颜色、位置、工具和顺序。</p></div>

      <form className="adjust-form" onSubmit={submit}>
        <fieldset className="choice-section"><legend><Palette size={17} /><span><strong>个人风格</strong><small>你希望妆容呈现什么感觉？</small></span></legend><div className="choice-grid">
          {styles.map((item) => <label className={`choice-chip${style === item ? ' is-selected' : ''}`} key={item}><input type="radio" name="style" value={item} checked={style === item} onChange={() => setStyle(item)} /><span>{item}</span>{style === item && <Check size={13} />}</label>)}
        </div></fieldset>

        <fieldset className="choice-section"><legend><BriefcaseBusiness size={17} /><span><strong>适配场合</strong><small>这套妆准备画去哪里？</small></span></legend><div className="choice-grid choice-grid--compact">
          {occasions.map((item) => <label className={`choice-chip${occasion === item ? ' is-selected' : ''}`} key={item}><input type="radio" name="occasion" value={item} checked={occasion === item} onChange={() => setOccasion(item)} /><span>{item}</span></label>)}
        </div></fieldset>

        <fieldset className="choice-section"><legend><Hand size={17} /><span><strong>执行工具</strong><small>可以多选，我们会替换不便使用的工具</small></span></legend><div className="choice-grid">
          {tools.map((item) => <label className={`choice-chip${selectedTools.includes(item) ? ' is-selected' : ''}`} key={item}><input type="checkbox" checked={selectedTools.includes(item)} onChange={() => toggleTool(item)} /><span>{item}</span>{selectedTools.includes(item) && <Check size={13} />}</label>)}
        </div></fieldset>

        <label className="notes-field" htmlFor="adjust-notes"><span><Sparkles size={16} /><strong>自由文本</strong><small>可选</small></span><textarea id="adjust-notes" aria-label="补充要求" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="例如：眼妆淡一点，腮红不要太粉…" maxLength={120} /><small>{notes.length}/120</small></label>

        <button className="primary-button" type="submit" disabled={submitting}>{submitting ? '正在生成…' : <>生成方案<ChevronRight size={18} /></>}</button>
      </form>
      <BottomNav />
    </MobileShell>
  );
}
