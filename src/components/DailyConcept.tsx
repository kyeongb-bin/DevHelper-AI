import React, { useEffect, useState } from "react";
import { useDailyConcept, shouldFetchConcept } from "../store/useDailyConcept";
import { generateDailyConcept } from "../api/generateConcept";

export const DailyConcept: React.FC = () => {
  const { concept, isLoading, error, setConcept, setLoading, setError } = useDailyConcept();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // 오늘의 개념이 없거나 날짜가 다르면 생성
    if (!concept && shouldFetchConcept() && !isLoading) {
      loadConcept();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadConcept = async () => {
    setLoading(true);
    setError(null);

    try {
      const today = new Date().toISOString().split('T')[0];
      const newConcept = await generateDailyConcept();
      setConcept(newConcept, today);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "개념을 불러오는데 실패했습니다.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <div className="animate-spin h-4 w-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">오늘의 핵심 개념 생성 중...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
          <button
            onClick={loadConcept}
            className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!concept) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <button
          onClick={loadConcept}
          className="w-full text-left text-sm text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
        >
          💡 오늘의 핵심 개념 불러오기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💡</span>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              오늘의 핵심 개념
            </h3>
          </div>
          <div
            className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap ${
              isExpanded ? "" : "line-clamp-2"
            }`}
            dangerouslySetInnerHTML={{
              __html: concept
                .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
                .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
                .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded text-xs font-mono">$1</code>')
                .replace(/^### (.+)$/gm, '<h3 class="font-bold text-base text-gray-900 dark:text-white mt-2 mb-1">$1</h3>')
                .replace(/^## (.+)$/gm, '<h2 class="font-bold text-lg text-gray-900 dark:text-white mt-3 mb-2">$1</h2>')
                .replace(/^# (.+)$/gm, '<h1 class="font-bold text-xl text-gray-900 dark:text-white mt-4 mb-2">$1</h1>')
                .replace(/\n/g, '<br />')
            }}
          />
          {concept.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              {isExpanded ? "접기" : "더보기"}
            </button>
          )}
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(concept);
            alert("클립보드에 복사되었습니다!");
          }}
          className="flex-shrink-0 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors"
          title="복사"
        >
          복사
        </button>
      </div>
    </div>
  );
};

