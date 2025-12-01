export interface WordItem {
  word: string;
  pronunciation: string;
  breakdown: string;
  definition: string;
  ceoQuote: string; // The funny "Bossy President" mnemonic
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string; // CEO's reaction to the answer
}

export interface RootData {
  root: string;
  meaning: string;
  words: WordItem[];
  quiz: QuizQuestion[];
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}