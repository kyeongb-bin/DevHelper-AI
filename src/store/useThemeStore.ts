import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
}

// localStorage에서 테마 불러오기
const getStoredTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") {
    return stored;
  }
  // 시스템 설정 확인
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
};

export const useThemeStore = create<ThemeState>((set, get) => {
  // 초기 테마 설정
  const initialTheme = getStoredTheme();
  
  // 초기 HTML 클래스 적용
  if (typeof window !== "undefined") {
    const root = document.documentElement;
    if (initialTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  return {
    theme: initialTheme,
    toggleTheme: () => {
      const currentTheme = get().theme;
      const newTheme = currentTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      
      // HTML 클래스 즉시 업데이트
      if (typeof window !== "undefined") {
        const root = document.documentElement;
        if (newTheme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
      
      set({ theme: newTheme });
    },
    setTheme: (theme) => {
      localStorage.setItem("theme", theme);
      
      // HTML 클래스 즉시 업데이트
      if (typeof window !== "undefined") {
        const root = document.documentElement;
        if (theme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
      
      set({ theme });
    },
    initializeTheme: () => {
      const theme = getStoredTheme();
      if (typeof window !== "undefined") {
        const root = document.documentElement;
        if (theme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
      set({ theme });
    },
  };
});

