declare namespace NodeJS {
  interface ProcessEnv {
    AI_PROVIDER: 'gemini' | 'groq' | 'openai' | 'mock' | 'moonshot';
    AI_API_KEY: string;
    AI_MODEL?: string;
  }
}