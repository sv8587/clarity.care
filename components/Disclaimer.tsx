
import React from 'react';
import { Icons } from '../constants';

const Disclaimer: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 my-8">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3">
        <div className="text-amber-600 mt-1 flex-shrink-0">
          <Icons.AlertCircle />
        </div>
        <p className="text-amber-800 text-xs md:text-sm font-medium leading-relaxed">
          <strong>Medical Disclaimer:</strong> This tool is powered by AI and is for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this application.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
