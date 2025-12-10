import React, { useState, useRef, useEffect } from 'react';

interface SelectBoxProps {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    placeholder?: string;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
    label,
    value,
    options,
    onChange,
    placeholder = '선택해주세요',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 선택된 옵션의 라벨 찾기
    const selectedOption = options.find(opt => opt.value === value);
    const displayText = selectedOption ? selectedOption.label : placeholder;

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className='w-full' ref={dropdownRef}>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                {label}
            </label>
            <div className='relative'>
                {/* 드롭다운 버튼 */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-2 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 flex items-center justify-between ${
                        value 
                            ? 'border-gray-300 dark:border-gray-600' 
                            : 'border-gray-300 dark:border-gray-600'
                    }`}
                >
                    <span className={value ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                        {displayText}
                    </span>
                    <svg
                        className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                            isOpen ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {/* 드롭다운 메뉴 */}
                {isOpen && (
                    <div className='absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto'>
                        {/* 플레이스홀더 옵션 */}
                        <button
                            type="button"
                            onClick={() => handleSelect('')}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                                !value 
                                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                                    : 'text-gray-500 dark:text-gray-400'
                            }`}
                        >
                            {placeholder}
                        </button>
                        
                        {/* 옵션 리스트 */}
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                                    value === option.value
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-gray-900 dark:text-white'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
