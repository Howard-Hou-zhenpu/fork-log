export interface Decision {
  id: string;
  createdAt: string;
  rawContent: string;
  layer1Analysis: {
    emotion: string;
    emotionConfidence: number;
    coreOptions: string[];
    conflictIntensity: string;
    hiddenConcerns: string[];
    summary: string;
    suggestedDimensions: string[];
  };
  layer2Analysis?: {
    additionalInfo: Record<string, any>;
    radarScores: {A: Record<string,number>, B: Record<string,number>};
    timeline: Array<{period:string, optionA:string, optionB:string}>;
    recommendation: {choice:string, confidence:number, reasoning:string[], actionableNextStep:string};
  };
  isResolved: boolean;
  finalChoice?: string;
}

export interface Layer1Result {
  emotion: string;
  emotionConfidence: number;
  coreOptions: string[];
  conflictIntensity: string;
  hiddenConcerns: string[];
  summary: string;
  suggestedDimensions: string[];
}

export interface Layer2Result {
  radarScores: {
    A: Record<string, number>;
    B: Record<string, number>;
  };
  timeline: Array<{
    period: string;
    optionA: string;
    optionB: string;
  }>;
  recommendation: {
    choice: string;
    confidence: number;
    reasoning: string[];
    actionableNextStep: string;
  };
}