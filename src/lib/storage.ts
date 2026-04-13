import { Decision } from '@/types';

const STORAGE_KEY = 'forktrace_data';

export interface StorageData {
  decisions: Decision[];
  stats: {
    totalDecisions: number;
    averageDecisionTime: number;
    emotionDistribution: Record<string, number>;
  };
}

const defaultStorageData: StorageData = {
  decisions: [],
  stats: {
    totalDecisions: 0,
    averageDecisionTime: 0,
    emotionDistribution: {},
  },
};

export const getStorageData = (): StorageData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultStorageData;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultStorageData;
  }
};

export const setStorageData = (data: StorageData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const addDecision = (decision: Decision): void => {
  const data = getStorageData();
  data.decisions.unshift(decision);
  data.stats.totalDecisions = data.decisions.length;
  
  // Update emotion distribution
  const emotion = decision.layer1Analysis.emotion;
  if (data.stats.emotionDistribution[emotion]) {
    data.stats.emotionDistribution[emotion]++;
  } else {
    data.stats.emotionDistribution[emotion] = 1;
  }
  
  setStorageData(data);
};

export const getDecisionById = (id: string): Decision | undefined => {
  const data = getStorageData();
  return data.decisions.find(decision => decision.id === id);
};

export const updateDecision = (updatedDecision: Decision): void => {
  const data = getStorageData();
  const index = data.decisions.findIndex(decision => decision.id === updatedDecision.id);
  if (index !== -1) {
    data.decisions[index] = updatedDecision;
    setStorageData(data);
  }
};