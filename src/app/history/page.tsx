import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { getStorageData } from '@/lib/storage';
import { Decision } from '@/types';

export default function HistoryPage() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  
  useEffect(() => {
    const data = getStorageData();
    setDecisions(data.decisions);
  }, []);
  
  if (decisions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto">
          <CardContent>
            <CardTitle>暂无历史记录</CardTitle>
            <CardDescription className="mt-2">
              开始记录你的第一个决策吧
            </CardDescription>
            <Link href="/write" className="mt-4 inline-block">
              <Button variant="primary">开始书写</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-playfair font-bold mb-8 text-center">历史决策</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {decisions.map((decision) => (
          <Card key={decision.id}>
            <CardContent>
              <div className="flex justify-between items-start mb-4">
                <CardTitle className="text-lg">{new Date(decision.createdAt).toLocaleDateString()}</CardTitle>
                <Badge variant={decision.layer1Analysis.emotion as any}>
                  {decision.layer1Analysis.emotion}
                </Badge>
              </div>
              
              <CardDescription className="mb-4 line-clamp-3">
                {decision.rawContent.substring(0, 100)}...
              </CardDescription>
              
              <div className="flex gap-2 mb-4">
                {decision.layer1Analysis.coreOptions.map((option, index) => (
                  <Badge key={index} className="bg-gray-100">
                    {option}
                  </Badge>
                ))}
              </div>
              
              <Link href={`/analysis?id=${decision.id}`}>
                <Button variant="outline" size="sm">
                  查看详情
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}