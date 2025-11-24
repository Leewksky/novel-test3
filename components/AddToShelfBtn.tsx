'use client';
import { useUserStore } from '@/store/useUserStore';
import { BookExtended } from '@/lib/mock-data';
import { Check, Plus } from 'lucide-react';
import { useState } from 'react';

export default function AddToShelfBtn({ book }: { book: BookExtended }) {
  const { addToShelf, shelf } = useUserStore();
  const isAdded = shelf.some(b => b.id === book.id);
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    if (!isAdded) {
      addToShelf(book);
      setAnimate(true); // 触发一点动画反馈
      setTimeout(() => setAnimate(false), 1000);
    }
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isAdded}
      className={`border px-6 py-2.5 rounded text-sm font-medium transition flex items-center gap-2 ${
        isAdded 
          ? 'bg-gray-100 text-gray-500 border-transparent cursor-default' 
          : 'border-gray-300 hover:bg-gray-50 text-gray-700'
      } ${animate ? 'scale-105' : ''}`}
    >
      {isAdded ? <><Check size={16}/> 已在书架</> : <><Plus size={16}/> 加入书架</>}
    </button>
  );
}
