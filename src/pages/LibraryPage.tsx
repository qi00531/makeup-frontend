import { BookOpen, Boxes, Filter, PackageSearch, Search, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssetCard } from '../components/AssetCard';
import { BottomNav } from '../components/BottomNav';
import { MobileShell } from '../components/MobileShell';
import { learningService } from '../services/learningService';
import type { AssetCategory, LibraryAsset } from '../types/learning';

const tabs: Array<{ id: AssetCategory; label: string; icon: typeof BookOpen }> = [
  { id: 'tutorial', label: '教程', icon: BookOpen }, { id: 'part', label: '部位', icon: Boxes }, { id: 'product', label: '产品', icon: PackageSearch },
];
const styles = ['全部', '清透', '甜美', '冷感', '自然'];

export function LibraryPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<AssetCategory>('tutorial');
  const [query, setQuery] = useState('');
  const [style, setStyle] = useState('全部');
  const [assets, setAssets] = useState<LibraryAsset[]>([]);

  useEffect(() => { void learningService.listAssets({ category, query, style }).then(setAssets); }, [category, query, style]);

  function selectAsset(asset: LibraryAsset) {
    if (asset.category === 'part' && asset.part) navigate(`/mix?part=${asset.part}&asset=${asset.id}`);
    else if (asset.category === 'tutorial') navigate('/tutorial');
  }

  return (
    <MobileShell withNav className="learning-page library-page">
      <header className="library-heading"><div><span className="page-kicker">MY BEAUTY ARCHIVE</span><h1>知识库</h1><p>收藏的教程会自动拆成可复用的部位素材</p></div><span className="library-mark"><Sparkles size={21} /></span></header>
      <label className="library-search"><Search size={17} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索教程、部位、产品" aria-label="搜索知识库" /><button type="button" aria-label="筛选"><Filter size={17} /></button></label>
      <div className="library-tabs" role="tablist" aria-label="知识库分类">{tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" role="tab" aria-selected={category === id} className={category === id ? 'is-active' : ''} onClick={() => setCategory(id)}><Icon size={16} />{label}</button>)}</div>
      <div className="filter-scroll" aria-label="风格筛选">{styles.map((item) => <button type="button" key={item} className={style === item ? 'is-active' : ''} onClick={() => setStyle(item)}>{item}</button>)}</div>
      <section className="asset-section" aria-live="polite"><div className="section-heading"><h2>{tabs.find((tab) => tab.id === category)?.label}资产</h2><span>{assets.length} 项</span></div>{assets.length ? <div className="asset-grid">{assets.map((asset) => <AssetCard key={asset.id} asset={asset} onSelect={selectAsset} />)}</div> : <div className="empty-library"><Search size={25} /><p>没有找到匹配的素材</p><button type="button" onClick={() => { setQuery(''); setStyle('全部'); }}>清除筛选</button></div>}</section>
      <BottomNav />
    </MobileShell>
  );
}
