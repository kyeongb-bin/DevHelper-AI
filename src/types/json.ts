// JSON 변환 관련 타입

// JSON 변환 방향 타입
export type ConversionDirection =
    | 'json-to-ts'
    | 'ts-to-json';

// JSON → TypeScript 변환 요청 타입
export interface JsonToTsRequest {
    json: string;
    interfaceName?: string;
}

// TypeScript → JSON 변환 요청 타입
export interface TsToJsonRequest {
    typescript: string;
}

// JSON 변환 응답 타입
export interface JsonConversionResponse {
    result: string;
    explanation?: string;
}
