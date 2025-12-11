import React, { useState } from "react";
import { useCopyStore } from "../store/useCopyStore";
import { convertJsonToTypeScript, convertTypeScriptToJson } from "../api/convertJson";
import type { ConversionDirection } from "../types/copy";

export const JsonConverter: React.FC = () => {
  const {
    conversionDirection,
    jsonInput,
    typescriptInput,
    interfaceName,
    conversionResult,
    isConverting,
    conversionError,
    setConversionDirection,
    setJsonInput,
    setTypeScriptInput,
    setInterfaceName,
    setConversionResult,
    setConverting,
    setConversionError,
  } = useCopyStore();

  const [jsonError, setJsonError] = useState<string | null>(null);

  // JSON 유효성 검증
  const validateJson = (jsonString: string): boolean => {
    try {
      JSON.parse(jsonString);
      setJsonError(null);
      return true;
    } catch (error) {
      setJsonError("유효하지 않은 JSON 형식입니다.");
      return false;
    }
  };

  // JSON → TypeScript 변환
  const handleJsonToTs = async () => {
    if (!jsonInput.trim()) {
      setConversionError("JSON 데이터를 입력해주세요.");
      return;
    }

    if (!validateJson(jsonInput)) {
      setConversionError("유효한 JSON 형식이 아닙니다.");
      return;
    }

    setConverting(true);
    setConversionError(null);
    setConversionResult(null);

    try {
      const result = await convertJsonToTypeScript({
        json: jsonInput,
        interfaceName: interfaceName || "Data",
      });
      setConversionResult(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "변환에 실패했습니다.";
      setConversionError(errorMessage);
    } finally {
      setConverting(false);
    }
  };

  // TypeScript → JSON 변환
  const handleTsToJson = async () => {
    if (!typescriptInput.trim()) {
      setConversionError("TypeScript 코드를 입력해주세요.");
      return;
    }

    setConverting(true);
    setConversionError(null);
    setConversionResult(null);

    try {
      const result = await convertTypeScriptToJson({
        typescript: typescriptInput,
      });
      setConversionResult(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "변환에 실패했습니다.";
      setConversionError(errorMessage);
    } finally {
      setConverting(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("클립보드에 복사되었습니다!");
  };

  return (
    <div className="space-y-6">
      {/* 방향 선택 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 transition-colors duration-200">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          변환 방향 선택
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => setConversionDirection("json-to-ts")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              conversionDirection === "json-to-ts"
                ? "bg-blue-600 dark:bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            JSON → TypeScript
          </button>
          <button
            onClick={() => setConversionDirection("ts-to-json")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              conversionDirection === "ts-to-json"
                ? "bg-blue-600 dark:bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            TypeScript → JSON
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 입력 패널 */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              {conversionDirection === "json-to-ts" ? "JSON 입력" : "TypeScript 입력"}
            </h3>
            
            {conversionDirection === "json-to-ts" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    인터페이스 이름 (선택사항)
                  </label>
                  <input
                    type="text"
                    value={interfaceName}
                    onChange={(e) => setInterfaceName(e.target.value)}
                    placeholder="Data"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                  />
                </div>
                <textarea
                  value={jsonInput}
                  onChange={(e) => {
                    setJsonInput(e.target.value);
                    if (e.target.value.trim()) {
                      validateJson(e.target.value);
                    } else {
                      setJsonError(null);
                    }
                  }}
                  placeholder='{"name": "John", "age": 30, "email": "john@example.com"}'
                  rows={12}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none font-mono text-sm transition-colors duration-200 ${
                    jsonError
                      ? "border-red-300 dark:border-red-600"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {jsonError && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {jsonError}
                  </p>
                )}
                <button
                  onClick={handleJsonToTs}
                  disabled={isConverting || !jsonInput.trim() || !!jsonError}
                  className={`w-full mt-4 px-6 py-3 rounded-lg font-medium text-white transition-all ${
                    isConverting || !jsonInput.trim() || !!jsonError
                      ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                      : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 shadow-md hover:shadow-lg"
                  }`}
                >
                  {isConverting ? "변환 중..." : "TypeScript로 변환"}
                </button>
              </>
            )}

            {conversionDirection === "ts-to-json" && (
              <>
                <textarea
                  value={typescriptInput}
                  onChange={(e) => setTypeScriptInput(e.target.value)}
                  placeholder="interface User {&#10;  name: string;&#10;  age: number;&#10;  email: string;&#10;}"
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none font-mono text-sm transition-colors duration-200"
                />
                <button
                  onClick={handleTsToJson}
                  disabled={isConverting || !typescriptInput.trim()}
                  className={`w-full mt-4 px-6 py-3 rounded-lg font-medium text-white transition-all ${
                    isConverting || !typescriptInput.trim()
                      ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                      : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 shadow-md hover:shadow-lg"
                  }`}
                >
                  {isConverting ? "변환 중..." : "JSON 예시 생성"}
                </button>
              </>
            )}

            {conversionError && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {conversionError}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 결과 패널 */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 transition-colors duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                변환 결과
              </h3>
              {conversionResult && (
                <button
                  onClick={() => handleCopy(conversionResult.result)}
                  className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  복사
                </button>
              )}
            </div>
            {conversionResult ? (
              <div className="relative">
                <pre className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 font-mono text-sm text-gray-800 dark:text-gray-200">
                  <code>{conversionResult.result}</code>
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg">
                <p>변환 결과가 여기에 표시됩니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

