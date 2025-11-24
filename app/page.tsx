import Link from 'next/link';
import { MOCK_BOOKS, RANK_BOOKS } from '@/lib/mock-data';
import Navbar from '@/components/Navbar';
import { BookExtended } from '@/lib/mock-data';
import { Flame, TrendingUp } from 'lucide-react';

// 组件：侧边栏排行榜的一行
const RankItem = ({ book, index }: { book: BookExtended, index: number }) => (
  <Link href={`/n/${book.id}`} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition px-2">
    <div className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${index < 3 ? 'bg-[#d32f2f] text-white' : 'bg-gray-200 text-gray-500'}`}>
      {index + 1}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-sm text-gray-800 truncate hover:text-[#d32f2f]">{book.title}</h4>
      <p className="text-xs text-gray-400 truncate">{book.views}人气 · {book.author}</p>
    </div>
  </Link>
);

// 组件：书籍卡片 (更紧凑的信息)
const BookCard = ({ book }: { book: BookExtended }) => (
  <div className="flex gap-4 p-4 border rounded-lg bg-white hover:shadow-md transition group">
    <Link href={`/n/${book.id}`} className="flex-shrink-0 w-24 h-32 relative overflow-hidden rounded">
      <img src={book.coverUrl} className="w-full h-full object-cover group-hover:scale-105 transition" />
      <span className="absolute top-0 right-0 bg-[#d32f2f] text-white text-[10px] px-1">{book.status}</span>
    </Link>
    <div className="flex-1 min-w-0 flex flex-col justify-between">
      <div>
        <Link href={`/n/${book.id}`}>
            <h3 className="font-bold text-gray-900 group-hover:text-[#d32f2f] truncate mb-1">{book.title}</h3>
        </Link>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span className="bg-gray-100 px-1 rounded">{book.category}</span>
            <span>·</span>
            <span>{book.author}</span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{book.description}</p>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
         <span>{book.wordCount}</span>
         <span className="text-[#d32f2f] font-medium">{book.score}分</span>
      </div>
    </div>
  </div>
);

export default function Home() {
  const mainBooks = MOCK_BOOKS.slice(0, 12);

  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 左侧主内容区 (占9份) */}
          <div className="lg:col-span-9 space-y-6">
            {/* 推荐位 */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                    <Flame className="text-[#d32f2f]" size={20} />
                    <h2 className="text-lg font-bold">主编力荐</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mainBooks.map(book => <BookCard key={book.id} book={book} />)}
                </div>
            </div>
          </div>

          {/* 右侧侧边栏 (占3份) */}
          <div className="lg:col-span-3 space-y-6">
            {/* 排行榜 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 p-3 bg-gray-50 border-b border-gray-100">
                    <TrendingUp className="text-[#d32f2f]" size={18} />
                    <h2 className="font-bold text-gray-800">本周点击榜</h2>
                </div>
                <div>
                    {RANK_BOOKS.map((book, i) => <RankItem key={book.id} book={book} index={i} />)}
                </div>
                <Link href="#" className="block text-center text-xs text-gray-500 py-2 hover:bg-gray-50 border-t">
                    查看完整榜单 &gt;
                </Link>
            </div>

            {/* 标签云 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <h2 className="font-bold text-gray-800 mb-3 text-sm">热门标签</h2>
                <div className="flex flex-wrap gap-2">
                    {['系统', '穿越', '甜宠', '校花', '无敌', '末世', '修仙', '直播'].map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-[#d32f2f] hover:text-white cursor-pointer transition">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
