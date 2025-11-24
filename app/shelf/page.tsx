'use client';
import Navbar from '@/components/Navbar';
import { useUserStore } from '@/store/useUserStore';
import Link from 'next/link';
import { Trash2, Clock } from 'lucide-react';

export default function ShelfPage() {
  const { shelf, history, removeFromShelf, isLoggedIn } = useUserStore();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f4f5f7]">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-20">
           <h2 className="text-xl font-bold mb-4">请先登录</h2>
           <p className="text-gray-500">登录后即可同步您的书架和阅读进度</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-l-4 border-[#d32f2f] pl-3">
             我的收藏 <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 rounded-full">{shelf.length}</span>
          </h2>
          {shelf.length === 0 ? (
            <p className="text-gray-400 py-8 text-center">书架空空如也，快去挑几本吧~</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shelf.map(book => (
                <div key={book.id} className="flex gap-4 p-3 border rounded-lg hover:shadow-md transition bg-white relative group">
                   <Link href={`/n/${book.id}`} className="w-20 h-28 flex-shrink-0">
                      <img src={book.coverUrl} className="w-full h-full object-cover rounded shadow" alt={book.title} />
                   </Link>
                   <div className="flex-1 min-w-0">
                      <Link href={`/n/${book.id}`}><h3 className="font-bold truncate mb-1">{book.title}</h3></Link>
                      <p className="text-xs text-gray-500 mb-2">读至: 第101章</p>
                      <p className="text-xs text-[#d32f2f] bg-red-50 inline-block px-1.5 rounded">有新章节</p>
                   </div>
                   <button onClick={() => removeFromShelf(book.id)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
           <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-l-4 border-gray-400 pl-3"><Clock size={20} /> 最近阅读</h2>
           <div className="space-y-4">
            {history.map(book => (
               <Link key={book.id} href={`/n/${book.id}`} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded border-b border-dashed">
                  <span className="font-medium text-gray-700">{book.title}</span>
                  <span className="text-xs text-gray-400">2分钟前</span>
               </Link>
            ))}
            {history.length === 0 && <p className="text-gray-400 text-center">暂无历史记录</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
