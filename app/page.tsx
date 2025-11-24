import Link from 'next/link';
import { MOCK_BOOKS } from '@/lib/mock-data';
import Navbar from '@/components/Navbar';
import { Book } from '@/types';

// 单个书籍组件 (Atomic Component)
const BookCard = ({ book }: { book: Book }) => (
  <Link href={`/n/${book.id}`} className="group block">
    <div className="relative aspect-[3/4] overflow-hidden rounded shadow-sm border border-gray-100 bg-gray-50 mb-2">
      <img 
        src={book.coverUrl} 
        alt={book.title} 
        className="object-cover w-full h-full group-hover:scale-105 transition duration-300 ease-in-out" 
      />
      {/* 状态标签 */}
      <div className="absolute top-0 right-0 bg-[#d32f2f] text-white text-[10px] px-1.5 py-0.5 rounded-bl">
        {book.status}
      </div>
    </div>
    <h3 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-[#d32f2f] transition">
      {book.title}
    </h3>
    <p className="text-xs text-gray-400 mt-1 flex items-center justify-between">
      <span className="truncate max-w-[60%]">{book.author}</span>
      <span className="bg-gray-100 px-1 rounded text-gray-500">{book.category}</span>
    </p>
  </Link>
);

// 栏目容器
const Section = ({ title, books }: { title: string, books: Book[] }) => (
  <section className="mb-10">
    <div className="flex items-center justify-between mb-4 border-l-4 border-[#d32f2f] pl-3">
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <Link href="#" className="text-xs text-gray-500 hover:text-[#d32f2f]">查看更多 &gt;</Link>
    </div>
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
      {books.map(book => <BookCard key={book.id} book={book} />)}
    </div>
  </section>
);

export default function Home() {
  const fantasyBooks = MOCK_BOOKS.filter(b => b.category === '玄幻');
  const cityBooks = MOCK_BOOKS.filter(b => b.category === '都市');
  
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* 顶部公告/推荐区 (模拟) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 text-white flex flex-col justify-center">
                <span className="text-[#d32f2f] font-bold mb-2">本周强推</span>
                <h1 className="text-3xl font-bold mb-2">诡秘之主：序列的终结</h1>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">沉睡的愚者已经苏醒，旧日的支配者正在窥视...</p>
                <button className="bg-[#d32f2f] w-fit px-6 py-2 rounded text-sm font-bold hover:bg-red-700 transition">立即阅读</button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="font-bold border-b pb-2 mb-2 text-sm">快讯</h3>
                <ul className="text-sm space-y-2 text-gray-600">
                    <li className="truncate">🔥 <span className="text-[#d32f2f]">[公告]</span> 系统维护升级通知</li>
                    <li className="truncate">📚 <span className="text-blue-600">[上新]</span> 天蚕土豆新书发布</li>
                    <li className="truncate">🏆 <span className="text-yellow-600">[排行]</span> 2024年玄幻月票榜单</li>
                </ul>
            </div>
        </div>

        {/* 分类展示区 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <Section title="玄幻奇幻 · 热门连载" books={fantasyBooks} />
          <div className="h-px bg-gray-100 my-8"></div>
          <Section title="都市异能 · 完本精选" books={cityBooks} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-8 text-center text-gray-500 text-sm">
        <p>© 2024 LiteRead Novel Platform. All rights reserved.</p>
        <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-gray-800">关于我们</a>
            <a href="#" className="hover:text-gray-800">联系方式</a>
            <a href="#" className="hover:text-gray-800">免责声明</a>
        </div>
      </footer>
    </div>
  );
}
