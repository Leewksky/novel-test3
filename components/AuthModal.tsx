'use client';
import { useState } from 'react';
import { X, Smartphone, Github, Mail } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const login = useUserStore(s => s.login);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login();
      setLoading(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"><X size={20}/></button>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">欢迎回到 LiteRead</h2>
          <p className="text-gray-500 text-sm mb-8">登录以同步书架、发表评论</p>
          <button onClick={handleLogin} className="w-full bg-[#d32f2f] text-white py-3 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2">
             {loading ? '登录中...' : <><Smartphone size={18} /> 手机号一键登录</>}
          </button>
          <p className="mt-6 text-xs text-gray-400">登录即代表同意用户协议</p>
        </div>
      </div>
    </div>
  );
}
