import { getChapter } from '@/lib/mock-data';
import ReaderContent from '@/components/reader/ReaderContent';
import { notFound } from 'next/navigation';

export default async function ReaderPage({ params }: { params: { id: string; chapterId: string } }) {
  const chapter = await getChapter(params.id, params.chapterId);
  if (!chapter) return notFound();
  return <ReaderContent chapter={chapter} />;
}