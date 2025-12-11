import React, { useState } from 'react';
import { SelectBox } from '../components/SelectBox';
import { TextInput } from '../components/TextInput';
import { GenerateButton } from '../components/GenerateButton';
import { CopyResult } from '../components/CopyResult';
import { ErrorInput } from '../components/ErrorInput';
import { LanguageSelect } from '../components/LanguageSelect';
import { ErrorAnalysisResult } from '../components/ErrorAnalysisResult';
import { JsonConverter } from '../components/JsonConverter';
import { ThemeToggle } from '../components/ThemeToggle';
import { DailyConcept } from '../components/DailyConcept';
import { useCopyStore } from '../store/useCopyStore';
import { useErrorStore } from '../store/useErrorStore';
import { generateCopy } from '../api/generateCopy';
import { analyzeError } from '../api/analyzeError';
import type {
    UIComponent,
    Tone,
    ServiceType,
} from '../types/copy';
import type { Language } from '../types/common';

const componentOptions: {
    value: UIComponent;
    label: string;
}[] = [
    { value: 'button', label: '버튼' },
    { value: 'modal', label: '모달' },
    { value: 'notification', label: '알림' },
    { value: 'error', label: '에러 메시지' },
    { value: 'info', label: '안내문구' },
    { value: 'dialog', label: '확인/취소 다이얼로그' },
];

const toneOptions: { value: Tone; label: string }[] = [
    { value: 'friendly', label: '친절한 톤' },
    { value: 'formal', label: '격식 있는 톤' },
    { value: 'funny', label: '재치 있는 톤' },
    { value: 'neutral', label: '중립적인 톤' },
];

const serviceOptions: {
    value: ServiceType;
    label: string;
}[] = [
    { value: 'delivery', label: '배달' },
    { value: 'commerce', label: '커머스' },
    { value: 'social', label: '소셜' },
    { value: 'finance', label: '금융' },
    { value: 'healthcare', label: '헬스케어' },
];

