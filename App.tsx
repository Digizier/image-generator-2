import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ImageDisplay } from './components/ImageDisplay';
import { generateImageFromWebhook } from './services/webhookService';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (text: string) => {
    setLoading(true);
    setError(null);
    setPrompt(text);
    setResultImage(null); // Clear previous image while loading

    try {
      const imageUrl = await generateImageFromWebhook(text);
      setResultImage(imageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-10">
        
        {/* Hero Section */}
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Turn text into <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Visuals</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            Describe your vision and let our AI engine powered by N8N bring it to life in seconds.
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full">
          <InputForm onSubmit={handleGenerate} isLoading={loading} />
        </div>

        {/* Error Feedback */}
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl flex items-start gap-3 animate-fade-in">
            <AlertCircle className="shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold">Generation Failed</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Display Section */}
        <div className="w-full">
          <ImageDisplay 
            imageUrl={resultImage} 
            loading={loading} 
            prompt={prompt} 
          />
        </div>
      </main>

      <footer className="py-6 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} PixelPrompt. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
};

export default App;