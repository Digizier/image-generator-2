import React, { useState } from 'react';
import { SendHorizontal, Sparkles } from 'lucide-react';

interface InputFormProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative group">
      <div className="relative flex items-end gap-2 bg-white p-2 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
        <div className="pl-3 py-3 text-slate-400">
          <Sparkles size={20} />
        </div>
        
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the image you want to generate..."
          className="w-full bg-transparent border-0 focus:ring-0 text-slate-800 placeholder:text-slate-400 resize-none py-3 min-h-[60px] max-h-[120px] leading-relaxed"
          rows={1}
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`
            mb-1 p-3 rounded-xl flex items-center justify-center transition-all duration-300
            ${input.trim() && !isLoading 
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'}
          `}
        >
          <SendHorizontal size={20} className={isLoading ? 'animate-ping' : ''} />
        </button>
      </div>
      <p className="mt-2 text-xs text-slate-400 text-right px-2">
        Press <span className="font-mono bg-slate-100 px-1 rounded">Enter</span> to generate
      </p>
    </form>
  );
};