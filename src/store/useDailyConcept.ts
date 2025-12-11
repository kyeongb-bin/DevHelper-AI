import { create } from "zustand";

interface DailyConcept {
  concept: string | null;
  date: string | null;
  isLoading: boolean;
  error: string | null;
  setConcept: (concept: string, date: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearConcept: () => void;
}

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// 로컬 스토리지에서 오늘의 개념 불러오기
const loadTodayConcept = (): { concept: string | null; date: string | null } => {
  if (typeof window === "undefined") {
    return { concept: null, date: null };
  }

  const stored = localStorage.getItem("daily-concept");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const today = getTodayDate();
      
      // 오늘 날짜와 저장된 날짜가 같으면 반환
      if (parsed.date === today) {
        return {
          concept: parsed.concept,
          date: parsed.date,
        };
      }
      
      // 날짜가 다르면 초기화
      return { concept: null, date: null };
    } catch {
      return { concept: null, date: null };
    }
  }
  return { concept: null, date: null };
};

// 초기 데이터 로드
const initialData = loadTodayConcept();

export const useDailyConcept = create<DailyConcept>((set) => ({
  concept: initialData.concept,
  date: initialData.date,
  isLoading: false,
  error: null,

  setConcept: (concept: string, date: string) => {
    // 로컬 스토리지에 저장
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "daily-concept",
        JSON.stringify({ concept, date })
      );
    }
    set({ concept, date, error: null });
  },

  setLoading: (isLoading: boolean) => set({ isLoading }),

  setError: (error: string | null) => set({ error }),

  clearConcept: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("daily-concept");
    }
    set({ concept: null, date: null, error: null });
  },
}));

// 오늘의 개념이 필요한지 확인
export const shouldFetchConcept = (): boolean => {
  const today = getTodayDate();
  const stored = localStorage.getItem("daily-concept");
  
  if (!stored) return true;
  
  try {
    const parsed = JSON.parse(stored);
    return parsed.date !== today;
  } catch {
    return true;
  }
};

