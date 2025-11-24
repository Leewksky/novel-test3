'use client';
import Link from 'next/link';
import { Search, User, Menu, Book } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { isLoggedIn, userInfo, logout } = useUserStore();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="bg-[#d32f2f] h-1 w-full"></div>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-black text-[#d32f2f] tracking-tighter">
              CZBOOKS<span className="text-black font-normal text-sm ml-1">Lite</span>
            </Link>

            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 mx-6">
              <Link href="#" className="hover:text-[#d32f2f]">全本排行</Link>
              <Link href="#" className="hover:text-[#d32f2f]">连载排行</Link>
              <Link href="#" className="hover:text-[#d32f2f]">玄幻奇幻</Link>
            </nav>

            <div className="flex items-center gap-4">
              {isLoggedIn && (
                <Link href="/shelf" className="hidden md:flex items-center gap-1 text-gray-600 hover:text-[#d32f2f]">
                   <Book size={18} /> 书架
                </Link>
              )}

              {isLoggedIn ? (
                <div className="flex items-center gap-3 cursor-pointer group relative">
                   <img src={userInfo?.avatar} className="w-8 h-8 rounded-full border border-gray-200" alt="avatar" />
                   <div className="absolute top-full right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border py-2 hidden group-hover:block">
                      <button onClick={() => logout()} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600">退出登录</button>
                   </div>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-1 bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-700 transition"
                >
                  <User size={16} /> 登录
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      {showLogin && <AuthModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
