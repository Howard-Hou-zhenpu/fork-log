import { Layer1Result, Layer2Result } from '@/types';

// Layer 1 Mock 数据
const mockLayer1Result: Layer1Result = {
  emotion: "conflicted",
  emotionConfidence: 85,
  coreOptions: ["辞职创业", "继续工作"],
  conflictIntensity: "high",
  hiddenConcerns: ["担心积蓄不够", "怕父母失望", "怀疑自己能力"],
  summary: "看起来你并不是真的讨厌现在的工作，而是对'错过创业窗口期'感到焦虑。这种FOMO情绪让你忽略了现有工作的稳定性价值。",
  suggestedDimensions: ["career", "finance", "family"]
};

// Layer 2 Mock 数据
const mockLayer2Result: Layer2Result = {
  radarScores: {
    A: {"收益潜力":9,"风险程度":3,"兴趣匹配":9,"能力匹配":6,"时间自由度":8,"长期价值":9},
    B: {"收益潜力":5,"风险程度":8,"兴趣匹配":4,"能力匹配":9,"时间自由度":3,"长期价值":6}
  },
  timeline: [
    {"period":"3个月","optionA":"收入不稳定，焦虑感强，但时间自由","optionB":"工作稳定，但内心不甘"},
    {"period":"1年","optionA":"若跑通模式，收入可能超工资；若失败需重返职场","optionB":"可能升职，但错过创业时机感更强"},
    {"period":"3年","optionA":"要么小有成就，要么彻底转型；无悔但风险高","optionB":"职业安全但可能终身遗憾"}
  ],
  recommendation: {
    choice: "B",
    confidence: 65,
    reasoning: ["当前积蓄仅够支撑3个月，风险过高","你没有验证过创业想法的市场需求","建议先副业验证，6个月后再决定"],
    actionableNextStep: "未来2个月，每周投入10小时验证创业想法，同时保持工作。若月收入达工资30%再考虑辞职。"
  }
};

// 统一的 Layer 1 分析函数
export async function analyzeLayer1(content: string): Promise<Layer1Result> {
  const provider = process.env.AI_PROVIDER || 'mock';
  const apiKey = process.env.AI_API_KEY;
  
  // 如果没有 API Key 且不是 Mock 模式，自动切换到 Mock 模式
  if (provider !== 'mock' && !apiKey) {
    console.log('未检测到 API Key，已切换至演示模式');
    return mockLayer1Result;
  }
  
  try {
    switch (provider) {
      case 'gemini':
        return await analyzeLayer1WithGemini(content);
      case 'groq':
        return await analyzeLayer1WithGroq(content);
      case 'openai':
        return await analyzeLayer1WithOpenAI(content);
      case 'moonshot':
        return await analyzeLayer1WithMoonshot(content);
      case 'mock':
      default:
        return mockLayer1Result;
    }
  } catch (error) {
    console.error('AI 分析失败，切换到 Mock 模式:', error);
    return mockLayer1Result;
  }
}

// 统一的 Layer 2 分析函数
export async function analyzeLayer2(context: string, additionalInfo: Record<string, any>): Promise<Layer2Result> {
  const provider = process.env.AI_PROVIDER || 'mock';
  const apiKey = process.env.AI_API_KEY;
  
  // 如果没有 API Key 且不是 Mock 模式，自动切换到 Mock 模式
  if (provider !== 'mock' && !apiKey) {
    console.log('未检测到 API Key，已切换至演示模式');
    return mockLayer2Result;
  }
  
  try {
    switch (provider) {
      case 'gemini':
        return await analyzeLayer2WithGemini(context, additionalInfo);
      case 'groq':
        return await analyzeLayer2WithGroq(context, additionalInfo);
      case 'openai':
        return await analyzeLayer2WithOpenAI(context, additionalInfo);
      case 'moonshot':
        return await analyzeLayer2WithMoonshot(context, additionalInfo);
      case 'mock':
      default:
        return mockLayer2Result;
    }
  } catch (error) {
    console.error('AI 分析失败，切换到 Mock 模式:', error);
    return mockLayer2Result;
  }
}

