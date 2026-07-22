import faceAfter from '../assets/face-after.svg';
import type { MakeupPart, MixSelection } from '../types/learning';

const slots: Array<{ part: MakeupPart; label: string; x: number; y: number }> = [
  { part: 'base', label: '底妆', x: 6, y: 22 }, { part: 'brows', label: '眉毛', x: 76, y: 12 }, { part: 'eyes', label: '眼妆', x: 81, y: 38 },
  { part: 'blush', label: '腮红', x: 2, y: 54 }, { part: 'contour', label: '修容', x: 78, y: 66 }, { part: 'highlight', label: '高光', x: 9, y: 78 }, { part: 'lips', label: '唇妆', x: 66, y: 85 },
];

interface MixFaceProps { selection: MixSelection; activePart: MakeupPart; onPartChange: (part: MakeupPart) => void; }

export function MixFace({ selection, activePart, onPartChange }: MixFaceProps) {
  return (
    <div className="mix-face" aria-label="妆容部位槽位">
      <img src={faceAfter} alt="混搭妆容预览" />
      {slots.map((slot) => <button type="button" key={slot.part} className={`${slot.part === activePart ? 'is-active' : ''}${selection[slot.part] ? ' is-filled' : ''}`} style={{ left: `${slot.x}%`, top: `${slot.y}%` }} onClick={() => onPartChange(slot.part)}><span>{slot.label}</span><i /></button>)}
    </div>
  );
}
