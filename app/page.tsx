import Link from 'next/link';
import { MOCK_BOOKS } from '@/lib/mock-data';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">热门推荐</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {MOCK_BOOKS.map(book => (
            <Link key={book.id} href={`/n/${book.id}`} className="group">
              <div className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden mb-2 shadow-md">
                <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <h3 className="font-bold truncate">{book.title}</h3>
              <p className="text-sm text-gray-500">{book.author}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}