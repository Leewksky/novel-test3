import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReaderState {
  theme: 'light' | 'sepia' | 'dark' | 'green';
  fontSize: number;
  setTheme: (theme: ReaderState['theme']) => void;
  setFontSize: (size: number) => void;
}

export const useReaderStore = create<ReaderState>()(
  persist(
    (set) => ({
      theme: 'light',
      fontSize: 18,
      setTheme: (theme) => set({ theme }),
      setFontSize: (size) => set({ fontSize: size }),
    }),
    { name: 'reader-settings' }
  )
);
