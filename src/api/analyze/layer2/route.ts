import { NextRequest, NextResponse } from 'next/server';
import { analyzeLayer2 } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const { decisionId, additionalInfo, layer1Context } = await request.json();
    
    // 调用统一的 AI 分析函数
    const result = await analyzeLayer2(layer1Context, additionalInfo);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in Layer 2 analysis:', error);
    return NextResponse.json(
      { error: 'Failed to analyze content' },
      { status: 500 }
    );
  }
}