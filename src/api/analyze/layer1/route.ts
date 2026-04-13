import { NextRequest, NextResponse } from 'next/server';
import { analyzeLayer1 } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();
    
    // 调用统一的 AI 分析函数
    const result = await analyzeLayer1(content);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in Layer 1 analysis:', error);
    return NextResponse.json(
      { error: 'Failed to analyze content' },
      { status: 500 }
    );
  }
}