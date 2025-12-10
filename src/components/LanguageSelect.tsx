import React from "react";
import type { Language } from "../types/copy";

interface LanguageSelectProps {
  value: Language | "";
  onChange: (language: Language) => void;
}

const languageOptions: { value: Language; label: string; flag: string }[] = [
  { value: "ko", label: "한국어", flag: "🇰🇷" },
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "ja", label: "日本語", flag: "🇯🇵" },
  { value: "zh", label: "中文", flag: "🇨🇳" },
];

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        답변 언어
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Language)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
      >
        <option value="">언어를 선택하세요</option>
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.flag} {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

