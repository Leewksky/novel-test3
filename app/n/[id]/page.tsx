import Link from 'next/link';
import { getBook } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CommentSection from '@/components/CommentSection';
import AddToShelfBtn from '@/components/AddToShelfBtn';
import { BookOpen, List, ChevronRight, Home } from 'lucide-react';

export default async function BookDetail({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) return notFound();

  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      <Navbar />
      <div className="container mx-auto px-4 py-3 text-xs text-gray-500 flex items-center gap-1">
        <Link href="/" className="hover:text-gray-900 flex items-center gap-1"><Home size={12}/> 首页</Link>
        <ChevronRight size={12} />
        <span className="text-gray-900">{book.title}</span>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-8 mb-6">
            <div className="w-40 flex-shrink-0 mx-auto md:mx-0">
               <img src={book.coverUrl} className="w-full rounded shadow-md border" alt={book.title} />
            </div>
            <div className="flex-1">
               <h1 className="text-2xl font-bold text-gray-900 mb-4">{book.title}</h1>
               <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="text-[#d32f2f] bg-red-50 px-2 py-0.5 rounded text-xs border border-red-100">{book.status}</span>
                  <span>{book.author}</span>
                  <span>{book.wordCount}</span>
               </div>
               <p className="text-gray-600 text-sm leading-7 mb-6 border-t border-dashed pt-4">{book.description}</p>
               <div className="flex gap-4">
                  <Link href={`/n/${book.id}/101`} className="bg-[#d32f2f] hover:bg-red-700 text-white px-8 py-2.5 rounded text-sm font-bold transition flex items-center gap-2">
                    <BookOpen size={16} /> 立即阅读
                  </Link>
                  <AddToShelfBtn book={book} />
               </div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
           <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-bold text-gray-800 flex items-center gap-2"><List size={18} className="text-[#d32f2f]"/> 正文目录</h3>
              <span className="text-xs text-gray-500">最新: {book.latestChapter}</span>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {Array.from({length: 30}).map((_, i) => (
                <Link key={i} href={`/n/${book.id}/${101 + i}`} className="text-sm text-gray-600 hover:text-[#d32f2f] py-2 border-b border-dashed truncate block">
                   第{101 + i}章 模拟章节 {i+1}
                </Link>
              ))}
           </div>
        </div>
        <CommentSection />
      </div>
    </div>
  );
}