export const Home: React.FC = () => {
    const [activeTab, setActiveTab] = useState<
        'copy' | 'error' | 'json'
    >('copy');

    // 카피 생성 관련 스토어
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
    } = useCopyStore();

    // 에러 분석 관련 스토어
    const {
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
    } = useErrorStore();

    const handleGenerate = async () => {
        if (!component || !tone || !service) {
            alert('모든 옵션을 선택해주세요.');
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
                detail: detail || '상황 설명 없음',
            });
            setResult(response);
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : '문구 생성에 실패했습니다.';
            setError(errorMessage);
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleRegenerate = () => {
        handleGenerate();
    };

    const isGenerateDisabled =
        !component || !tone || !service || isLoading;

    // 에러 분석 핸들러
    const handleAnalyzeError = async () => {
        if (!errorMessage || !errorLanguage) {
            alert(
                '에러 메시지와 언어를 모두 입력해주세요.'
            );
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
                err instanceof Error
                    ? err.message
                    : '에러 분석에 실패했습니다.';
            setAnalysisError(errorMessage);
            alert(errorMessage);
        } finally {
            setAnalyzing(false);
        }
    };

    const handleRegenerateAnalysis = () => {
        handleAnalyzeError();
    };

    const isAnalyzeDisabled =
        !errorMessage || !errorLanguage || isAnalyzing;

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200'>
            {/* 헤더 */}
            <header className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200'>
                <div className='max-w-7xl mx-auto px-4 py-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                                DevHelper AI
                            </h1>
                            <p className='text-gray-600 dark:text-gray-400 mt-1'>
                                개발자를 위한 AI 도우미 - UX
                                카피 생성, 에러 분석, JSON
                                변환
                            </p>
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* 오늘의 핵심 개념 */}
            <div className='max-w-7xl mx-auto px-4 pt-6'>
                <DailyConcept />
            </div>

            {/* 탭 네비게이션 */}
            <div className='max-w-7xl mx-auto px-4 pt-6'>
                <div className='flex gap-2 border-b border-gray-200 dark:border-gray-700'>
                    <button
                        onClick={() => setActiveTab('copy')}
                        className={`px-6 py-3 font-medium transition-colors ${
                            activeTab === 'copy'
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                    >
                        UX 카피 생성
                    </button>
                    <button
                        onClick={() =>
                            setActiveTab('error')
                        }
                        className={`px-6 py-3 font-medium transition-colors ${
                            activeTab === 'error'
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                    >
                        에러 메시지 분석
                    </button>
                    <button
                        onClick={() => setActiveTab('json')}
                        className={`px-6 py-3 font-medium transition-colors ${
                            activeTab === 'json'
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                    >
                        JSON ↔ TypeScript
                    </button>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <main className='max-w-7xl mx-auto px-4 py-8'>
                {activeTab === 'copy' ? (
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        {/* 좌측 패널 - 옵션 선택 */}
                        <div className='space-y-6'>
                            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 transition-colors duration-200'>
                                <h2 className='text-xl font-semibold text-gray-800 dark:text-white mb-6'>
                                    옵션 선택
                                </h2>
                                <div className='space-y-4'>
                                    <SelectBox
                                        label='UI 컴포넌트'
                                        value={component}
                                        options={
                                            componentOptions
                                        }
                                        onChange={(value) =>
                                            setComponent(
                                                value as UIComponent
                                            )
                                        }
                                    />
                                    <SelectBox
                                        label='톤 & 매너'
                                        value={tone}
                                        options={
                                            toneOptions
                                        }
                                        onChange={(value) =>
                                            setTone(
                                                value as Tone
                                            )
                                        }
                                    />
                                    <SelectBox
                                        label='서비스 유형'
                                        value={service}
                                        options={
                                            serviceOptions
                                        }
                                        onChange={(value) =>
                                            setService(
                                                value as ServiceType
                                            )
                                        }
                                    />
                                    <TextInput
                                        label='상황/세부 설명'
                                        value={detail}
                                        onChange={setDetail}
                                        placeholder='예: 구매하기 버튼, 결제 실패 에러 메시지 등'
                                        rows={4}
                                    />
                                    <GenerateButton
                                        onClick={
                                            handleGenerate
                                        }
                                        isLoading={
                                            isLoading
                                        }
                                        disabled={
                                            isGenerateDisabled
                                        }
                                    />
                                </div>
                                {error && (
                                    <div className='mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
                                        <p className='text-sm text-red-600 dark:text-red-400'>
                                            {error}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 우측 패널 - 결과 */}
                        <div className='space-y-6'>
                            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 transition-colors duration-200'>
                                <h2 className='text-xl font-semibold text-gray-800 dark:text-white mb-6'>
                                    생성 결과
                                </h2>
                                <CopyResult
                                    data={result}
                                    onRegenerate={
                                        handleRegenerate
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'error' ? (
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        {/* 좌측 패널 - 에러 메시지 입력 */}
                        <div className='space-y-6'>
                            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 transition-colors duration-200'>
                                <h2 className='text-xl font-semibold text-gray-800 dark:text-white mb-6'>
                                    에러 메시지 입력
                                </h2>
                                <div className='space-y-4'>
                                    <ErrorInput
                                        value={errorMessage}
                                        onChange={
                                            setErrorMessage
                                        }
                                    />
                                    <LanguageSelect
                                        value={
                                            errorLanguage
                                        }
                                        onChange={
                                            setErrorLanguage
                                        }
                                    />
                                    <GenerateButton
                                        onClick={
                                            handleAnalyzeError
                                        }
                                        isLoading={
                                            isAnalyzing
                                        }
                                        disabled={
                                            isAnalyzeDisabled
                                        }
                                    />
                                </div>
                                {analysisError && (
                                    <div className='mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
                                        <p className='text-sm text-red-600 dark:text-red-400'>
                                            {analysisError}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 우측 패널 - 분석 결과 */}
                        <div className='space-y-6'>
                            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg p-6 transition-colors duration-200'>
                                <h2 className='text-xl font-semibold text-gray-800 dark:text-white mb-6'>
                                    분석 결과
                                </h2>
                                <ErrorAnalysisResult
                                    data={errorAnalysis}
                                    onRegenerate={
                                        handleRegenerateAnalysis
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <JsonConverter />
                )}
            </main>

            {/* 푸터 */}
            <footer className='mt-12 py-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200'>
                <div className='max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm'>
                    <p>
                        DevHelper AI - 개발자를 위한 AI
                        도우미
                    </p>
                </div>
            </footer>
        </div>
    );
};
