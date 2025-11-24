'use client';
import { useState } from 'react';
import { X, Smartphone, Github, Mail } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const login = useUserStore(s => s.login);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // 模拟网络请求延迟
    setTimeout(() => {
      login();
      setLoading(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"><X size={20}/></button>
        
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">欢迎回到 LiteRead</h2>
          <p className="text-gray-500 text-sm mb-8">登录以同步书架、发表评论</p>

          <div className="space-y-4">
            <button onClick={handleLogin} className="w-full bg-[#d32f2f] text-white py-3 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2">
               {loading ? '登录中...' : <><Smartphone size={18} /> 手机号一键登录</>}
            </button>
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-500">Or continue with</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <button onClick={handleLogin} className="border p-2 rounded-lg flex justify-center hover:bg-gray-50"><Github size={20}/></button>
               <button onClick={handleLogin} className="border p-2 rounded-lg flex justify-center hover:bg-gray-50"><Mail size={20}/></button>
            </div>
          </div>
          
          <p className="mt-6 text-xs text-gray-400">
            登录即代表同意 <a href="#" className="underline">用户协议</a> 和 <a href="#" className="underline">隐私政策</a>
          </p>
        </div>
      </div>
    </div>
  );
}
