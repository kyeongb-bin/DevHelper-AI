import React from "react";
import type { CopyResponse } from "../types/copy";
import { useCopyStore } from "../store/useCopyStore";

interface CopyResultProps {
  data: CopyResponse | null;
  onRegenerate?: () => void;
}

export const CopyResult: React.FC<CopyResultProps> = ({
  data,
  onRegenerate,
}) => {
  const { addFavorite, component, tone, service, detail } = useCopyStore();

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>아직 생성되지 않았어요. 옵션을 선택하고 문구를 생성해보세요.</p>
      </div>
    );
  }

  const handleFavorite = (suggestion: string) => {
    if (component && tone && service) {
      addFavorite({
        component: component as any,
        tone: tone as any,
        service: service as any,
        detail,
        suggestions: [suggestion],
      });
      alert("즐겨찾기에 추가되었습니다!");
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("클립보드에 복사되었습니다!");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          생성된 문구 ({data.suggestions.length}개)
        </h3>
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            다시 생성
          </button>
        )}
      </div>

      <div className="space-y-3">
        {data.suggestions.map((text, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="flex-1 text-gray-800 leading-relaxed">{text}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(text)}
                  className="px-3 py-1 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                  title="복사"
                >
                  복사
                </button>
                <button
                  onClick={() => handleFavorite(text)}
                  className="px-3 py-1 text-xs bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded transition-colors"
                  title="즐겨찾기"
                >
                  ⭐
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.description && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p className="font-medium mb-1">설명:</p>
          <p>{data.description}</p>
        </div>
      )}
    </div>
  );
};

