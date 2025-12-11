// 에러 메시지 분석 관련 스토어

import { create } from "zustand";
import type { ErrorAnalysisResponse } from "../types/error";
import type { Language } from "../types/common";

interface ErrorState {
  // 입력 데이터
  errorMessage: string;
  errorLanguage: Language | "";

  // 분석 결과
  errorAnalysis: ErrorAnalysisResponse | null;
  isAnalyzing: boolean;
  analysisError: string | null;

  // 액션들
  setErrorMessage: (message: string) => void;
  setErrorLanguage: (language: Language) => void;
  setErrorAnalysis: (analysis: ErrorAnalysisResponse | null) => void;
  setAnalyzing: (isAnalyzing: boolean) => void;
  setAnalysisError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  errorMessage: "",
  errorLanguage: "" as Language | "",
  errorAnalysis: null,
  isAnalyzing: false,
  analysisError: null,
};

export const useErrorStore = create<ErrorState>((set) => ({
  ...initialState,

  setErrorMessage: (message) => set({ errorMessage: message }),
  setErrorLanguage: (language) => set({ errorLanguage: language }),
  setErrorAnalysis: (analysis) => set({ errorAnalysis: analysis }),
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisError: (error) => set({ analysisError: error }),
  reset: () => set(initialState),
}));

