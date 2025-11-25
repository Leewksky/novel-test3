import { notFound } from 'next/navigation';
import ReaderContent from '@/components/reader/ReaderContent';
import { supabase } from '@/lib/supabase';

// 强制动态渲染
export const dynamic = 'force-dynamic';

export default async function ReaderPage({ 
  params 
}: { 
  params: { id: string; chapterId: string } 
}) {
  const { id: bookId, chapterId } = params;

  // 1. 获取当前章节
  const { data: currentChapter, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('id', chapterId)
    .single();

  if (error || !currentChapter) {
    return notFound();
  }

  // 2. 获取上一章 ID
  const { data: prevData } = await supabase
    .from('chapters')
    .select('id')
    .eq('book_id', bookId)
    .lt('chapter_number', currentChapter.chapter_number)
    .order('chapter_number', { ascending: false })
    .limit(1)
    .single();

  // 3. 获取下一章 ID
  const { data: nextData } = await supabase
    .from('chapters')
    .select('id')
    .eq('book_id', bookId)
    .gt('chapter_number', currentChapter.chapter_number)
    .order('chapter_number', { ascending: true })
    .limit(1)
    .single();

  // 4. 🆕 获取整本书的目录列表 (为了侧边栏菜单)
  // 只取 id 和 title，按 chapter_number 排序
  const { data: allChapters } = await supabase
    .from('chapters')
    .select('id, title')
    .eq('book_id', bookId)
    .order('chapter_number', { ascending: true });

  // 5. 组装数据
  const chapterData = {
    id: currentChapter.id,
    bookId: bookId,
    title: currentChapter.title,
    content: currentChapter.content,
    prevId: prevData ? prevData.id : null,
    nextId: nextData ? nextData.id : null,
  };

  // 传入 toc 数据
  return <ReaderContent chapter={chapterData} toc={allChapters || []} />;
}
