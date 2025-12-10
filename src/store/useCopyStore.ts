import { create } from "zustand";
import type {
  UIComponent,
  Tone,
  ServiceType,
  CopyResponse,
  FavoriteCopy,
  Language,
  ErrorAnalysisResponse,
} from "../types/copy";

interface CopyState {
  // 선택된 옵션들
  component: UIComponent | "";
  tone: Tone | "";
  service: ServiceType | "";
  detail: string;

  // 생성 결과
  result: CopyResponse | null;
  isLoading: boolean;
  error: string | null;

  // 즐겨찾기
  favorites: FavoriteCopy[];

  // 에러 메시지 분석
  errorMessage: string;
  errorLanguage: Language | "";
  errorAnalysis: ErrorAnalysisResponse | null;
  isAnalyzing: boolean;
  analysisError: string | null;

  // 액션들
  setComponent: (component: UIComponent) => void;
  setTone: (tone: Tone) => void;
  setService: (service: ServiceType) => void;
  setDetail: (detail: string) => void;
  setResult: (result: CopyResponse | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addFavorite: (favorite: Omit<FavoriteCopy, "id" | "createdAt">) => void;
  removeFavorite: (id: string) => void;
  setErrorMessage: (message: string) => void;
  setErrorLanguage: (language: Language) => void;
  setErrorAnalysis: (analysis: ErrorAnalysisResponse | null) => void;
  setAnalyzing: (isAnalyzing: boolean) => void;
  setAnalysisError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  component: "" as UIComponent | "",
  tone: "" as Tone | "",
  service: "" as ServiceType | "",
  detail: "",
  result: null,
  isLoading: false,
  error: null,
  favorites: [],
  errorMessage: "",
  errorLanguage: "" as Language | "",
  errorAnalysis: null,
  isAnalyzing: false,
  analysisError: null,
};

export const useCopyStore = create<CopyState>((set) => ({
  ...initialState,

  setComponent: (component) => set({ component }),
  setTone: (tone) => set({ tone }),
  setService: (service) => set({ service }),
  setDetail: (detail) => set({ detail }),
  setResult: (result) => set({ result }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  addFavorite: (favorite) =>
    set((state) => ({
      favorites: [
        ...state.favorites,
        {
          ...favorite,
          id: Date.now().toString(),
          createdAt: new Date(),
        },
      ],
    })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.id !== id),
    })),
  setErrorMessage: (message) => set({ errorMessage: message }),
  setErrorLanguage: (language) => set({ errorLanguage: language }),
  setErrorAnalysis: (analysis) => set({ errorAnalysis: analysis }),
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisError: (error) => set({ analysisError: error }),
  reset: () => set(initialState),
}));

