import { Book, Chapter } from '@/types';

// 生成模拟数据的辅助函数
const generateBooks = (count: number, category: string, status: '连载中' | '已完结'): Book[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${category}-${i}`,
    title: `模拟小说标题 ${category}之${i + 1}`,
    author: `大神作者${i}`,
    // 使用随机颜色的占位图模拟封面
    coverUrl: `https://placehold.co/200x280/${Math.floor(Math.random()*16777215).toString(16)}/FFF?text=NOVEL`,
    category: category,
    status: status,
    description: '这是一个模拟的简介。主角重生回到了十年前，凭借着前世的记忆，他在这个灵气复苏的世界里一步步走上巅峰，拳打天才，脚踢圣子...',
    lastUpdated: '2小时前',
  }));
};

export const MOCK_BOOKS: Book[] = [
  ...generateBooks(8, '玄幻', '连载中'),
  ...generateBooks(8, '都市', '已完结'),
  ...generateBooks(4, '言情', '连载中'),
];

export const MOCK_CHAPTER: Chapter = {
  id: '101',
  bookId: '1',
  title: '第一章 重生归来',
  content: `
    <p>痛，太痛了。</p>
    <p>林风猛地睁开眼睛，发现自己竟然躺在高中时代的课桌上。</p>
    <p>“我没死？我竟然回到了2025年？”</p>
    <p>看着讲台上正在唾沫横飞的数学老师，林风的眼中闪过一丝精芒。</p>
    <br/>
    <p>上一世，他被仇家追杀，含恨陨落。</p>
    <p>这一世，他发誓要夺回属于自己的一切！</p>
    <p>（此处为演示内容，正文通常有几千字...）</p>
  `,
  prevId: null,
  nextId: '102',
};

export const getBook = async (id: string) => MOCK_BOOKS[0]; // 简化逻辑：无论点哪个都返回同一本书详情
export const getChapter = async (bid: string, cid: string) => ({ ...MOCK_CHAPTER, title: `第${cid}章 模拟章节` });
