import { Book, Chapter } from '@/types';

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: '全职高手',
    author: '蝴蝶蓝',
    coverUrl: 'https://placehold.co/200x300/333/FFF?text=Full+Time+Master',
    category: '网游竞技',
    status: '已完结',
    description: '网游荣耀中被誉为教科书级别的顶尖高手...',
    lastUpdated: '2023-10-01',
  },
  {
    id: '2',
    title: '诡秘之主',
    author: '爱潜水的乌贼',
    coverUrl: 'https://placehold.co/200x300/550000/FFF?text=Lord+of+Mysteries',
    category: '玄幻',
    status: '已完结',
    description: '周明瑞莫名其妙穿越到了一个蒸汽与机械的世界...',
    lastUpdated: '2023-11-15',
  }
];

export const MOCK_CHAPTER: Chapter = {
  id: '101',
  bookId: '1',
  title: '第一章 被驱逐的高手',
  content: `
    <p>“卡卡卡……”</p>
    <p>一双修长洁白的手指，飞快地在键盘上跳跃着，键盘敲击声连成一片。</p>
    <p>这是荣耀职业联盟的顶尖高手叶修...</p>
    <p>（此处为模拟内容，实际开发请对接后端 API）</p>
    <p>叶修回过头，看着窗外的雪花，心中没有任何波澜。</p>
    <p>“休息一年，然后回来。”苏沐橙说。</p>
  `,
  prevId: null,
  nextId: '102',
};

export const getBook = async (id: string) => MOCK_BOOKS.find(b => b.id === id);
export const getChapter = async (bid: string, cid: string) => ({
    ...MOCK_CHAPTER, 
    id: cid, 
    title: cid === '101' ? '第一章 被驱逐的高手' : `第${cid}章 模拟章节` 
});