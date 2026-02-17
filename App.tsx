
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import Disclaimer from './components/Disclaimer';
import { translateMedicalText } from './services/geminiService';
import { TranslationResult } from './types';
import { Icons } from './constants';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleTranslate = async (text: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const translation = await translateMedicalText(text);
      setResult(translation);
      // Small delay to allow state to settle before scrolling
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <Header />
      
      <main className="flex-grow pb-20">
        <InputSection onTranslate={handleTranslate} isLoading={isLoading} />
        
        {error && (
          <div className="max-w-4xl mx-auto px-4 mt-6">
            <div className="bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-2xl flex items-center space-x-3 shadow-sm">
              <Icons.AlertCircle />
              <span className="font-semibold">{error}</span>
            </div>
          </div>
        )}

        {isLoading && !result && (
          <div className="max-w-4xl mx-auto px-4 mt-12 text-center animate-pulse">
            <div className="inline-flex p-4 rounded-full bg-teal-50 text-teal-600 mb-4">
              <Icons.Stethoscope />
            </div>
            <h2 className="text-xl font-bold text-teal-800">ClarityCare is thinking...</h2>
            <p className="text-teal-600 mt-2 font-medium">Decoding complex medical terms into simple explanations.</p>
          </div>
        )}

        {result && <OutputSection result={result} />}
        
        <Disclaimer />
      </main>

      <footer className="bg-white border-t border-gray-100 py-10 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-8 h-[1px] bg-gray-200"></div>
            <div className="text-teal-600 scale-75">
              <Icons.Stethoscope />
            </div>
            <div className="w-8 h-[1px] bg-gray-200"></div>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            ClarityCare © {new Date().getFullYear()} – Building bridges in healthcare communication.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors flex items-center space-x-1">
              <span className="text-xs">GitHub Repository</span>
              <Icons.ExternalLink />
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors flex items-center space-x-1">
              <span className="text-xs">Patient Rights Policy</span>
              <Icons.ExternalLink />
            </a>
          </div>
        </div>
      </footer>

      {/* Persistent Call-to-Action / Scroll Indicator */}
      {!result && !isLoading && (
        <div className="fixed bottom-8 right-8 animate-bounce hidden md:block">
          <div className="bg-teal-600 text-white p-3 rounded-full shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
