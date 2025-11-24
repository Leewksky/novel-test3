import Link from 'next/link';
import { Search, User, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* 顶部红色品牌条 */}
      <div className="bg-[#d32f2f] h-1 w-full"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo 区 */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-black text-[#d32f2f] tracking-tighter">
              CZBOOKS<span className="text-black font-normal text-sm ml-1">复刻版</span>
            </Link>
            
            {/* 桌面端导航 */}
            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
              <Link href="#" className="hover:text-[#d32f2f] transition">全本排行</Link>
              <Link href="#" className="hover:text-[#d32f2f] transition">连载排行</Link>
              <Link href="#" className="hover:text-[#d32f2f] transition">玄幻奇幻</Link>
              <Link href="#" className="hover:text-[#d32f2f] transition">都市言情</Link>
            </nav>
          </div>

          {/* 搜索与用户 */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex relative">
              <input 
                type="text" 
                placeholder="搜索书名/作者" 
                className="bg-gray-100 border-none rounded-full px-4 py-1.5 text-sm w-48 focus:w-64 transition-all focus:ring-1 focus:ring-[#d32f2f] outline-none"
              />
              <Search className="w-4 h-4 absolute right-3 top-2 text-gray-400" />
            </div>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <User className="w-6 h-6" />
            </button>
            <button className="md:hidden p-2 text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
