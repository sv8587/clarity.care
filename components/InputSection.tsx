
import React, { useState } from 'react';
import { APP_CONFIG } from '../constants';

interface InputSectionProps {
  onTranslate: (text: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onTranslate, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onTranslate(text);
    }
  };

  return (
    <section className="max-w-4xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Patient's Translation Tool</h2>
          <p className="text-gray-500 text-sm">
            Paste your complex medical diagnosis, prescription details, or doctor's notes below to translate them into plain English.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              className="w-full h-48 p-4 bg-teal-50/30 border border-teal-100 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder:text-gray-400 resize-none"
              placeholder="Example: 'Patient presents with acute myocardial infarction with evidence of ST-segment elevation on EKG...'"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={APP_CONFIG.MAX_CHAR_LIMIT}
              disabled={isLoading}
            />
            <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-xs font-medium text-gray-400">
              <span className={text.length >= APP_CONFIG.MAX_CHAR_LIMIT ? 'text-red-500' : ''}>
                {text.length}
              </span>
              <span>/</span>
              <span>{APP_CONFIG.MAX_CHAR_LIMIT}</span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-teal-100 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Consulting ClarityCare...</span>
              </>
            ) : (
              <span>Translate to Plain English</span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default InputSection;
