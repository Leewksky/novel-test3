import { notFound } from 'next/navigation';
import ReaderContent from '@/components/reader/ReaderContent'; // 这是之前写的 UI 组件
import { supabase } from '@/lib/supabase';

// 强制动态渲染
export const dynamic = 'force-dynamic';

export default async function ReaderPage({ 
  params 
}: { 
  params: { id: string; chapterId: string } 
}) {
  const { id: bookId, chapterId } = params;

  // 1. 获取当前章节的内容
  const { data: currentChapter, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('id', chapterId)
    .single();

  if (error || !currentChapter) {
    return notFound();
  }

  // 2. 获取上一章 ID (查询同书，章节号比当前小，按从大到小排，取第1个)
  const { data: prevData } = await supabase
    .from('chapters')
    .select('id')
    .eq('book_id', bookId)
    .lt('chapter_number', currentChapter.chapter_number) // lt = less than
    .order('chapter_number', { ascending: false })
    .limit(1)
    .single();

  // 3. 获取下一章 ID (查询同书，章节号比当前大，按从小到大排，取第1个)
  const { data: nextData } = await supabase
    .from('chapters')
    .select('id')
    .eq('book_id', bookId)
    .gt('chapter_number', currentChapter.chapter_number) // gt = greater than
    .order('chapter_number', { ascending: true })
    .limit(1)
    .single();

  // 4. 组装数据传给 UI 组件
  const chapterData = {
    id: currentChapter.id,
    bookId: bookId,
    title: currentChapter.title,
    content: currentChapter.content,
    prevId: prevData ? prevData.id : null,
    nextId: nextData ? nextData.id : null,
  };

  return <ReaderContent chapter={chapterData} />;
}
