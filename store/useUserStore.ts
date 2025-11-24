import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BookExtended } from '@/lib/mock-data';

interface UserState {
  isLoggedIn: boolean;
  userInfo: { name: string; avatar: string } | null;
  shelf: BookExtended[];
  history: BookExtended[];
  login: () => void;
  logout: () => void;
  addToShelf: (book: BookExtended) => void;
  removeFromShelf: (bookId: string) => void;
  addToHistory: (book: BookExtended) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      userInfo: null,
      shelf: [],
      history: [],
      
      login: () => set({ 
        isLoggedIn: true, 
        userInfo: { name: '尊贵的VIP用户', avatar: 'https://github.com/shadcn.png' } 
      }),
      
      logout: () => set({ isLoggedIn: false, userInfo: null }),
      
      addToShelf: (book) => {
        const { shelf } = get();
        if (!shelf.find(b => b.id === book.id)) {
          set({ shelf: [book, ...shelf] });
        }
      },
      
      removeFromShelf: (id) => {
        set({ shelf: get().shelf.filter(b => b.id !== id) });
      },

      addToHistory: (book) => {
        const newHistory = [book, ...get().history.filter(b => b.id !== book.id)].slice(0, 20);
        set({ history: newHistory });
      }
    }),
    { name: 'user-storage' }
  )
);
