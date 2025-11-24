import { Book, Chapter } from '@/types';

// 扩展 Book 接口，增加更多字段
export interface BookExtended extends Book {
  tags: string[];
  views: string;
  wordCount: string;
  latestChapter: string;
  score: number;
}

// 模拟生成数据的函数
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
    score: Number((Math.random() * 5 + 4).toFixed(1)) // 随机评分
  }));
};

export const RANK_BOOKS = generateBooks(10, '热榜', '连载中');

export const MOCK_BOOKS: BookExtended[] = [
  ...generateBooks(10, '玄幻', '连载中'),
  ...generateBooks(10, '都市', '已完结'),
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

// 获取单本书
export const getBook = async (id: string) => MOCK_BOOKS[0]; // 无论点哪本，都返回第一本（模拟）

// 获取章节
export const getChapter = async (bid: string, cid: string) => ({ 
    ...MOCK_CHAPTER, 
    id: cid, 
    title: `第${cid}章 模拟章节剧情` 
});
