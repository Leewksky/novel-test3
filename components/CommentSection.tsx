'use client';
import { useState } from 'react';
import { User, Heart, Send } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';

export default function CommentSection() {
  const { isLoggedIn } = useUserStore();
  
  // 模拟评论数据
  const [comments, setComments] = useState([
    { id: 1, user: '书荒猎人', content: '这也太好看了吧！熬夜看完了！', likes: 124, time: '2小时前' },
    { id: 2, user: '催更狂魔', content: '作者大大快更新，生产队的驴都不敢这么歇！', likes: 89, time: '5小时前' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    const newComment = {
      id: Date.now(),
      user: '尊贵的VIP用户', // 应该从 store 获取
      content: inputValue,
      likes: 0,
      time: '刚刚'
    };
    setComments([newComment, ...comments]);
    setInputValue('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
      <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
        书友互动 <span className="text-xs font-normal text-gray-500">{comments.length}条评论</span>
      </h3>

      {/* 输入框 */}
      <div className="flex gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0">
           <User size={20} />
        </div>
        <div className="flex-1">
           <textarea 
             disabled={!isLoggedIn}
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             placeholder={isLoggedIn ? "发条评论鼓励一下作者..." : "请先登录后发表评论"}
             className="w-full bg-gray-50 border rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#d32f2f] outline-none h-24 resize-none transition"
           />
           <div className="flex justify-end mt-2">
              <button 
                onClick={handleSubmit}
                disabled={!isLoggedIn || !inputValue.trim()}
                className="bg-[#d32f2f] text-white px-6 py-1.5 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition flex items-center gap-2"
              >
                <Send size={14} /> 发布
              </button>
           </div>
        </div>
      </div>

      {/* 评论列表 */}
      <div className="space-y-6">
        {comments.map(c => (
           <div key={c.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center font-bold text-gray-600 flex-shrink-0 text-xs">
                 {c.user.slice(0,1)}
              </div>
              <div className="flex-1">
                 <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-gray-800">{c.user}</span>
                    <span className="text-xs text-gray-400">{c.time}</span>
                 </div>
                 <p className="text-gray-600 text-sm leading-relaxed mb-2">{c.content}</p>
                 <div className="flex items-center gap-4 text-xs text-gray-400">
                    <button className="flex items-center gap-1 hover:text-[#d32f2f] transition"><Heart size={14}/> {c.likes}</button>
                    <button className="hover:text-gray-800">回复</button>
                 </div>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
}
