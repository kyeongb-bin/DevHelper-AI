import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AnalyzeErrorRequest, ErrorAnalysisResponse, Language } from "../types/copy";

// Gemini API 초기화
const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY || ""
);

// 언어별 응답 언어 설정
const languageMap: Record<Language, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文",
};

/**
 * 에러 메시지 분석 함수
 */
export async function analyzeError(
  payload: AnalyzeErrorRequest
): Promise<ErrorAnalysisResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const responseLanguage = languageMap[payload.language];

    const prompt = `당신은 전문 개발자이자 기술 지원 전문가입니다.

아래 에러 메시지를 분석하여 원인 요약과 해결방법을 ${responseLanguage}로 간단명료하게 설명해주세요.

요구사항:
- 원인 요약: 에러의 핵심 원인을 2-3문장으로 간단히 설명
- 해결방법: 구체적이고 실행 가능한 해결 단계를 제시
- ${responseLanguage}로 응답할 것
- 기술 용어는 정확하게 사용할 것

에러 메시지:
${payload.errorMessage}

출력 형식(JSON):
{
  "summary": "원인 요약 (2-3문장)",
  "solution": "해결방법 (단계별 설명)"
}

반드시 JSON 형식으로만 응답하세요.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // JSON 파싱 시도
    let parsedResponse: ErrorAnalysisResponse;
    try {
      // JSON 코드 블록 제거
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("JSON 형식을 찾을 수 없습니다.");
      }
    } catch (parseError) {
      // 파싱 실패 시 기본값 반환
      console.error("JSON 파싱 실패:", parseError);
      parsedResponse = {
        summary: "에러 메시지를 분석할 수 없습니다.",
        solution: "에러 메시지를 다시 확인하거나 더 자세한 정보를 제공해주세요.",
      };
    }

    // 필수 필드 확인
    if (!parsedResponse.summary || !parsedResponse.solution) {
      parsedResponse = {
        summary: "에러 분석에 실패했습니다.",
        solution: "다시 시도해주세요.",
      };
    }

    return parsedResponse;
  } catch (error) {
    console.error("에러 분석 오류:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "에러 분석 중 오류가 발생했습니다."
    );
  }
}

