import React from "react";

interface ErrorInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const ErrorInput: React.FC<ErrorInputProps> = ({
  value,
  onChange,
  placeholder = "에러 메시지를 입력하세요...",
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        에러 메시지
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={6}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none font-mono text-sm transition-colors duration-200"
      />
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        발생한 에러 메시지를 복사해서 붙여넣으세요
      </p>
    </div>
  );
};

