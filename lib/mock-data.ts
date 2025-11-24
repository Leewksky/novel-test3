import { Book, Chapter } from '@/types';

// 扩展 Book 接口 (为了不改动 types 文件，这里临时扩展，实际项目应修改 types/index.ts)
export interface BookExtended extends Book {
  tags: string[];
  views: string;
  wordCount: string;
  latestChapter: string;
  score: number;
}

const generateBooks = (count: number, category: string, status: '连载中' | '已完结'): BookExtended[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${category}-${i}`,
    title: i % 3 === 0 ? `重生之${category}霸主${i}` : `我的${category}系统${i}`,
    author: `白金作家${i}`,
    coverUrl: `https://placehold.co/200x280/${Math.floor(Math.random()*16777215).toString(16)}/FFF?text=${category}`,
    category: category,
    status: status,
    description: '这是一个充满奇遇的世界。主角意外获得了神秘的传承，从此走上了一条逆天改命的道路。热血、爽文、不圣母！',
    lastUpdated: '2小时前',
    tags: ['系统', '重生', '热血', '无敌流'],
    views: `${Math.floor(Math.random() * 500) + 10}万`,
    wordCount: `${Math.floor(Math.random() * 200) + 20}万字`,
    latestChapter: `第${Math.floor(Math.random() * 1000) + 500}章 大结局`,
    score: Number((Math.random() * 5 + 4).toFixed(1)) // 9.2 分
  }));
};

// 模拟排行榜数据
export const RANK_BOOKS = generateBooks(10, '热榜', '连载中');
export const MOCK_BOOKS = [
  ...generateBooks(10, '玄幻', '连载中'),
  ...generateBooks(10, '都市', '已完结'),
];

export const getBook = async (id: string) => MOCK_BOOKS[0]; 
export const getChapter = async (bid: string, cid: string) => ({
  id: cid, bookId: bid, title: `第${cid}章 剧情高潮`, prevId: '100', nextId: '102',
  content: `<p>（标准正文排版）...</p>` 
});
