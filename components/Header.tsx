
import React from 'react';
import { Icons } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-100 py-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-teal-600 p-2.5 rounded-xl text-white shadow-lg shadow-teal-100">
            <Icons.Stethoscope />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Clarity<span className="text-teal-600">Care</span>
            </h1>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
              AI Health Literacy Translator
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="text-sm text-gray-400 font-medium">Empowering patients with understanding.</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