// 使用 Gemini 进行 Layer 1 分析
async function analyzeLayer1WithGemini(content: string): Promise<Layer1Result> {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  
  const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL || 'gemini-pro' });
  
  const prompt = `你是决策分析师和心理咨询师。分析用户决策困境，挖掘隐性焦虑（用户明说的占30%，你要找出70%没说出口的）。温暖直接，像最聪明且关心他的朋友。输出JSON格式：
{
  "emotion": "anxious|excited|confused|fearful|conflicted",
  "emotionConfidence": 85,
  "coreOptions": ["选项A", "选项B"],
  "conflictIntensity": "high|medium|low",
  "hiddenConcerns": ["担忧1", "担忧2", "担忧3"],
  "summary": "温暖洞察性总结，3-4句话",
  "suggestedDimensions": ["career", "finance", "relationship"]
}

分析这段纠结：${content}。识别情绪、选项、3个隐性担忧、总结、决策维度。`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // 提取 JSON 部分
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Invalid response format');
  }
  
  return JSON.parse(jsonMatch[0]);
}

// 使用 Groq 进行 Layer 1 分析
async function analyzeLayer1WithGroq(content: string): Promise<Layer1Result> {
  const { Groq } = await import('groq-sdk');
  
  const groq = new Groq({ apiKey: process.env.AI_API_KEY || '' });
  
  const prompt = `你是决策分析师和心理咨询师。分析用户决策困境，挖掘隐性焦虑（用户明说的占30%，你要找出70%没说出口的）。温暖直接，像最聪明且关心他的朋友。输出JSON格式：
{
  "emotion": "anxious|excited|confused|fearful|conflicted",
  "emotionConfidence": 85,
  "coreOptions": ["选项A", "选项B"],
  "conflictIntensity": "high|medium|low",
  "hiddenConcerns": ["担忧1", "担忧2", "担忧3"],
  "summary": "温暖洞察性总结，3-4句话",
  "suggestedDimensions": ["career", "finance", "relationship"]
}

分析这段纠结：${content}。识别情绪、选项、3个隐性担忧、总结、决策维度。`;
  
  const completion = await groq.chat.completions.create({
    model: process.env.AI_MODEL || 'llama3-70b',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });
  
  const text = completion.choices[0].message.content || '';
  
  // 提取 JSON 部分
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Invalid response format');
  }
  
  return JSON.parse(jsonMatch[0]);
}

// 使用 OpenAI 进行 Layer 1 分析
async function analyzeLayer1WithOpenAI(content: string): Promise<Layer1Result> {
  // 这里可以实现 OpenAI API 调用
  // 暂时返回 Mock 数据
  return mockLayer1Result;
}

// 使用 Gemini 进行 Layer 2 分析
async function analyzeLayer2WithGemini(context: string, additionalInfo: Record<string, any>): Promise<Layer2Result> {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  
  const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: process.env.AI_MODEL || 'gemini-pro' });
  
  const prompt = `你是战略决策顾问。基于基础纠结和补充信息，进行理性分析。输出JSON：
{
  "radarScores": {
    "A": {"收益潜力":8,"风险程度":3,"兴趣匹配":9,"能力匹配":7,"时间自由度":6,"长期价值":8},
    "B": {"收益潜力":6,"风险程度":7,"兴趣匹配":5,"能力匹配":9,"时间自由度":4,"长期价值":7}
  },
  "timeline": [
    {"period":"3个月","optionA":"描述","optionB":"描述"},
    {"period":"1年","optionA":"描述","optionB":"描述"},
    {"period":"3年","optionA":"描述","optionB":"描述"}
  ],
  "recommendation": {
    "choice": "A|B",
    "confidence": 75,
    "reasoning": ["理由1","理由2","理由3"],
    "actionableNextStep": "具体下一步行动"
  }
}

基础纠结：${context}，补充信息：${JSON.stringify(additionalInfo)}。生成6维度评分、3时间线推演、带置信度建议。`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // 提取 JSON 部分
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Invalid response format');
  }
  
  return JSON.parse(jsonMatch[0]);
}

// 使用 Groq 进行 Layer 2 分析
async function analyzeLayer2WithGroq(context: string, additionalInfo: Record<string, any>): Promise<Layer2Result> {
  const { Groq } = await import('groq-sdk');
  
  const groq = new Groq({ apiKey: process.env.AI_API_KEY || '' });
  
  const prompt = `你是战略决策顾问。基于基础纠结和补充信息，进行理性分析。输出JSON：
{
  "radarScores": {
    "A": {"收益潜力":8,"风险程度":3,"兴趣匹配":9,"能力匹配":7,"时间自由度":6,"长期价值":8},
    "B": {"收益潜力":6,"风险程度":7,"兴趣匹配":5,"能力匹配":9,"时间自由度":4,"长期价值":7}
  },
  "timeline": [
    {"period":"3个月","optionA":"描述","optionB":"描述"},
    {"period":"1年","optionA":"描述","optionB":"描述"},
    {"period":"3年","optionA":"描述","optionB":"描述"}
  ],
  "recommendation": {
    "choice": "A|B",
    "confidence": 75,
    "reasoning": ["理由1","理由2","理由3"],
    "actionableNextStep": "具体下一步行动"
  }
}

基础纠结：${context}，补充信息：${JSON.stringify(additionalInfo)}。生成6维度评分、3时间线推演、带置信度建议。`;
  
  const completion = await groq.chat.completions.create({
    model: process.env.AI_MODEL || 'llama3-70b',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });
  
  const text = completion.choices[0].message.content || '';
  
  // 提取 JSON 部分
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Invalid response format');
  }
  
  return JSON.parse(jsonMatch[0]);
}

