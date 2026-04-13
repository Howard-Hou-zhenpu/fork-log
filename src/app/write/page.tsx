import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { Card, CardContent, CardTitle } from '@/components/Card';
import { useRouter } from 'next/navigation';
import { addDecision } from '@/lib/storage';
import { Layer1Result } from '@/types';

export default function WritePage() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // 自动保存草稿
  useEffect(() => {
    const saveDraft = () => {
      localStorage.setItem('forktrace_draft', content);
    };
    
    const timer = setTimeout(saveDraft, 1000);
    return () => clearTimeout(timer);
  }, [content]);
  
  // 加载草稿
  useEffect(() => {
    const draft = localStorage.getItem('forktrace_draft');
    if (draft) {
      setContent(draft);
    }
  }, []);
  
  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/analyze/layer1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze content');
      }
      
      const layer1Result: Layer1Result = await response.json();
      
      // 创建新决策
      const newDecision = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        rawContent: content,
        layer1Analysis: layer1Result,
        isResolved: false,
      };
      
      // 保存到 localStorage
      addDecision(newDecision);
      
      // 清除草稿
      localStorage.removeItem('forktrace_draft');
      
      // 跳转到分析结果页
      router.push(`/analysis?id=${newDecision.id}`);
    } catch (error) {
      console.error('Error submitting content:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardContent>
          <CardTitle className="mb-6">写下你的纠结</CardTitle>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="在这里自由书写你的纠结...\n\n例如：我最近收到了一个新的工作机会，薪资比现在高 20%，但需要搬到另一个城市。我很纠结是否要接受这个 offer，因为我在当前城市有很多朋友，而且当前工作也很稳定..."
            rows={15}
            disabled={isLoading}
          />
          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !content.trim()}
              size="lg"
            >
              {isLoading ? '正在读懂你的心...' : '提交分析'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}