// JSON 변환 관련 스토어

import { create } from "zustand";
import type {
  ConversionDirection,
  JsonConversionResponse,
} from "../types/json";

interface JsonState {
  // 변환 방향
  conversionDirection: ConversionDirection;

  // 입력 데이터
  jsonInput: string;
  typescriptInput: string;
  interfaceName: string;

  // 변환 결과
  conversionResult: JsonConversionResponse | null;
  isConverting: boolean;
  conversionError: string | null;

  // 액션들
  setConversionDirection: (direction: ConversionDirection) => void;
  setJsonInput: (input: string) => void;
  setTypeScriptInput: (input: string) => void;
  setInterfaceName: (name: string) => void;
  setConversionResult: (result: JsonConversionResponse | null) => void;
  setConverting: (isConverting: boolean) => void;
  setConversionError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  conversionDirection: "json-to-ts" as ConversionDirection,
  jsonInput: "",
  typescriptInput: "",
  interfaceName: "Data",
  conversionResult: null,
  isConverting: false,
  conversionError: null,
};

export const useJsonStore = create<JsonState>((set) => ({
  ...initialState,

  setConversionDirection: (direction) => set({ conversionDirection: direction }),
  setJsonInput: (input) => set({ jsonInput: input }),
  setTypeScriptInput: (input) => set({ typescriptInput: input }),
  setInterfaceName: (name) => set({ interfaceName: name }),
  setConversionResult: (result) => set({ conversionResult: result }),
  setConverting: (isConverting) => set({ isConverting }),
  setConversionError: (error) => set({ conversionError: error }),
  reset: () => set(initialState),
}));

