// UI 컴포넌트 타입
export type UIComponent =
  | "button"
  | "modal"
  | "notification"
  | "error"
  | "info"
  | "dialog";

// 톤 & 매너 타입
export type Tone = "friendly" | "formal" | "funny" | "neutral";

// 서비스 유형 타입
export type ServiceType =
  | "delivery"
  | "commerce"
  | "social"
  | "finance"
  | "healthcare";

// 카피 생성 요청 타입
export interface GenerateCopyRequest {
  component: UIComponent;
  tone: Tone;
  service: ServiceType;
  detail: string; // 상황/세부 설명
}

// 카피 생성 응답 타입
export interface CopyResponse {
  suggestions: string[];
  description?: string;
}

// 즐겨찾기 아이템 타입
export interface FavoriteCopy {
  id: string;
  component: UIComponent;
  tone: Tone;
  service: ServiceType;
  detail: string;
  suggestions: string[];
  createdAt: Date;
}

// 언어 타입
export type Language = "ko" | "en" | "ja" | "zh";

// 에러 메시지 분석 요청 타입
export interface AnalyzeErrorRequest {
  errorMessage: string;
  language: Language;
}

// 에러 메시지 분석 응답 타입
export interface ErrorAnalysisResponse {
  summary: string; // 원인 요약
  solution: string; // 해결방법
}

