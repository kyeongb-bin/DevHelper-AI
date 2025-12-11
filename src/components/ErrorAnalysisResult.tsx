import React from "react";
import type { ErrorAnalysisResponse } from "../types/error";

interface ErrorAnalysisResultProps {
  data: ErrorAnalysisResponse | null;
  onRegenerate?: () => void;
}

export const ErrorAnalysisResult: React.FC<ErrorAnalysisResultProps> = ({
  data,
  onRegenerate,
}) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        <p>에러 메시지를 입력하고 분석해보세요.</p>
      </div>
    );
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("클립보드에 복사되었습니다!");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">에러 분석 결과</h3>
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          >
            다시 분석
          </button>
        )}
      </div>

      {/* 원인 요약 */}
      <div className="p-4 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50 dark:bg-orange-900/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-orange-900 dark:text-orange-300 mb-2 flex items-center gap-2">
              <span>🔍</span> 원인 요약
            </h4>
            <p className="text-orange-800 dark:text-orange-200 leading-relaxed whitespace-pre-wrap">
              {data.summary}
            </p>
          </div>
          <button
            onClick={() => handleCopy(data.summary)}
            className="px-3 py-1 text-xs bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/60 rounded transition-colors flex-shrink-0"
            title="복사"
          >
            복사
          </button>
        </div>
      </div>

      {/* 해결방법 */}
      <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2 flex items-center gap-2">
              <span>💡</span> 해결방법
            </h4>
            <p className="text-green-800 dark:text-green-200 leading-relaxed whitespace-pre-wrap">
              {data.solution}
            </p>
          </div>
          <button
            onClick={() => handleCopy(data.solution)}
            className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/60 rounded transition-colors flex-shrink-0"
            title="복사"
          >
            복사
          </button>
        </div>
      </div>
    </div>
  );
};

