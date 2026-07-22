import type {
  AdjustmentRequest,
  CompatibilityHint,
  EyeRegionGuide,
  IllustratedTutorial,
  LearningService,
  LibraryAsset,
  LibraryFilter,
  MixSelection,
} from '../types/learning';

const tutorial: IllustratedTutorial = {
  id: 'tutorial-rose-commute',
  title: '清透玫瑰通勤妆',
  difficulty: '新手友好',
  duration: '约 18 分钟',
  mode: 'beginner',
  steps: [
    { id: 'base', order: 1, title: '底妆打底', part: 'base', product: '轻薄粉底液', color: '#ead6cf', instruction: '从面中向外少量铺开，边缘保持轻薄。', expertTip: '鼻翼和嘴角用余粉带过。', videoSlice: '00:12–00:48' },
    { id: 'conceal', order: 2, title: '局部遮瑕', part: 'base', product: '蜜桃色遮瑕', color: '#e8b8a6', instruction: '只点涂在眼下与泛红处，轻拍融合。', expertTip: '避免大面积厚涂。', videoSlice: '00:49–01:22' },
    { id: 'brows', order: 3, title: '自然眉形', part: 'brows', product: '灰棕眉粉', color: '#8d7167', instruction: '顺着毛流填补空缺，眉头保持自然。', expertTip: '眉峰不要过高。', videoSlice: '01:23–02:06' },
    { id: 'eyes', order: 4, title: '眼影打底', part: 'eyes', product: '裸粉眼影', color: '#c98586', instruction: '从睫毛根部向上晕染，范围不超过眼窝。', expertTip: '眼尾颜色略深即可。', videoSlice: '02:07–04:18', hasEyeGuide: true },
    { id: 'blush', order: 5, title: '腮红上移', part: 'blush', product: '柔雾玫瑰腮红', color: '#d3787d', instruction: '从眼下向颧骨外侧轻扫，横向收窄。', expertTip: '少量叠加更自然。', videoSlice: '04:19–05:03' },
    { id: 'highlight', order: 6, title: '局部提亮', part: 'highlight', product: '香槟高光', color: '#f2dfc3', instruction: '点在鼻梁、眉骨与唇峰，避免大面积闪光。', expertTip: '使用指腹轻点。', videoSlice: '05:04–05:42' },
    { id: 'lips', order: 7, title: '唇妆完成', part: 'lips', product: '低饱和玫瑰唇釉', color: '#a94f5b', instruction: '先薄涂全唇，再在唇中叠加一层。', expertTip: '边缘用指腹柔化。', videoSlice: '05:43–06:20' },
  ],
};

const eyeGuides: EyeRegionGuide[] = [
  { id: 'shadow', label: '眼影范围', description: '裸粉色从睫毛根部向上铺到眼窝下缘。', adaptation: '你的眼皮空间充足，范围控制在眉眼距离的三分之一。', color: '#c98586', videoSlice: '02:07–02:48' },
  { id: 'liner', label: '眼线走势', description: '沿睫毛根部描画，眼尾向外延伸约 3mm。', adaptation: '保持微微上扬，不要明显挑高。', color: '#5b403d', videoSlice: '02:49–03:20' },
  { id: 'aegyo', label: '卧蚕', description: '用哑光浅色提亮眼下前二分之一。', adaptation: '宽度控制在下眼睑高度的一半。', color: '#efd3c4', videoSlice: '03:21–03:38' },
  { id: 'lashes', label: '睫毛', description: '夹翘后重点刷中段和眼尾。', adaptation: '外侧睫毛略加强能拉长眼型。', color: '#332725', videoSlice: '03:39–03:56' },
  { id: 'inner', label: '眼头提亮', description: '香槟色点在眼头最内侧。', adaptation: '只需米粒大小，避免延伸过多。', color: '#f1dfbd', videoSlice: '03:57–04:03' },
  { id: 'lower', label: '下至', description: '眼尾下方使用浅棕色向外平拉。', adaptation: '范围控制在后四分之一，更适合日常。', color: '#9a6d64', videoSlice: '04:04–04:11' },
  { id: 'distance', label: '眉眼距离', description: '眉骨下方保持干净，弱化深色过渡。', adaptation: '保留充足留白会让妆面更轻盈。', color: '#e8c4bb', videoSlice: '04:12–04:18' },
];

