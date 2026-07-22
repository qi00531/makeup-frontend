import { ArrowLeft, Check, ChevronRight, CircleAlert, Layers3, Sparkles, WandSparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { MixFace } from '../components/MixFace';
import { MobileShell } from '../components/MobileShell';
import { learningService } from '../services/learningService';
import type { CompatibilityHint, LibraryAsset, MakeupPart, MixSelection } from '../types/learning';

const partLabels: Record<MakeupPart, string> = { base: '底妆', brows: '眉毛', eyes: '眼妆', blush: '腮红', contour: '修容', highlight: '高光', lips: '唇妆' };
const presetNames: Partial<Record<MakeupPart, string>> = { base: '轻薄柔焦底妆', brows: '自然灰棕眉', contour: '柔和轮廓修容', highlight: '香槟局部高光' };

export function MixPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const queryPart = params.get('part') as MakeupPart | null;
  const queryAsset = params.get('asset');
  const [activePart, setActivePart] = useState<MakeupPart>(queryPart ?? 'eyes');
  const [assets, setAssets] = useState<LibraryAsset[]>([]);
  const [selection, setSelection] = useState<MixSelection>({ eyes: queryPart === 'eyes' && queryAsset ? queryAsset : 'eyes-rose', blush: 'blush-sheer', lips: 'lips-rose' });
  const [hints, setHints] = useState<CompatibilityHint[]>([]);

  useEffect(() => { void learningService.listAssets({ category: 'part' }).then(setAssets); }, []);
  useEffect(() => { void learningService.checkCompatibility(selection).then(setHints); }, [selection]);
  const selectedAssets = useMemo(() => Object.entries(selection).map(([part, id]) => ({ part: part as MakeupPart, asset: assets.find((item) => item.id === id) })).filter((item) => item.asset), [assets, selection]);
  const activeOptions = assets.filter((asset) => asset.part === activePart);

  return (
    <MobileShell withNav className="learning-page mix-page">
      <header className="detail-header"><button className="icon-button" type="button" aria-label="返回" onClick={() => navigate('/library')}><ArrowLeft size={21} /></button><div><span className="page-kicker">MIX & MATCH</span><h1>混搭编辑</h1></div><button className="icon-button" type="button" aria-label="方案选项"><Layers3 size={20} /></button></header>
      <section className="mix-preview-card"><div className="mix-title"><div><h2>我的定制妆容</h2><p>点击部位替换你的收藏素材</p></div><span><Sparkles size={14} />{selectedAssets.length + Object.keys(presetNames).length}/7</span></div><MixFace selection={selection} activePart={activePart} onPartChange={setActivePart} /></section>
      <section className="part-options"><div className="section-heading"><h2>{partLabels[activePart]}资产</h2><span>选择一个</span></div><div className="option-scroll">{activeOptions.length ? activeOptions.map((asset) => <button type="button" key={asset.id} className={selection[activePart] === asset.id ? 'is-active' : ''} onClick={() => setSelection((current) => ({ ...current, [activePart]: asset.id }))}><i style={{ backgroundColor: asset.color }} /> <span><strong>{asset.title}</strong><small>{asset.style} · {asset.source}</small></span>{selection[activePart] === asset.id && <Check size={14} />}</button>) : <button type="button" className="is-active"><i className="neutral-swatch"/><span><strong>{presetNames[activePart] ?? `默认${partLabels[activePart]}`}</strong><small>当前预置方案</small></span><Check size={14} /></button>}</div></section>
      <section className="selected-assets"><div className="section-heading"><h2>已选资产</h2><span>{selectedAssets.length} 项</span></div>{selectedAssets.map(({ part, asset }) => asset && <button type="button" key={part} onClick={() => setActivePart(part)}><span>{partLabels[part]}</span><i style={{ backgroundColor: asset.color }} /><strong>{asset.title}</strong><ChevronRight size={14} /></button>)}</section>
      <section className={`compatibility-card ${hints[0]?.type === 'compatible' ? 'is-compatible' : 'has-warning'}`}>{hints[0]?.type === 'compatible' ? <Check size={17} /> : <CircleAlert size={17} />}<div><strong>{hints[0]?.message}</strong><p>{hints[0]?.suggestion}</p></div></section>
      <button className="primary-button mix-generate" type="button" onClick={() => navigate('/tutorial')}><WandSparkles size={18} />生成教程</button>
      <BottomNav />
    </MobileShell>
  );
}
