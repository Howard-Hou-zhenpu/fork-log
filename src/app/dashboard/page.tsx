import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from '@/components/Card';
import { getStorageData } from '@/lib/storage';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalDecisions: 0,
    averageDecisionTime: 0,
    emotionDistribution: {},
  });
  
  useEffect(() => {
    const data = getStorageData();
    setStats(data.stats);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-playfair font-bold mb-8 text-center">决策看板</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent>
            <CardTitle className="text-lg mb-2">总决策次数</CardTitle>
            <p className="text-3xl font-bold">{stats.totalDecisions}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <CardTitle className="text-lg mb-2">平均决策时长</CardTitle>
            <p className="text-3xl font-bold">{stats.averageDecisionTime} 天</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <CardTitle className="text-lg mb-2">情绪分布</CardTitle>
            <div className="space-y-2">
              {Object.entries(stats.emotionDistribution).map(([emotion, count]) => (
                <div key={emotion} className="flex justify-between">
                  <span>{emotion}</span>
                  <span>{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="max-w-3xl mx-auto">
        <CardContent>
          <CardTitle className="mb-4">决策 DNA 洞察</CardTitle>
          <p className="text-gray-700">
            即将实现：基于你的决策历史，生成个性化的决策模式洞察，帮助你更好地理解自己的决策风格。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}