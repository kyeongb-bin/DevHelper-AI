import React, { useState } from "react";
import { SelectBox } from "../components/SelectBox";
import { TextInput } from "../components/TextInput";
import { GenerateButton } from "../components/GenerateButton";
import { CopyResult } from "../components/CopyResult";
import { ErrorInput } from "../components/ErrorInput";
import { LanguageSelect } from "../components/LanguageSelect";
import { ErrorAnalysisResult } from "../components/ErrorAnalysisResult";
import { useCopyStore } from "../store/useCopyStore";
import { generateCopy } from "../api/generateCopy";
import { analyzeError } from "../api/analyzeError";
import type { UIComponent, Tone, ServiceType, Language } from "../types/copy";

const componentOptions: { value: UIComponent; label: string }[] = [
  { value: "button", label: "버튼" },
  { value: "modal", label: "모달" },
  { value: "notification", label: "알림" },
  { value: "error", label: "에러 메시지" },
  { value: "info", label: "안내문구" },
  { value: "dialog", label: "확인/취소 다이얼로그" },
];

const toneOptions: { value: Tone; label: string }[] = [
  { value: "friendly", label: "친절한 톤" },
  { value: "formal", label: "격식 있는 톤" },
  { value: "funny", label: "재치 있는 톤" },
  { value: "neutral", label: "중립적인 톤" },
];

const serviceOptions: { value: ServiceType; label: string }[] = [
  { value: "delivery", label: "배달" },
  { value: "commerce", label: "커머스" },
  { value: "social", label: "소셜" },
  { value: "finance", label: "금융" },
  { value: "healthcare", label: "헬스케어" },
];

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"copy" | "error">("copy");

  const {
    component,
    tone,
    service,
    detail,
    result,
    isLoading,
    error,
    setComponent,
    setTone,
    setService,
    setDetail,
    setResult,
    setLoading,
    setError,
    errorMessage,
    errorLanguage,
    errorAnalysis,
    isAnalyzing,
    analysisError,
    setErrorMessage,
    setErrorLanguage,
    setErrorAnalysis,
    setAnalyzing,
    setAnalysisError,
  } = useCopyStore();

  const handleGenerate = async () => {
    if (!component || !tone || !service) {
      alert("모든 옵션을 선택해주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await generateCopy({
        component: component as UIComponent,
        tone: tone as Tone,
        service: service as ServiceType,
        detail: detail || "상황 설명 없음",
      });
      setResult(response);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "문구 생성에 실패했습니다.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const isGenerateDisabled = !component || !tone || !service || isLoading;

  // 에러 분석 핸들러
  const handleAnalyzeError = async () => {
    if (!errorMessage || !errorLanguage) {
      alert("에러 메시지와 언어를 모두 입력해주세요.");
      return;
    }

    setAnalyzing(true);
    setAnalysisError(null);
    setErrorAnalysis(null);

    try {
      const response = await analyzeError({
        errorMessage,
        language: errorLanguage as Language,
      });
      setErrorAnalysis(response);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "에러 분석에 실패했습니다.";
      setAnalysisError(errorMessage);
      alert(errorMessage);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleRegenerateAnalysis = () => {
    handleAnalyzeError();
  };

  const isAnalyzeDisabled = !errorMessage || !errorLanguage || isAnalyzing;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">DevHelper AI</h1>
          <p className="text-gray-600 mt-1">
            개발자를 위한 AI 도우미 - UX 카피 생성 & 에러 메시지 분석
          </p>
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex gap-2 border-b">
          <button
            onClick={() => setActiveTab("copy")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "copy"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            UX 카피 생성
          </button>
          <button
            onClick={() => setActiveTab("error")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "error"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            에러 메시지 분석
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "copy" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 좌측 패널 - 옵션 선택 */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  옵션 선택
                </h2>
                <div className="space-y-4">
                  <SelectBox
                    label="UI 컴포넌트"
                    value={component}
                    options={componentOptions}
                    onChange={(value) => setComponent(value as UIComponent)}
                  />
                  <SelectBox
                    label="톤 & 매너"
                    value={tone}
                    options={toneOptions}
                    onChange={(value) => setTone(value as Tone)}
                  />
                  <SelectBox
                    label="서비스 유형"
                    value={service}
                    options={serviceOptions}
                    onChange={(value) => setService(value as ServiceType)}
                  />
                  <TextInput
                    label="상황/세부 설명"
                    value={detail}
                    onChange={setDetail}
                    placeholder="예: 구매하기 버튼, 결제 실패 에러 메시지 등"
                    rows={4}
                  />
                  <GenerateButton
                    onClick={handleGenerate}
                    isLoading={isLoading}
                    disabled={isGenerateDisabled}
                  />
                </div>
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 우측 패널 - 결과 */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  생성 결과
                </h2>
                <CopyResult data={result} onRegenerate={handleRegenerate} />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 좌측 패널 - 에러 메시지 입력 */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  에러 메시지 입력
                </h2>
                <div className="space-y-4">
                  <ErrorInput
                    value={errorMessage}
                    onChange={setErrorMessage}
                  />
                  <LanguageSelect
                    value={errorLanguage}
                    onChange={setErrorLanguage}
                  />
                  <GenerateButton
                    onClick={handleAnalyzeError}
                    isLoading={isAnalyzing}
                    disabled={isAnalyzeDisabled}
                  />
                </div>
                {analysisError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{analysisError}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 우측 패널 - 분석 결과 */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  분석 결과
                </h2>
                <ErrorAnalysisResult
                  data={errorAnalysis}
                  onRegenerate={handleRegenerateAnalysis}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="mt-12 py-6 border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>DevHelper AI - 개발자를 위한 AI 도우미</p>
        </div>
      </footer>
    </div>
  );
};

