import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { useSearchParams } from 'next/navigation';
import { getDecisionById } from '@/lib/storage';
import { Decision } from '@/types';

export default function AnalysisPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [decision, setDecision] = useState<Decision | null>(null);
  const [activeTab, setActiveTab] = useState('layer1');
  
  useEffect(() => {
    if (id) {
      const foundDecision = getDecisionById(id);
      if (foundDecision) {
        setDecision(foundDecision);
      }
    }
  }, [id]);
  
  if (!decision) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto">
          <CardContent>
            <CardTitle>加载中...</CardTitle>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardContent>
          <div className="flex mb-6 border-b">
            <button
              onClick={() => setActiveTab('layer1')}
              className={`px-4 py-2 font-medium ${activeTab === 'layer1' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
            >
              情绪分析
            </button>
            <button
              onClick={() => setActiveTab('layer2')}
              className={`px-4 py-2 font-medium ${activeTab === 'layer2' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
            >
              理性分析
            </button>
          </div>
          
          {activeTab === 'layer1' ? (
            <div>
              <div className="mb-6">
                <Badge variant={decision.layer1Analysis.emotion as any} className="mb-4">
                  {decision.layer1Analysis.emotion}
                </Badge>
                <h3 className="text-lg font-medium mb-2">核心选项</h3>
                <div className="flex gap-2 mb-4">
                  {decision.layer1Analysis.coreOptions.map((option, index) => (
                    <Badge key={index} className="bg-gray-100">
                      {option}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="text-lg font-medium mb-2">隐性担忧</h3>
                <ul className="list-disc pl-5 mb-4">
                  {decision.layer1Analysis.hiddenConcerns.map((concern, index) => (
                    <li key={index} className="mb-1">{concern}</li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-medium mb-2">温暖总结</h3>
                <p className="text-gray-700">{decision.layer1Analysis.summary}</p>
              </div>
              
              <Button
                onClick={() => setActiveTab('layer2')}
                variant="secondary"
                size="lg"
              >
                继续理性分析
              </Button>
            </div>
          ) : (
            <div>
              <CardTitle className="mb-6">理性分析</CardTitle>
              <p className="text-gray-600 mb-6">
                即将实现：动态表单收集信息，生成双雷达图对比、3时间线推演、带置信度的建议
              </p>
              <Button
                onClick={() => setActiveTab('layer1')}
                variant="outline"
                size="lg"
              >
                返回情绪分析
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}