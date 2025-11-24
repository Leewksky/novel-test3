import Link from 'next/link';
import { getBook } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { BookOpen, Clock, List } from 'lucide-react';

export default async function BookDetail({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) return notFound();

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar />
      
      {/* 头部背景模糊效果 */}
      <div className="relative bg-gray-900 text-white pb-12 pt-12">
        <div className="absolute inset-0 overflow-hidden opacity-30">
            <img src={book.coverUrl} className="w-full h-full object-cover blur-3xl scale-110" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 封面 */}
            <div className="w-36 md:w-48 flex-shrink-0 mx-auto md:mx-0 shadow-2xl rounded-lg overflow-hidden border-2 border-white/20">
               <img src={book.coverUrl} className="w-full h-full object-cover" />
            </div>
            
            {/* 信息 */}
            <div className="flex-1 text-center md:text-left">
               <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
               <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-300 mb-4">
                  <span>{book.author}</span>
                  <span className="w-px h-4 bg-gray-600"></span>
                  <span>{book.category}</span>
                  <span className="w-px h-4 bg-gray-600"></span>
                  <span className="text-green-400">{book.status}</span>
               </div>
               
               <p className="text-sm text-gray-300 mb-6 leading-relaxed max-w-2xl hidden md:block">
                 {book.description}
               </p>

               <div className="flex gap-4 justify-center md:justify-start">
                  <Link 
                    href={`/n/${book.id}/101`} 
                    className="flex items-center gap-2 bg-[#d32f2f] hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition shadow-lg shadow-red-900/50"
                  >
                    <BookOpen size={18} /> 开始阅读
                  </Link>
                  <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition backdrop-blur-sm border border-white/10">
                    加入书架
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-6 relative z-20">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
           <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <List className="text-[#d32f2f]" size={20}/> 目录列表
              </h3>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock size={12}/> 最后更新: {book.lastUpdated}
              </span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {/* 生成假目录: 50章 */}
              {Array.from({length: 50}).map((_, i) => (
                <Link 
                   key={i} 
                   href={`/n/${book.id}/${101 + i}`} 
                   className="text-sm text-gray-600 hover:text-[#d32f2f] hover:bg-gray-50 p-2 rounded truncate transition border-b border-gray-100 border-dashed"
                >
                   第{101 + i}章 模拟章节标题 {i+1}
                </Link>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
