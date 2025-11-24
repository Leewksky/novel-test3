export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  category: string;
  status: '连载中' | '已完结';
  description: string;
  lastUpdated: string;
}

export interface Chapter {
  id: string;
  bookId: string;
  title: string;
  content: string;
  prevId: string | null;
  nextId: string | null;
}