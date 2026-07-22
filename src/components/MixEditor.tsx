import { Check, ChevronRight, Circle, SkipForward, WandSparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { learningService } from '../services/learningService';
import type { LibraryAsset, MixDecision, MixPart } from '../types/learning';

const mixParts: Array<{ id: MixPart; label: string }> = [
  { id: 'base', label: '底妆' }, { id: 'eyes', label: '眼妆' }, { id: 'blush', label: '腮红' }, { id: 'contour', label: '修容' }, { id: 'lips', label: '唇妆' },
];
type DraftMixDecision = Record<MixPart, string | null | undefined>;
const initialDecision: DraftMixDecision = { base: undefined, eyes: undefined, blush: undefined, contour: undefined, lips: undefined };

export function MixEditor() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<LibraryAsset[]>([]);
  const [decision, setDecision] = useState<DraftMixDecision>(initialDecision);

  useEffect(() => { void learningService.listAssets({ category: 'part' }).then(setAssets); }, []);
  const completed = mixParts.filter(({ id }) => decision[id] !== undefined).length;
  const complete = completed === mixParts.length;
  const assetsByPart = useMemo(() => Object.fromEntries(mixParts.map(({ id }) => [id, assets.filter((asset) => asset.part === id)])) as Record<MixPart, LibraryAsset[]>, [assets]);

  function decide(part: MixPart, value: string | null) {
    setDecision((current) => ({ ...current, [part]: value }));
  }

  function generate() {
    if (!complete) return;
    const completeDecision = decision as MixDecision;
    sessionStorage.setItem('makeupMixDecision', JSON.stringify(completeDecision));
    navigate('/mix/generating');
  }

  return <section className="mix-editor" aria-label="混搭编辑">
    <div className="mix-progress"><div><strong>部位选择</strong><span>每个部位可选择资产或跳过</span></div><b>已完成 {completed}/5</b></div>
    <div className="mix-decision-list">
      {mixParts.map(({ id, label }) => <section className={`mix-part-card${decision[id] !== undefined ? ' is-complete' : ''}`} role="group" aria-label={`${label}选择`} key={id}>
        <header><span>{decision[id] !== undefined ? <Check size={14} /> : <Circle size={14} />}</span><h2>{label}</h2><small>{decision[id] === null ? '已跳过' : decision[id] ? '已选择' : '待选择'}</small></header>
        <div className="mix-option-list">
          {assetsByPart[id].map((asset) => <button type="button" key={asset.id} className={decision[id] === asset.id ? 'is-selected' : ''} onClick={() => decide(id, asset.id)}><i style={{ backgroundColor: asset.color }} /><span><strong>{asset.title}</strong><small>{asset.style} · {asset.source}</small></span>{decision[id] === asset.id && <Check size={14} />}</button>)}
          <button type="button" className={`mix-skip${decision[id] === null ? ' is-selected' : ''}`} aria-label="跳过此部位" onClick={() => decide(id, null)}><SkipForward size={15} /><span><strong>跳过此部位</strong><small>不加入本次混搭</small></span>{decision[id] === null && <Check size={14} />}</button>
        </div>
      </section>)}
    </div>
    <button className="primary-button mix-generate" type="button" disabled={!complete} onClick={generate}><WandSparkles size={18} />生成效果<ChevronRight size={17} /></button>
  </section>;
}
