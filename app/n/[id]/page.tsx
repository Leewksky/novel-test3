import Link from 'next/link';
import { getBook } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default async function BookDetail({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) return notFound();

  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-6 mb-8">
          <div className="w-32 flex-shrink-0 aspect-[2/3] bg-gray-300 rounded overflow-hidden">
             <img src={book.coverUrl} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
             <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
             <p className="text-gray-500 mb-4">{book.author} · {book.status}</p>
             <p className="text-sm text-gray-700 line-clamp-3">{book.description}</p>
             <div className="mt-4">
                <Link href={`/n/${book.id}/101`} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">开始阅读</Link>
             </div>
          </div>
        </div>
        <div className="border-t pt-6">
           <h3 className="font-bold mb-4">目录</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {[101, 102, 103, 104, 105].map(c => (
                <Link key={c} href={`/n/${book.id}/${c}`} className="p-2 hover:bg-gray-50 border-b border-dashed truncate">
                   第{c}章 模拟章节标题
                </Link>
              ))}
           </div>
        </div>
      </div>
    </>
  );
}