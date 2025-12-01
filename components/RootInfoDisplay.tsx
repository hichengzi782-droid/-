import React from 'react';

interface RootInfoDisplayProps {
  root: string;
  meaning: string;
}

const RootInfoDisplay: React.FC<RootInfoDisplayProps> = ({ root, meaning }) => {
  return (
    <div className="text-center py-8 animate-fade-in-up">
      <div className="inline-block relative">
        <span className="absolute -inset-1 rounded-lg blur opacity-25 bg-amber-500 transition duration-1000 group-hover:duration-200"></span>
        <div className="relative px-8 py-4 bg-slate-900 ring-1 ring-slate-700/50 rounded-lg">
          <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 font-serif-sc mb-2">
            {root}
          </h2>
          <p className="text-xl text-slate-400 font-serif-sc">
            含义：<span className="text-amber-100 font-bold">{meaning}</span>
          </p>
        </div>
      </div>
      <div className="mt-6 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
    </div>
  );
};

export default RootInfoDisplay;