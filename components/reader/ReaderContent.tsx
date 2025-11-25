'use client';

import { useEffect, useState } from 'react';
import { useReaderStore } from '@/store/useReaderStore';
import { Chapter } from '@/types';
import { ArrowLeft, Menu, Type, ChevronLeft, ChevronRight, X, List } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';

const themeStyles = {
  light: 'bg-white text-gray-900',
  sepia: 'bg-[#f4ecd8] text-[#5b4636]',
  dark: 'bg-[#1a1a1a] text-[#b0b0b0]',
  green: 'bg-[#e3edcd] text-[#333333]',
};

const fontOptions = [
  { label: '系统', value: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' },
  { label: '宋体', value: '"Songti SC", "STSong", "SimSun", "Hany Wenhei", serif' },
  { label: '楷体', value: '"KaiTi", "STKaiti", "BiauKai", serif' },
];

interface TocItem {
  id: string;
  title: string;
}

// 🛡️ 修改点1：给 toc 一个默认值 []，防止 undefined 报错
export default function ReaderContent({ chapter, toc = [] }: { chapter: Chapter; toc?: TocItem[] }) {
  const router = useRouter();
  const { theme, fontSize, fontFamily, setTheme, setFontSize, setFontFamily } = useReaderStore();
  
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handlePrev = () => {
    if (chapter?.prevId) router.push(`/n/${chapter.bookId}/${chapter.prevId}`);
    else alert('已经是第一章了');
  };

  const handleNext = () => {
    if (chapter?.nextId) router.push(`/n/${chapter.bookId}/${chapter.nextId}`);
    else alert('已经是最后一章了');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [chapter]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: false
  });

  if (!mounted) return <div className="min-h-screen bg-white"></div>;
  
  // 🛡️ 修改点2：如果数据严重缺失，显示错误提示而不是崩掉
  if (!chapter) return <div className="p-10 text-center">章节加载错误，请刷新重试</div>;

  return (
    <div 
      {...swipeHandlers} 
      className={cn("min-h-screen transition-colors duration-300 outline-none overflow-hidden", themeStyles[theme])}
    >
      {/* 顶部控制栏 */}
      <div className={cn(
        "fixed top-0 left-0 right-0 h-14 bg-black/90 text-white flex items-center justify-between px-4 transition-transform duration-300 z-50",
        showMenu ? "translate-y-0" : "-translate-y-full"
      )}>
        <Link href={`/n/${chapter.bookId}`} className="hover:text-gray-300"><ArrowLeft /></Link>
        <span className="text-sm truncate w-1/2 text-center font-medium">{chapter.title}</span>
        <button onClick={() => setShowSidebar(true)} className="hover:text-gray-300 p-2"><Menu /></button>
      </div>

      {/* 右侧目录侧边栏 */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black/60 z-[60] transition-opacity" onClick={() => setShowSidebar(false)} />
      )}
      
      <div className={cn(
        "fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white text-gray-900 z-[70] transition-transform duration-300 shadow-2xl flex flex-col",
        showSidebar ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b">
            {/* 🛡️ 修改点3：显示目录数量时增加安全检查 */}
            <h3 className="font-bold text-lg flex items-center gap-2"><List size={18}/> 目录 ({toc?.length || 0})</h3>
            <button onClick={() => setShowSidebar(false)} className="text-gray-500 hover:text-black"><X size={24} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
            {/* 🛡️ 修改点4：使用可选链 ?. 确保 toc 存在才遍历 */}
            {toc?.length > 0 ? toc.map((item) => {
                const isCurrent = item.id === chapter.id;
                return (
                    <div 
                        key={item.id}
                        onClick={() => {
                            router.push(`/n/${chapter.bookId}/${item.id}`);
                            setShowSidebar(false); 
                            setShowMenu(false);    
                        }}
                        className={cn(
                            "p-3 border-b border-dashed cursor-pointer text-sm truncate rounded transition-colors",
                            isCurrent 
                                ? "text-[#d32f2f] bg-red-50 font-bold border-red-100" 
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                    >
                        {item.title}
                        {isCurrent && <span className="float-right text-xs bg-[#d32f2f] text-white px-1.5 rounded">当前</span>}
                    </div>
                );
            }) : (
              <div className="p-4 text-gray-400 text-center text-sm">暂无目录数据</div>
            )}
        </div>
      </div>

      {/* 正文区域 */}
      <div 
        onClick={() => setShowMenu(!showMenu)}
        className="max-w-3xl mx-auto px-4 py-16 min-h-screen cursor-pointer select-none overflow-y-auto"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.8, fontFamily: fontFamily }}
      >
        <h1 className="text-2xl font-bold mb-8 mt-4">{chapter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
        
        <div className="mt-12 mb-8 grid grid-cols-2 gap-4 md:hidden">
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }} 
              disabled={!chapter.prevId}
              className="py-3 bg-gray-100 dark:bg-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium disabled:opacity-50"
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
        {/* 设置内容保持不变... */}
         <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400 flex items-center gap-2"><Type size={16}/> 字号</span>
          <div className="flex items-center gap-6">
             <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="border border-gray-600 w-10 h-8 rounded hover:bg-gray-700">-</button>
             <span className="w-8 text-center font-bold">{fontSize}</span>
             <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="border border-gray-600 w-10 h-8 rounded hover:bg-gray-700">+</button>
          </div>
        </div>
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
        <div className="flex justify-between pt-4 border-t border-gray-800 gap-4">
          <button 
            onClick={handlePrev} 
            disabled={!chapter.prevId}
            className="flex-1 flex items-center justify-center gap-1 text-sm text-gray-300 hover:text-white px-4 py-3 hover:bg-gray-800 rounded transition disabled:opacity-30"
          >
            <ChevronLeft size={16} /> 上一章
          </button>
          <button 
            onClick={handleNext} 
            disabled={!chapter.nextId}
            className="flex-1 flex items-center justify-center gap-1 text-sm text-gray-300 hover:text-white px-4 py-3 hover:bg-gray-800 rounded transition disabled:opacity-30"
          >
            下一章 <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
