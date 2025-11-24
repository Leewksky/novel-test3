import Link from 'next/link';
import { getBook } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CommentSection from '@/components/CommentSection'; // 🆕 引入评论区
import AddToShelfBtn from '@/components/AddToShelfBtn';   // 🆕 引入加入书架按钮
import { BookOpen, List, ChevronRight, Home } from 'lucide-react';

export default async function BookDetail({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) return notFound();

  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      <Navbar />
      
      {/* 面包屑导航 */}
      <div className="container mx-auto px-4 py-3 text-xs text-gray-500 flex items-center gap-1">
        <Link href="/" className="hover:text-gray-900 flex items-center gap-1"><Home size={12}/> 首页</Link>
        <ChevronRight size={12} />
        <Link href="#" className="hover:text-gray-900">{book.category}</Link>
        <ChevronRight size={12} />
        <span className="text-gray-900">{book.title}</span>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* 书籍信息卡片 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-8 mb-6">
            <div className="w-40 flex-shrink-0 mx-auto md:mx-0">
               <img src={book.coverUrl} className="w-full rounded shadow-md border" alt={book.title} />
            </div>
            
            <div className="flex-1">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                   <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
                   <div className="flex items-center gap-4 text-center">
                       <div>
                           <div className="text-lg font-bold text-[#d32f2f]">{book.score}</div>
                           <div className="text-xs text-gray-400">评分</div>
                       </div>
                       <div className="w-px h-8 bg-gray-100"></div>
                       <div>
                           <div className="text-lg font-bold text-gray-800">{book.views}</div>
                           <div className="text-xs text-gray-400">热度</div>
                       </div>
                   </div>
               </div>
               
               <p className="text-sm text-gray-500 mb-4 flex items-center gap-4 flex-wrap">
                  <span className="text-[#d32f2f] bg-red-50 px-2 py-0.5 rounded text-xs border border-red-100">{book.status}</span>
                  <span>作者：<span className="text-gray-800">{book.author}</span></span>
                  <span>字数：{book.wordCount}</span>
                  <span>更新：{book.lastUpdated}</span>
               </p>

               {/* 标签 */}
               <div className="flex gap-2 mb-4 flex-wrap">
                  {book.tags?.map((tag: string) => (
                      <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">#{tag}</span>
                  ))}
               </div>
