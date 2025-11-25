import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CommentSection from '@/components/CommentSection';
import AddToShelfBtn from '@/components/AddToShelfBtn'; // 注意：这个组件目前还是存本地缓存，暂时不动它
import { BookOpen, List, ChevronRight, Home } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// 强制动态渲染 (因为数据随时会变，不能缓存)
export const dynamic = 'force-dynamic';

export default async function BookDetail({ params }: { params: { id: string } }) {
  // 1. 从数据库获取书籍详情
  const { data: book, error: bookError } = await supabase
    .from('books')
    .select('*')
    .eq('id', params.id)
    .single();

  if (bookError || !book) {
    return notFound();
  }

  // 2. 从数据库获取这本书的章节列表 (只取 ID、标题、章节号，按顺序排)
  const { data: chapters, error: chapterError } = await supabase
    .from('chapters')
    .select('id, title, chapter_number')
    .eq('book_id', params.id)
    .order('chapter_number', { ascending: true });

  // 找到第一章的 ID (为了"开始阅读"按钮)
  const firstChapterId = chapters && chapters.length > 0 ? chapters[0].id : null;
  const latestChapter = chapters && chapters.length > 0 ? chapters[chapters.length - 1].title : '暂无章节';

  // 转换一下数据格式以适配组件 (处理一下 tag 是 null 的情况)
  const bookData = {
    ...book,
    tags: book.category ? [book.category] : [], // 暂时用分类当标签
    coverUrl: book.cover_url, // 数据库是下划线，组件可能用驼峰，这里做个转换
    wordCount: '未知', // 数据库没存这个，先写死
    lastUpdated: new Date(book.created_at).toLocaleDateString(),
    latestChapter: latestChapter
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      <Navbar />
      
      {/* 面包屑 */}
      <div className="container mx-auto px-4 py-3 text-xs text-gray-500 flex items-center gap-1">
        <Link href="/" className="hover:text-gray-900 flex items-center gap-1"><Home size={12}/> 首页</Link>
        <ChevronRight size={12} />
        <span className="text-gray-900">{book.title}</span>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* 书籍信息卡片 */}
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
               <p className="text-gray-600 text-sm leading-7 mb-6 border-t border-dashed pt-4">
                 {book.description}
               </p>

               <div className="flex gap-4">
                  {firstChapterId ? (
                    <Link 
                        href={`/n/${book.id}/${firstChapterId}`} 
                        className="bg-[#d32f2f] hover:bg-red-700 text-white px-8 py-2.5 rounded text-sm font-bold transition flex items-center gap-2"
                    >
                        <BookOpen size={16} /> 立即阅读
                    </Link>
                  ) : (
                    <button disabled className="bg-gray-300 text-white px-8 py-2.5 rounded text-sm font-bold cursor-not-allowed">暂无章节</button>
                  )}
                  {/* 这里为了不报错，临时把 bookData 传进去，虽然 AddToShelfBtn 还在用旧类型，但通常兼容 */}
                  <AddToShelfBtn book={bookData as any} />
               </div>
            </div>
        </div>

        {/* 章节列表 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
           <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <List size={18} className="text-[#d32f2f]"/> 正文目录
              </h3>
              <span className="text-xs text-gray-500">共 {chapters?.length || 0} 章</span>
           </div>
           
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
               <div className="text-center py-10 text-gray-400">作者正在努力码字中...</div>
           )}
        </div>

        <CommentSection />
      </div>
    </div>
  );
}