// 使用 OpenAI 进行 Layer 2 分析
async function analyzeLayer2WithOpenAI(context: string, additionalInfo: Record<string, any>): Promise<Layer2Result> {
  // 这里可以实现 OpenAI API 调用
  // 暂时返回 Mock 数据
  return mockLayer2Result;
}

// 使用 Moonshot 进行 Layer 1 分析
async function analyzeLayer1WithMoonshot(content: string): Promise<Layer1Result> {
  // Moonshot 兼容 OpenAI SDK 格式
  const { Configuration, OpenAIApi } = await import('openai');
  
  const configuration = new Configuration({
    apiKey: process.env.AI_API_KEY,
    basePath: 'https://api.moonshot.cn/v1',
  });
  
  const openai = new OpenAIApi(configuration);
  
  const prompt = `你是决策分析师和心理咨询师。分析用户决策困境，挖掘隐性焦虑（用户明说的占30%，你要找出70%没说出口的）。温暖直接，像最聪明且关心他的朋友。输出JSON格式：
{
  "emotion": "anxious|excited|confused|fearful|conflicted",
  "emotionConfidence": 85,
  "coreOptions": ["选项A", "选项B"],
  "conflictIntensity": "high|medium|low",
  "hiddenConcerns": ["担忧1", "担忧2", "担忧3"],
  "summary": "温暖洞察性总结，3-4句话",
  "suggestedDimensions": ["career", "finance", "relationship"]
}

分析这段纠结：${content}。识别情绪、选项、3个隐性担忧、总结、决策维度。`;
  
  const completion = await openai.createChatCompletion({
    model: process.env.AI_MODEL || 'moonshot-v1-8k',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });
  
  const text = completion.data.choices[0].message?.content || '';
  
  // 提取 JSON 部分
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Invalid response format');
  }
  
  return JSON.parse(jsonMatch[0]);
}

// 使用 Moonshot 进行 Layer 2 分析
async function analyzeLayer2WithMoonshot(context: string, additionalInfo: Record<string, any>): Promise<Layer2Result> {
  // Moonshot 兼容 OpenAI SDK 格式
  const { Configuration, OpenAIApi } = await import('openai');
  
  const configuration = new Configuration({
    apiKey: process.env.AI_API_KEY,
    basePath: 'https://api.moonshot.cn/v1',
  });
  
  const openai = new OpenAIApi(configuration);
  
  const prompt = `你是战略决策顾问。基于基础纠结和补充信息，进行理性分析。输出JSON：
{
  "radarScores": {
    "A": {"收益潜力":8,"风险程度":3,"兴趣匹配":9,"能力匹配":7,"时间自由度":6,"长期价值":8},
    "B": {"收益潜力":6,"风险程度":7,"兴趣匹配":5,"能力匹配":9,"时间自由度":4,"长期价值":7}
  },
  "timeline": [
    {"period":"3个月","optionA":"描述","optionB":"描述"},
    {"period":"1年","optionA":"描述","optionB":"描述"},
    {"period":"3年","optionA":"描述","optionB":"描述"}
  ],
  "recommendation": {
    "choice": "A|B",
    "confidence": 75,
    "reasoning": ["理由1","理由2","理由3"],
    "actionableNextStep": "具体下一步行动"
  }
}

基础纠结：${context}，补充信息：${JSON.stringify(additionalInfo)}。生成6维度评分、3时间线推演、带置信度建议。`;
  
  const completion = await openai.createChatCompletion({
    model: process.env.AI_MODEL || 'moonshot-v1-8k',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });
  
  const text = completion.data.choices[0].message?.content || '';
  
  // 提取 JSON 部分
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Invalid response format');
  }
  
  return JSON.parse(jsonMatch[0]);
}