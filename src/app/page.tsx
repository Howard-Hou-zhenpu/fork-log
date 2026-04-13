import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">摇摆志</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          记录你的决策历史，从纠结中获得洞察，进化为有觉知的选择
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <Card className="w-full md:w-96">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <CardTitle className="mb-6">开始记录</CardTitle>
            <p className="text-gray-600 mb-8 text-center">
              写下你的纠结，让 AI 帮助你分析情绪和选项
            </p>
            <Button asChild size="lg" className="w-full">
              <Link href="/write">开始书写</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="w-full md:w-96">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <CardTitle className="mb-6">查看历史</CardTitle>
            <p className="text-gray-600 mb-8 text-center">
              回顾过往决策，发现你的决策模式
            </p>
            <Button variant="outline" asChild size="lg" className="w-full">
              <Link href="/history">查看历史</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}