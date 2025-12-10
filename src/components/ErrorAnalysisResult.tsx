import React from "react";
import type { ErrorAnalysisResponse } from "../types/copy";

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
      <div className="flex items-center justify-center h-64 text-gray-500">
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
        <h3 className="text-lg font-semibold text-gray-800">에러 분석 결과</h3>
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            다시 분석
          </button>
        )}
      </div>

      {/* 원인 요약 */}
      <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
              <span>🔍</span> 원인 요약
            </h4>
            <p className="text-orange-800 leading-relaxed whitespace-pre-wrap">
              {data.summary}
            </p>
          </div>
          <button
            onClick={() => handleCopy(data.summary)}
            className="px-3 py-1 text-xs bg-orange-100 text-orange-700 hover:bg-orange-200 rounded transition-colors flex-shrink-0"
            title="복사"
          >
            복사
          </button>
        </div>
      </div>

      {/* 해결방법 */}
      <div className="p-4 border border-green-200 rounded-lg bg-green-50">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
              <span>💡</span> 해결방법
            </h4>
            <p className="text-green-800 leading-relaxed whitespace-pre-wrap">
              {data.solution}
            </p>
          </div>
          <button
            onClick={() => handleCopy(data.solution)}
            className="px-3 py-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 rounded transition-colors flex-shrink-0"
            title="복사"
          >
            복사
          </button>
        </div>
      </div>
    </div>
  );
};

