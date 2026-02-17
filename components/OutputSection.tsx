
import React, { useState } from 'react';
import { TranslationResult, TabType, TabConfig } from '../types';
import { Icons } from '../constants';

interface OutputSectionProps {
  result: TranslationResult;
}

const OutputSection: React.FC<OutputSectionProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<TabType>('explanation');

  const tabs: TabConfig[] = [
    { id: 'explanation', label: 'Plain English', icon: <Icons.FileText /> },
    { id: 'summary', label: 'Key Points', icon: <Icons.Info /> },
    { id: 'behavior', label: 'Do\'s & Don\'ts', icon: <Icons.CheckCircle /> },
    { id: 'questions', label: 'Questions to Ask', icon: <Icons.HelpCircle /> },
    { id: 'reassurance', label: 'Empowerment', icon: <Icons.Heart /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'explanation':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800">What this means for you</h3>
            <p className="text-lg leading-relaxed text-gray-600">{result.simpleExplanation}</p>
          </div>
        );
      case 'summary':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800">Key Takeaways</h3>
            <ul className="space-y-3">
              {result.summary.map((point, i) => (
                <li key={i} className="flex items-start space-x-3 bg-teal-50/50 p-4 rounded-xl border border-teal-50">
                  <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'behavior':
        return (
          <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-teal-700 flex items-center space-x-2">
                <Icons.CheckCircle />
                <span>What to Do</span>
              </h3>
              <ul className="space-y-2">
                {result.dos.map((item, i) => (
                  <li key={i} className="bg-teal-50 p-3 rounded-lg text-teal-800 text-sm font-medium border-l-4 border-teal-500">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-red-700 flex items-center space-x-2">
                <Icons.AlertCircle />
                <span>What to Avoid</span>
              </h3>
              <ul className="space-y-2">
                {result.donts.map((item, i) => (
                  <li key={i} className="bg-red-50 p-3 rounded-lg text-red-800 text-sm font-medium border-l-4 border-red-500">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'questions':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800">Talk to your doctor about...</h3>
            <div className="grid gap-3">
              {result.questionsToAsk.map((q, i) => (
                <div key={i} className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-blue-900 italic font-medium">
                  "{q}"
                </div>
              ))}
            </div>
          </div>
        );
      case 'reassurance':
        return (
          <div className="space-y-6 animate-fadeIn text-center py-8">
            <div className="inline-flex p-4 rounded-full bg-pink-50 text-pink-600 mb-2">
              <Icons.Heart />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">You are not alone</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed italic">
              "{result.reassurance}"
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="max-w-4xl mx-auto my-12 px-4 scroll-mt-24" id="results">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Mobile Tabs */}
        <div className="md:hidden flex overflow-x-auto border-b border-gray-100 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-none px-6 py-4 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/20'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="scale-75">{tab.icon}</span>
                <span className="whitespace-nowrap">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-5 px-4 text-sm font-bold flex items-center justify-center space-x-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-teal-700 bg-teal-50/30 shadow-[inset_0_-2px_0_0_#0d9488]'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-8 md:p-12 min-h-[400px]">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default OutputSection;
