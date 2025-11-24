'use client';

import { useEffect, useState } from 'react';
import { useReaderStore } from '@/store/useReaderStore';
import { Chapter } from '@/types';
import { ArrowLeft, Menu, Settings, Type } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// 主题样式映射
const themeStyles = {
  light: 'bg-white text-gray-900',
  sepia: 'bg-[#f4ecd8] text-[#5b4636]',
  dark: 'bg-[#1a1a1a] text-[#b0b0b0]',
  green: 'bg-[#e3edcd] text-[#333333]',
};

export default function ReaderContent({ chapter }: { chapter: Chapter }) {
  // 从 Store 获取设置
  const { theme, fontSize, setTheme, setFontSize } = useReaderStore();
  
  const [showMenu, setShowMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 避免服务端渲染和客户端状态不一致导致的 Hydration Error
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-white"></div>;

  return (
    <div className={cn("min-h-screen transition-colors duration-300", themeStyles[theme])}>
      
      {/* 顶部控制栏 (点击屏幕中间出现) */}
      <div className={cn(
        "fixed top-0 left-0 right-0 h-14 bg-black/90 text-white flex items-center justify-between px-4 transition-transform duration-300 z-50",
        showMenu ? "translate-y-0" : "-translate-y-full"
      )}>
        <Link href={`/n/${chapter.bookId}`} className="hover:text-gray-300"><ArrowLeft /></Link>
        <span className="text-sm truncate w-1/2 text-center font-medium">{chapter.title}</span>
        <button className="hover:text-gray-300"><Menu /></button>
      </div>

      {/* 正文点击区域 (点击切换菜单显示状态) */}
      <div 
        onClick={() => setShowMenu(!showMenu)}
        className="max-w-3xl mx-auto px-4 py-16 min-h-screen cursor-pointer"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
      >
        <h1 className="text-2xl font-bold mb-8 mt-4">{chapter.title}</h1>
        {/* 渲染 HTML 内容 */}
        <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
      </div>

      {/* 底部设置栏 (点击屏幕中间出现) */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 bg-black/90 text-white px-6 py-6 transition-transform duration-300 z-50 space-y-6 rounded-t-xl",
        showMenu ? "translate-y-0" : "translate-y-full"
      )}>
        
        {/* 1. 字号控制 */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 flex items-center gap-2"><Type size={16}/> 字号</span>
          <div className="flex items-center gap-6">
             <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="border border-gray-600 w-10 h-8 rounded hover:bg-gray-700 active:scale-95 transition">-</button>
             <span className="w-8 text-center font-bold">{fontSize}</span>
             <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="border border-gray-600 w-10 h-8 rounded hover:bg-gray-700 active:scale-95 transition">+</button>
          </div>
        </div>

        {/* 2. 字体选择 (UI演示，实际功能需扩展Store) */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">字体</span>
          <div className="flex gap-2">
             {['系统', '宋体', '楷体'].map(font => (
               <button key={font} className="px-3 py-1 border border-gray-600 rounded text-xs hover:border-white hover:bg-white/10 transition">
                 {font}
               </button>
             ))}
          </div>
        </div>

        {/* 3. 主题控制 */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">主题</span>
          <div className="flex gap-3">
            {(['light', 'sepia', 'green', 'dark'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={cn(
                  "w-8 h-8 rounded-full border-2 ring-2 ring-offset-2 ring-offset-black transition-all",
                  themeStyles[t],
                  theme === t ? "border-blue-500 ring-blue-500/50 scale-110" : "border-transparent ring-transparent opacity-80 hover:opacity-100"
                )}
              />
            ))}
          </div>
        </div>
        
        {/* 4. 翻页导航 */}
        <div className="flex justify-between pt-4 border-t border-gray-800">
          <button className="text-sm text-gray-300 hover:text-white px-4 py-2 hover:bg-gray-800 rounded transition">上一章</button>
          <button className="text-sm text-gray-300 hover:text-white px-4 py-2 hover:bg-gray-800 rounded transition">下一章</button>
        </div>
      </div>
    </div>
  );
}
