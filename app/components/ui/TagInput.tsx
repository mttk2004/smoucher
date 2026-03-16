import React, { useState, KeyboardEvent } from 'react';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
  error?: string;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, setTags, placeholder, error }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = inputValue.trim();
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
        setInputValue("");
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex flex-wrap items-center gap-2 w-full min-h-[44px] rounded-lg border ${error ? 'border-red-500 focus-within:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus-within:ring-primary'} bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 transition-all`}
      >
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-semibold">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-primary hover:text-primary/70 focus:outline-none flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent min-w-[120px] outline-none text-slate-700 dark:text-slate-300 placeholder:text-slate-400"
        />
      </div>
      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </div>
  );
};
