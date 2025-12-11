import { GoogleGenerativeAI } from '@google/generative-ai';
import type {
    JsonToTsRequest,
    TsToJsonRequest,
    JsonConversionResponse,
} from '../types/json';

// Gemini API 초기화
const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY || ''
);

/**
 * JSON → TypeScript 변환 함수
 */
export async function convertJsonToTypeScript(
    payload: JsonToTsRequest
): Promise<JsonConversionResponse> {
    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
        });

        const interfaceName =
            payload.interfaceName || 'Data';

        const prompt = `당신은 전문 TypeScript 개발자입니다.

다음 JSON 데이터를 TypeScript 인터페이스로 변환해주세요.

요구사항:
- 정확한 타입 추론 (string, number, boolean, null, undefined 등)
- 중첩된 객체는 별도 인터페이스로 분리
- 배열 타입은 적절히 표현
- 옵셔널 필드는 ? 사용
- 주석은 포함하지마세요.
- 인터페이스 이름: ${interfaceName}

JSON 데이터:
\`\`\`json
${payload.json}
\`\`\`

출력 형식:
\`\`\`typescript
// 변환된 TypeScript 코드
\`\`\`

반드시 TypeScript 코드만 출력하세요. 설명은 필요 없습니다.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // TypeScript 코드 블록 추출
        const tsMatch =
            responseText.match(
                /```typescript\s*([\s\S]*?)```/
            ) ||
            responseText.match(/```ts\s*([\s\S]*?)```/) ||
            responseText.match(/```\s*([\s\S]*?)```/);

        if (tsMatch) {
            return {
                result: tsMatch[1].trim(),
            };
        }

        // 코드 블록이 없으면 전체 텍스트 반환
        return {
            result: responseText.trim(),
        };
    } catch (error) {
        console.error(
            'JSON → TypeScript 변환 오류:',
            error
        );
        throw new Error(
            error instanceof Error
                ? error.message
                : 'JSON → TypeScript 변환 중 오류가 발생했습니다.'
        );
    }
}

/**
 * TypeScript → JSON 예시 변환 함수
 */
export async function convertTypeScriptToJson(
    payload: TsToJsonRequest
): Promise<JsonConversionResponse> {
    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
        });

        const prompt = `당신은 전문 TypeScript 개발자입니다.

다음 TypeScript 인터페이스/타입을 기반으로 실제 JSON 데이터 예시를 생성해주세요.

요구사항:
- 타입 정의에 맞는 실제 값으로 생성
- 모든 필수 필드 포함
- 옵셔널 필드는 포함하지 않아도 됨
- 배열은 1-2개 요소만 포함
- 실제 사용 가능한 예시 데이터로 생성

TypeScript 코드:
\`\`\`typescript
${payload.typescript}
\`\`\`

출력 형식:
\`\`\`json
// 생성된 JSON 예시
\`\`\`

반드시 유효한 JSON 형식으로만 출력하세요. 설명은 필요 없습니다.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // JSON 코드 블록 추출
        const jsonMatch =
            responseText.match(/```json\s*([\s\S]*?)```/) ||
            responseText.match(/```\s*([\s\S]*?)```/);

        if (jsonMatch) {
            const jsonString = jsonMatch[1].trim();
            // JSON 유효성 검증
            try {
                JSON.parse(jsonString);
                return {
                    result: jsonString,
                };
            } catch (parseError) {
                // 파싱 실패 시 그대로 반환
                return {
                    result: jsonString,
                };
            }
        }

        // 코드 블록이 없으면 전체 텍스트 반환
        return {
            result: responseText.trim(),
        };
    } catch (error) {
        console.error(
            'TypeScript → JSON 변환 오류:',
            error
        );
        throw new Error(
            error instanceof Error
                ? error.message
                : 'TypeScript → JSON 변환 중 오류가 발생했습니다.'
        );
    }
}
