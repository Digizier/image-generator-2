import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-8 border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg text-white">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              PixelPrompt
            </h1>
            <p className="text-xs text-slate-500 font-medium">Powered by N8N</p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
          <Zap size={16} className="text-amber-500 fill-amber-500" />
          <span>Fast Generation</span>
        </div>
      </div>
    </header>
  );
};