const assets: LibraryAsset[] = [
  { id: 'tutorial-commute', title: '清透通勤全妆', category: 'tutorial', source: '自然日常妆', style: '清透', occasion: '通勤', difficulty: '新手', color: '#d9b3aa', practiced: true },
  { id: 'tutorial-date', title: '柔粉约会妆', category: 'tutorial', source: '春日桃花妆', style: '甜美', occasion: '约会', difficulty: '进阶', color: '#d98698', practiced: false },
  { id: 'eyes-rose', title: '清透玫瑰眼妆', category: 'part', part: 'eyes', source: '清透玫瑰通勤妆', style: '清透', occasion: '通勤', difficulty: '新手', color: '#bd7b82', practiced: true },
  { id: 'eyes-smoky', title: '低饱和烟熏眼妆', category: 'part', part: 'eyes', source: '冷感夜幕妆', style: '冷感', occasion: '聚会', difficulty: '进阶', color: '#716363', practiced: false },
  { id: 'blush-sheer', title: '清透上移腮红', category: 'part', part: 'blush', source: '自然日常妆', style: '清透', occasion: '日常', difficulty: '新手', color: '#dd8b8a', practiced: true },
  { id: 'lips-rose', title: '低饱和玫瑰唇', category: 'part', part: 'lips', source: '清透玫瑰通勤妆', style: '清透', occasion: '通勤', difficulty: '新手', color: '#a94f5b', practiced: false },
  { id: 'product-shadow', title: '裸粉四色眼影', category: 'product', part: 'eyes', source: '常用产品', style: '自然', occasion: '日常', difficulty: '新手', color: '#bc8584', practiced: true },
  { id: 'product-blush', title: '柔雾玫瑰腮红', category: 'product', part: 'blush', source: '常用产品', style: '甜美', occasion: '约会', difficulty: '新手', color: '#d8757f', practiced: false },
  { id: 'product-lip', title: '水光玫瑰唇釉', category: 'product', part: 'lips', source: '常用产品', style: '清透', occasion: '日常', difficulty: '新手', color: '#a84d58', practiced: true },
];

class LocalLearningService implements LearningService {
  async saveAdjustment(request: AdjustmentRequest) {
    sessionStorage.setItem('makeupAdjustment', JSON.stringify(request));
    return tutorial;
  }

  async getTutorial() { return tutorial; }
  async getEyeGuides() { return eyeGuides; }

  async listAssets(filter: LibraryFilter) {
    const query = filter.query?.trim().toLocaleLowerCase() ?? '';
    return assets.filter((asset) => {
      const matchesCategory = !filter.category || asset.category === filter.category;
      const matchesStyle = !filter.style || filter.style === '全部' || asset.style === filter.style;
      const haystack = `${asset.title}${asset.source}${asset.style}${asset.occasion}`.toLocaleLowerCase();
      return matchesCategory && matchesStyle && (!query || haystack.includes(query));
    });
  }

  async checkCompatibility(selection: MixSelection): Promise<CompatibilityHint[]> {
    if (selection.eyes === 'eyes-smoky' && selection.blush === 'blush-sheer') {
      return [{ type: 'style-conflict', message: '浓郁眼妆与清透腮红风格有差异', suggestion: '用于通勤时，建议缩小眼尾加深范围。' }];
    }
    return [{ type: 'compatible', message: '当前部位风格协调', suggestion: '可以直接生成这套定制教程。' }];
  }
}

export const learningService: LearningService = new LocalLearningService();
