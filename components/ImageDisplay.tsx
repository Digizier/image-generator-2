import React, { useState } from 'react';
import { Download, ExternalLink, Image as ImageIcon, RefreshCw, Sparkles } from 'lucide-react';

interface ImageDisplayProps {
  imageUrl: string | null;
  loading: boolean;
  prompt: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, loading, prompt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset loaded state when url changes
  React.useEffect(() => {
    setIsLoaded(false);
  }, [imageUrl]);

  if (loading) {
    return (
      <div className="w-full aspect-square sm:aspect-video rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        <div className="z-10 flex flex-col items-center gap-4 p-6 text-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-primary animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="text-secondary animate-pulse" size={20} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-slate-700">Generating Masterpiece</h3>
            <p className="text-slate-500 text-sm">Waiting for webhook response...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="w-full aspect-square sm:aspect-video rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-slate-400 p-8">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <ImageIcon size={40} className="text-slate-300" />
        </div>
        <p className="font-medium text-lg">No image generated yet</p>
        <p className="text-sm">Enter a detailed prompt above to get started</p>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-xl shadow-indigo-100 ring-1 ring-slate-900/5 bg-white group">
      {/* Loading Skeleton underneath */}
      <div className={`absolute inset-0 bg-slate-100 flex items-center justify-center transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}>
        <RefreshCw className="animate-spin text-slate-400" />
      </div>

      <img 
        src={imageUrl} 
        alt={prompt}
        className={`w-full h-auto object-cover transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Overlay Actions */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white/90 text-sm font-medium line-clamp-2 mb-4">{prompt}</p>
          <div className="flex gap-3">
            <a 
              href={imageUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-white text-slate-900 py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink size={16} />
              Open Full Size
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
