import { Check, ChevronRight, CircleUserRound, Sparkles } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { LibraryAsset } from '../types/learning';

interface AssetCardProps { asset: LibraryAsset; onSelect: (asset: LibraryAsset) => void; }

export function AssetCard({ asset, onSelect }: AssetCardProps) {
  return (
    <button className="asset-card" type="button" aria-label={`${asset.title}，选择资产`} onClick={() => onSelect(asset)}>
      <span className="asset-card__visual" style={{ '--asset-color': asset.color } as CSSProperties}>
        {asset.part === 'eyes' ? <span className="mini-eye" /> : asset.part === 'lips' ? <span className="mini-lips" /> : <CircleUserRound size={34} strokeWidth={1.2} />}
        {asset.practiced && <i><Check size={10} /></i>}
      </span>
      <span className="asset-card__copy"><strong>{asset.title}</strong><small>{asset.style} · {asset.difficulty}</small><em><Sparkles size={11} />{asset.source}</em></span>
      <ChevronRight size={14} />
    </button>
  );
}
