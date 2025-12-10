import { GoogleGenerativeAI } from '@google/generative-ai';
import type {
    GenerateCopyRequest,
    CopyResponse,
} from '../types/copy';

// Gemini API 초기화
const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY || ''
);

// 톤 한글 변환
const toneMap: Record<string, string> = {
    friendly: '친절한',
    formal: '격식 있는',
    funny: '재치 있는',
    neutral: '중립적인',
};

// 컴포넌트 한글 변환
const componentMap: Record<string, string> = {
    button: '버튼',
    modal: '모달',
    notification: '알림',
    error: '에러 메시지',
    info: '안내문구',
    dialog: '확인/취소 다이얼로그',
};

// 서비스 한글 변환
const serviceMap: Record<string, string> = {
    delivery: '배달',
    commerce: '커머스',
    social: '소셜',
    finance: '금융',
    healthcare: '헬스케어',
};

/**
 * UX 카피 생성 함수
 */
export async function generateCopy(
    payload: GenerateCopyRequest
): Promise<CopyResponse> {
    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
        });

        const prompt = `당신은 전문 UX Writer입니다.

아래 입력값(컴포넌트 유형, 톤, 서비스 도메인, 상황 설명)을 기반으로
사용자 친화적이고 명확한 UX 카피 문구를 20~30자 내외로 생성하세요.

요구사항:
- UX Writing 원칙(간결성, 명확성, 목적성)을 준수할 것
- 컴포넌트 성격에 맞는 문구를 생성할 것
- 생성된 문구는 3가지 버전으로 제시할 것
- 각 문구는 독립적으로 사용 가능해야 함

입력:
UI 컴포넌트: ${componentMap[payload.component]}
톤: ${toneMap[payload.tone]}
서비스 유형: ${serviceMap[payload.service]}
상황 설명: ${payload.detail}

출력 형식(JSON):
{
  "suggestions": ["문구1", "문구2", "문구3"]
}

반드시 JSON 형식으로만 응답하세요.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // JSON 파싱 시도
        let parsedResponse: CopyResponse;
        try {
            // JSON 코드 블록 제거
            const jsonMatch =
                responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                parsedResponse = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error(
                    'JSON 형식을 찾을 수 없습니다.'
                );
            }
        } catch (parseError) {
            // 파싱 실패 시 기본값 반환
            console.error('JSON 파싱 실패:', parseError);
            parsedResponse = {
                suggestions: [
                    '네트워크 오류가 발생했습니다.',
                    '다시 시도해주세요.',
                    '잠시 후 다시 시도해주세요.',
                ],
            };
        }

        // suggestions가 배열이고 3개인지 확인
        if (
            !parsedResponse.suggestions ||
            !Array.isArray(parsedResponse.suggestions) ||
            parsedResponse.suggestions.length === 0
        ) {
            parsedResponse = {
                suggestions: [
                    '문구 생성에 실패했습니다.',
                    '다시 시도해주세요.',
                    '잠시 후 다시 시도해주세요.',
                ],
            };
        }

        // 최대 3개만 반환
        return {
            suggestions: parsedResponse.suggestions.slice(
                0,
                3
            ),
            description: parsedResponse.description,
        };
    } catch (error) {
        console.error('카피 생성 오류:', error);
        throw new Error(
            error instanceof Error
                ? error.message
                : '카피 생성 중 오류가 발생했습니다.'
        );
    }
}
