import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Flame, TrendingUp, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // 🆕 引入刚才写的工具

// 定义数据库返回的数据类型 (根据我们在 Supabase 建的表)
interface BookDB {
  id: string;
  title: string;
  author: string;
  cover_url: string; // 数据库里是下划线命名
  category: string;
  status: string;
  description: string;
  views: string;
  score: number;
}

// 单个书籍组件
const BookCard = ({ book }: { book: BookDB }) => (
  <div className="flex gap-4 p-4 border rounded-lg bg-white hover:shadow-md transition group">
    <Link href={`/n/${book.id}`} className="flex-shrink-0 w-24 h-32 relative overflow-hidden rounded">
      <img src={book.cover_url} className="w-full h-full object-cover group-hover:scale-105 transition" alt={book.title} />
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
         <span>{book.views}人气</span>
         <span className="text-[#d32f2f] font-medium">{book.score}分</span>
      </div>
    </div>
  </div>
);

// 首页组件 (Server Component)
export default async function Home() {
  // 🆕 核心改变：直接从 Supabase 数据库请求数据
  // .from('books') 对应你在 SQL 里建的表名
  // .select('*') 意思是拿所有字段
  const { data: books, error } = await supabase.from('books').select('*');

  if (error) {
    console.error('Error fetching books:', error);
    return <div>加载失败，请检查数据库配置</div>;
  }

  // 此时 books 就是我们在 SQL 里插入的那 3 本书
  // 为了页面好看，如果书太少，我们可以复制几遍撑场面 (实际不用)
  const displayBooks = books && books.length > 0 ? books : [];

  return (
    <div className="min-h-screen bg-[#f4f5f7]">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        
        {/* 顶部提示：证明这是真实数据 */}
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-sm text-center">
          🎉 恭喜！以下数据来自 Supabase 真实数据库！
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧列表 */}
          <div className="lg:col-span-9 space-y-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                    <Flame className="text-[#d32f2f]" size={20} />
                    <h2 className="text-lg font-bold">主编力荐 (数据库版)</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 渲染真实数据 */}
                    {displayBooks.map((book: any) => <BookCard key={book.id} book={book} />)}
                </div>
            </div>
          </div>

          {/* 右侧暂时留空或放静态内容 */}
          <div className="lg:col-span-3 space-y-6">
             <div className="bg-white p-4 rounded text-sm text-gray-500">
               排行榜暂时未连接数据库...
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
