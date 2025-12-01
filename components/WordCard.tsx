import React from 'react';
import { WordItem } from '../types';

interface WordCardProps {
  wordData: WordItem;
  index: number;
}

const WordCard: React.FC<WordCardProps> = ({ wordData, index }) => {
  return (
    <div 
      className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-xl group flex flex-col h-full"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Top Section: Word & Definition */}
      <div className="p-6 border-b border-slate-800 bg-slate-900 relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
           <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
        </div>
        
        <h3 className="text-3xl font-bold text-slate-100 mb-1 tracking-tight">{wordData.word}</h3>
        <p className="text-slate-400 font-mono text-sm mb-4">/{wordData.pronunciation}/</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-slate-800 text-amber-500 text-xs font-bold rounded-full border border-slate-700">
            {wordData.breakdown}
          </span>
        </div>
        
        <p className="text-slate-300 text-lg leading-relaxed">
          {wordData.definition}
        </p>
      </div>

      {/* Bottom Section: CEO Quote */}
      <div className="p-6 bg-gradient-to-b from-slate-900 to-slate-950 flex-grow flex flex-col justify-end relative overflow-hidden">
        {/* Decorative Quote Mark */}
        <div className="absolute top-2 left-2 text-6xl text-slate-800 font-serif leading-none select-none">“</div>
        
        <div className="relative z-10 pl-4 border-l-2 border-amber-600/50">
          <p className="text-amber-100/90 font-serif-sc text-lg italic leading-relaxed">
            {wordData.ceoQuote}
          </p>
          <div className="mt-3 flex items-center gap-2">
             <div className="h-px w-8 bg-amber-600/50"></div>
             <span className="text-xs text-amber-600 uppercase font-bold tracking-widest">CEO Directive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCard;