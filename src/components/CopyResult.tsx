import React, { useState } from 'react';
import type { CopyResponse } from '../types/copy';
import { useCopyStore } from '../store/useCopyStore';

interface CopyResultProps {
    data: CopyResponse | null;
    onRegenerate?: () => void;
}

export const CopyResult: React.FC<CopyResultProps> = ({
    data,
    onRegenerate,
}) => {
    const {
        addFavorite,
        component,
        tone,
        service,
        detail,
    } = useCopyStore();

    const [copiedIndex, setCopiedIndex] = useState<
        number | null
    >(null);

    if (!data) {
        return (
            <div className='flex items-center justify-center h-64 text-gray-500 dark:text-gray-400'>
                <p>
                    아직 생성되지 않았어요. 옵션을 선택하고
                    문구를 생성해보세요.
                </p>
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
            alert('즐겨찾기에 추가되었습니다!');
        }
    };

    const handleCopy = async (
        text: string,
        index: number
    ) => {
        if (copiedIndex === index) return; // 이미 복사된 경우 무시

        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
        } catch (err) {
            console.error('복사 실패:', err);
        }
    };

    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                    생성된 문구 ({data.suggestions.length}
                    개)
                </h3>
                {onRegenerate && (
                    <button
                        onClick={onRegenerate}
                        className='px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors'
                    >
                        다시 생성
                    </button>
                )}
            </div>

            <div className='space-y-3'>
                {data.suggestions.map((text, index) => (
                    <div
                        key={index}
                        className='p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow'
                    >
                        <div className='flex items-start justify-between gap-4'>
                            <p className='flex-1 text-gray-800 dark:text-gray-200 leading-relaxed'>
                                {text}
                            </p>
                            <div className='flex gap-2'>
                                <button
                                    onClick={() =>
                                        handleCopy(
                                            text,
                                            index
                                        )
                                    }
                                    disabled={
                                        copiedIndex ===
                                        index
                                    }
                                    className={`px-3 py-1 text-xs rounded transition-all flex items-center gap-1.5 ${
                                        copiedIndex ===
                                        index
                                            ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 cursor-not-allowed'
                                            : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                                    }`}
                                    title={
                                        copiedIndex ===
                                        index
                                            ? '복사됨'
                                            : '복사'
                                    }
                                >
                                    {copiedIndex ===
                                    index ? (
                                        <>
                                            <svg
                                                className='w-3.5 h-3.5'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth={
                                                        2.5
                                                    }
                                                    d='M5 13l4 4L19 7'
                                                />
                                            </svg>
                                            <span>
                                                복사됨
                                            </span>
                                        </>
                                    ) : (
                                        '복사'
                                    )}
                                </button>
                                <button
                                    onClick={() =>
                                        handleFavorite(text)
                                    }
                                    className='px-3 py-1 text-xs bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 rounded transition-colors'
                                    title='즐겨찾기'
                                >
                                    ⭐
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {data.description && (
                <div className='mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400'>
                    <p className='font-medium mb-1'>
                        설명:
                    </p>
                    <p>{data.description}</p>
                </div>
            )}
        </div>
    );
};
