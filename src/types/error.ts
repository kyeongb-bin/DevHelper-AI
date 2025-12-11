// 에러 메시지 분석 관련 타입

import type { Language } from './common';

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

