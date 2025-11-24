'use client';

import { useEffect, useState } from 'react';
import { useReaderStore } from '@/store/useReaderStore';
import { Chapter } from '@/types';
import { ArrowLeft, Menu, Type, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 🆕 用于页面跳转
import { useSwipeable } from 'react-swipeable'; // 🆕 手势库
import { cn } from '@/lib/utils';

// 主题样式映射
const themeStyles = {
  light: 'bg-white text-gray-900',
  sepia: 'bg-[#f4ecd8] text-[#5b4636]',
  dark: 'bg-[#1a1a1a] text-[#b0b0b0]',
  green: 'bg-[#e3edcd] text-[#333333]',
};

// 字体映射表
const fontOptions = [
  { label: '系统', value: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' },
  { label: '宋体', value: '"Songti SC", "STSong", "SimSun", "Hany Wenhei", serif' },
  { label: '楷体', value: '"KaiTi", "STKaiti", "BiauKai", serif' },
];

export default function ReaderContent({ chapter }: { chapter: Chapter }) {
  const router = useRouter();
  const { theme, fontSize, fontFamily, setTheme, setFontSize, setFontFamily } = useReaderStore();
  
  const [showMenu, setShowMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // 🔄 核心跳转逻辑
  const handlePrev = () => {
    if (chapter.prevId) {
      router.push(`/n/${chapter.bookId}/${chapter.prevId}`);
    } else {
      alert('已经是第一章了'); // 简单提示，实际项目可以用 Toast 组件
    }
  };

  const handleNext = () => {
    if (chapter.nextId) {
      router.push(`/n/${chapter.bookId}/${chapter.nextId}`);
    } else {
      alert('已经是最后一章了，请等待作者更新');
    }
  };

  // ⌨️ 键盘事件监听 (PC端体验优化)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [chapter]); // 依赖 chapter，确保获取到最新的 ID

  // 👆 手势配置 (手机端体验优化)
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),  // 左滑 -> 下一章
    onSwipedRight: () => handlePrev(), // 右滑 -> 上一章
    preventScrollOnSwipe: true,        // 滑动时阻止滚动，防止冲突
    trackMouse: false                  // 只在触摸屏生效，鼠标不触发
  });

  if (!mounted) return <div className="min-h-screen bg-white"></div>;

  return (
    // 把 swipeHandlers 绑定在最外层 div，这样整个屏幕都能感应手势
    <div 
      {...swipeHandlers} 
      className={cn("min-h-screen transition-colors duration-300 outline-none", themeStyles[theme])}
    >
      
      {/* 顶部控制栏 */}
      <div className={cn(
        "fixed top-0 left-0 right-0 h-14 bg-black/90 text-white flex items-center justify-between px-4 transition-transform duration-300 z-50",
        showMenu ? "translate-y-0" : "-translate-y-full"
      )}>
        <Link href={`/n/${chapter.bookId}`} className="hover:text-gray-300"><ArrowLeft /></Link>
        <span className="text-sm truncate w-1/2 text-center font-medium">{chapter.title}</span>
        <button className="hover:text-gray-300"><Menu /></button>
      </div>

      {/* 正文点击区域 */}
      <div 
        onClick={() => setShowMenu(!showMenu)}
        className="max-w-3xl mx-auto px-4 py-16 min-h-screen cursor-pointer select-none" // select-none 防止点击翻页时误选文字
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.8, fontFamily: fontFamily }}
      >
        <h1 className="text-2xl font-bold mb-8 mt-4">{chapter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
        
        {/* 文末大按钮 (方便用户看完直接点) */}
        <div className="mt-12 mb-8 grid grid-cols-2 gap-4 md:hidden">
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }} 
              disabled={!chapter.prevId}
              className="py-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              上一章
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }} 
              disabled={!chapter.nextId}
              className="py-3 bg-[#d32f2f] text-white rounded-lg text-sm font-medium disabled:bg-gray-300"
            >
              下一章
            </button>
        </div>
      </div>

      {/* 底部设置栏 */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 bg-black/90 text-white px-6 py-6 transition-transform duration-300 z-50 space-y-6 rounded-t-xl",
        showMenu ? "translate-y-0" : "translate-y-full"
      )}>
        
        {/* 字号控制 */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 flex items-center gap-2"><Type size={16}/> 字号</span>
          <div className="flex items-center gap-6">
             <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="border border-gray-600 w-10 h-8 rounded hover:bg-gray-700">-</button>
             <span className="w-8 text-center font-bold">{fontSize}</span>
             <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="border border-gray-600 w-10 h-8 rounded hover:bg-gray-700">+</button>
          </div>
        </div>

        {/* 字体选择 */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">字体</span>
          <div className="flex gap-2">
             {fontOptions.map(option => (
               <button 
                 key={option.label} 
                 onClick={() => setFontFamily(option.value)}
                 className={cn(
                   "px-3 py-1 border rounded text-xs transition",
                   fontFamily === option.value ? "bg-white text-black border-white" : "border-gray-600 hover:border-white hover:bg-white/10"
                 )}
               >
                 {option.label}
               </button>
             ))}
          </div>
        </div>

        {/* 主题控制 */}
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
                  theme === t ? "border-blue-500 ring-blue-500/50 scale-110" : "border-transparent ring-transparent opacity-80"
                )}
              />
            ))}
          </div>
        </div>
        
        {/* 底部翻页控制条 */}
        <div className="flex justify-between pt-4 border-t border-gray-800 gap-4">
          <button 
            onClick={handlePrev} 
            disabled={!chapter.prevId}
            className="flex-1 flex items-center justify-center gap-1 text-sm text-gray-300 hover:text-white px-4 py-3 hover:bg-gray-800 rounded transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} /> 上一章
          </button>
          <button 
            onClick={handleNext} 
            disabled={!chapter.nextId}
            className="flex-1 flex items-center justify-center gap-1 text-sm text-gray-300 hover:text-white px-4 py-3 hover:bg-gray-800 rounded transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            下一章 <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
