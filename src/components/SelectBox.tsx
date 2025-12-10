import React from 'react';

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
    return (
        <div className='w-full'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200'
            >
                <option value=''>{placeholder}</option>
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
