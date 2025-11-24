import Link from 'next/link';
import { Search, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-blue-600">LiteRead</Link>
        <div className="flex items-center space-x-4">
          <button className="p-2"><Search className="w-5 h-5" /></button>
          <button className="p-2 bg-gray-100 rounded-full"><User className="w-5 h-5" /></button>
        </div>
      </div>
    </nav>
  );
}