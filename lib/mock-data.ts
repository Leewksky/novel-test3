import { Book, Chapter } from '@/types';

// 扩展 Book 接口
export interface BookExtended extends Book {
  tags: string[];
  views: string;
  wordCount: string;
  latestChapter: string;
  score: number;
}

// 模拟生成书籍数据的辅助函数
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
    score: Number((Math.random() * 5 + 4).toFixed(1))
  }));
};

export const RANK_BOOKS = generateBooks(10, '热榜', '连载中');

export const MOCK_BOOKS: BookExtended[] = [
  ...generateBooks(10, '玄幻', '连载中'),
  ...generateBooks(10, '都市', '已完结'),
  ...generateBooks(4, '言情', '连载中'),
];

// 获取单本书
export const getBook = async (id: string) => MOCK_BOOKS[0]; // 模拟：无论点哪本都返回第一本的数据

// 🆕 核心修复：获取章节 (动态计算 ID)
export const getChapter = async (bid: string, cid: string): Promise<Chapter> => {
  // 1. 把字符串 ID 转换成数字 (例如 "101" -> 101)
  const currentId = parseInt(cid, 10);
  
  // 2. 模拟正文内容
  const content = `
    <p>这是第 <strong>${currentId}</strong> 章的模拟内容。</p>
    <p>在这个章节中，主角林风又遇到了新的挑战。他看着远方的天空，心中暗暗发誓，一定要夺回属于自己的一切。</p>
    <br/>
    <p>“你来了？”一个神秘的声音在身后响起。</p>
    <p>林风猛地回头，发现竟然是多年前失踪的...</p>
    <p>（此处省略三千字精彩剧情）</p>
    <p>欲知后事如何，请点击下一章。</p>
  `;

  return {
    id: cid,
    bookId: bid,
    title: `第${currentId}章 剧情不断升级`,
    content: content,
    
    // 3. 动态计算上一章 (如果当前是第1章/101章，就没有上一章)
    prevId: currentId > 1 ? String(currentId - 1) : null,
    
    // 4. 动态计算下一章 (永远 +1，实现无限翻页)
    nextId: String(currentId + 1), 
  };
};
