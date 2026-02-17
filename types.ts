
// Fix: Added React import to resolve 'Cannot find namespace React' error for React.ReactNode
import React from 'react';

export interface TranslationResult {
  simpleExplanation: string;
  summary: string[];
  dos: string[];
  donts: string[];
  reassurance: string;
  questionsToAsk: string[];
}

export type TabType = 'explanation' | 'summary' | 'behavior' | 'reassurance' | 'questions';

export interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}
