import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CommentSection from '@/components/CommentSection';
import AddToShelfBtn from '@/components/AddToShelfBtn';
import { BookOpen, List, ChevronRight, Home } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function BookDetail({ params }: { params: { id: string } }) {
  // 1. 查书
  const { data: book, error: bookError } = await supabase
    .from('books')
    .select('*')
    .eq('id', params.id)
    .single();

  if (bookError || !book) return notFound();

  // 2. 查所有章节
  const { data: chapters, error: chapterError } = await supabase
    .from('chapters')
    .select('id, title, chapter_number')
    .eq('book_id', params.id)
    .order('chapter_number', { ascending: true }); // 确保按章节号排序

  const firstChapterId = chapters && chapters.length > 0 ? chapters[0].id : null;
  const latestChapter = chapters && chapters.length > 0 ? chapters[chapters.length - 1].title : '暂无章节';

  // 模拟一些扩展数据
  const bookData = {
    ...book,
    tags: book.category ? [book.category] : [],
    coverUrl: book.cover_url,
    wordCount: '连载中',
    lastUpdated: new Date(book.created_at).toLocaleDateString(),
    latestChapter: latestChapter
  };

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
               <img src={book.cover_url || 'https://placehold.co/200x300'} className="w-full rounded shadow-md border" alt={book.title} />
            </div>
            <div className="flex-1">
               <h1 className="text-2xl font-bold text-gray-900 mb-4">{book.title}</h1>
               <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="text-[#d32f2f] bg-red-50 px-2 py-0.5 rounded text-xs border border-red-100">{book.status}</span>
                  <span>{book.author}</span>
                  <span>{book.category}</span>
               </div>
               <p className="text-gray-600 text-sm leading-7 mb-6 border-t border-dashed pt-4">{book.description}</p>
               <div className="flex gap-4">
                  {firstChapterId ? (
                    <Link href={`/n/${book.id}/${firstChapterId}`} className="bg-[#d32f2f] hover:bg-red-700 text-white px-8 py-2.5 rounded text-sm font-bold transition flex items-center gap-2">
                        <BookOpen size={16} /> 立即阅读
                    </Link>
                  ) : (
                    <button disabled className="bg-gray-300 text-white px-8 py-2.5 rounded text-sm font-bold cursor-not-allowed">暂无章节</button>
                  )}
                  <AddToShelfBtn book={bookData as any} />
               </div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
           <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <List size={18} className="text-[#d32f2f]"/> 正文目录
              </h3>
              <span className="text-xs text-gray-500">共 {chapters?.length || 0} 章</span>
           </div>
           
           {/* 渲染真实目录列表 */}
           {chapters && chapters.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-0">
                  {chapters.map((chapter) => (
                    <Link 
                       key={chapter.id} 
                       href={`/n/${book.id}/${chapter.id}`} 
                       className="text-sm text-gray-600 hover:text-[#d32f2f] hover:bg-gray-50 py-3 border-b border-gray-100 truncate block pl-2"
                    >
                       {chapter.title}
                    </Link>
                  ))}
               </div>
           ) : (
               <div className="text-center py-10 text-gray-400">暂无章节数据</div>
           )}
        </div>
        <CommentSection />
      </div>
    </div>
  );
}
