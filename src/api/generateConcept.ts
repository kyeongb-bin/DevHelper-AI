import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini API 초기화
const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY || ''
);

/**
 * 오늘의 핵심 개념 생성 함수
 */
export async function generateDailyConcept(): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
        });

        const prompt = `당신은 프론트엔드 개발 전문가입니다.

프론트엔드 개발에서 자주 쓰이지만 은근히 모호하거나 헷갈리는 핵심 개념 1개를 설명해주세요.

요구사항:
- React, Next.js, TypeScript, JavaScript 등 프론트엔드 관련 개념
- 개발자들이 자주 헷갈리거나 모호하게 이해하는 개념
- 간결하고 명확한 설명 (2-3문장)
- 실무에서 바로 적용 가능한 인사이트 포함
- 예시나 비유를 포함하면 좋음

출력 형식:
- 제목: 개념 이름
- 설명: 2-3문장으로 간결하게

예시:
"Reconciliation은 리렌더링과 다릅니다. React는 변경된 부분만 DOM에 반영합니다."

한국어로 응답하세요.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // 코드 블록만 제거하고 나머지 마크다운은 유지
        const cleanedText = responseText
            .replace(/```[\s\S]*?```/g, '') // 코드 블록만 제거
            .trim();

        return cleanedText;
    } catch (error) {
        console.error('개념 생성 오류:', error);
        throw new Error(
            error instanceof Error
                ? error.message
                : '개념 생성 중 오류가 발생했습니다.'
        );
    }
}

