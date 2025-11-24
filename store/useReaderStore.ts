import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReaderState {
  theme: 'light' | 'sepia' | 'dark' | 'green';
  fontSize: number;
  fontFamily: string; // 🆕 新增：用于存储字体设置
  
  setTheme: (theme: ReaderState['theme']) => void;
  setFontSize: (size: number) => void;
  setFontFamily: (font: string) => void; // 🆕 新增：修改字体的动作
}

export const useReaderStore = create<ReaderState>()(
  persist(
    (set) => ({
      theme: 'light',
      fontSize: 18,
      fontFamily: 'sans-serif', // 默认使用系统无衬线字体

      setTheme: (theme) => set({ theme }),
      setFontSize: (size) => set({ fontSize: size }),
      setFontFamily: (font) => set({ fontFamily: font }),
    }),
    {
      name: 'reader-settings', // 数据持久化到 LocalStorage
    }
  )
);
