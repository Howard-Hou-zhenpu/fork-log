import React from 'react';
import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <nav className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-playfair font-bold text-primary">
              摇摆志
            </Link>
            <div className="flex gap-6">
              <Link href="/write" className="text-gray-700 hover:text-primary">
                开始记录
              </Link>
              <Link href="/history" className="text-gray-700 hover:text-primary">
                历史记录
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-primary">
                数据看板
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}