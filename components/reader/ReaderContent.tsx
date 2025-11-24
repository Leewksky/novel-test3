'use client';
import { useEffect, useState } from 'react';
import { useReaderStore } from '@/store/useReaderStore';
import { Chapter } from '@/types';
import { ArrowLeft, Menu } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const themeStyles = {
  light: 'bg-white text-gray-900',
  sepia: 'bg-[#f4ecd8] text-[#5b4636]',
  dark: 'bg-[#1a1a1a] text-[#b0b0b0]',
  green: 'bg-[#e3edcd] text-[#333333]',
};

export default function ReaderContent({ chapter }: { chapter: Chapter }) {
  const { theme, fontSize, setTheme, setFontSize } = useReaderStore();
  const [showMenu, setShowMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className={cn("min-h-screen transition-colors duration-300", themeStyles[theme])}>
      {/* Header */}
      <div className={cn(
        "fixed top-0 left-0 right-0 h-14 bg-black/80 text-white flex items-center justify-between px-4 transition-transform z-50",
        showMenu ? "translate-y-0" : "-translate-y-full"
      )}>
        <Link href={`/n/${chapter.bookId}`}><ArrowLeft /></Link>
        <span className="text-sm truncate w-1/2 text-center">{chapter.title}</span>
        <button><Menu /></button>
      </div>

      {/* Content */}
      <div 
        onClick={() => setShowMenu(!showMenu)}
        className="max-w-3xl mx-auto px-4 py-12 min-h-screen cursor-pointer"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
      >
        <h1 className="text-2xl font-bold mb-8 mt-4">{chapter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
      </div>

      {/* Footer Settings */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 bg-black/90 text-white p-6 transition-transform z-50 space-y-6",
        showMenu ? "translate-y-0" : "translate-y-full"
      )}>
        <div className="flex items-center justify-between">
          <span className="text-sm">字号</span>
          <div className="flex items-center gap-4">
             <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="border px-3 rounded">-</button>
             <span>{fontSize}</span>
             <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="border px-3 rounded">+</button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">主题</span>
          <div className="flex gap-3">
            {(['light', 'sepia', 'green', 'dark']).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t as any)}
                className={cn("w-8 h-8 rounded-full border-2", themeStyles[t as keyof typeof themeStyles], theme === t ? "border-blue-500" : "border-transparent")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
<div className="flex items-center justify-between">
  <span className="text-sm">字体</span>
  <div className="flex gap-2">
     {['系统', '宋体', '楷体'].map(font => (
       <button key={font} className="px-3 py-1 border border-gray-600 rounded text-xs hover:border-white transition">
         {font}
       </button>
     ))}
  </div>
</div>
