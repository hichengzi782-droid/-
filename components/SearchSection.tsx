import React, { useState } from 'react';
import { AppState } from '../types';

interface SearchSectionProps {
  onSearch: (term: string) => void;
  state: AppState;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, state }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  const handleRandom = () => {
    onSearch("pick a random common root");
  };

  const isLoading = state === AppState.LOADING;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入词根 (如: spect, dict, vis)..."
            className="w-full bg-slate-900 border-2 border-slate-700 text-slate-100 px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 transition-colors text-lg placeholder-slate-600 font-serif-sc"
            disabled={isLoading}
          />
          <div className="absolute inset-0 rounded-xl bg-amber-500/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)] font-serif-sc"
        >
          {isLoading ? '批阅中...' : '呈上来'}
        </button>
        
        <button
          type="button"
          onClick={handleRandom}
          disabled={isLoading}
          className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 font-bold py-4 px-6 rounded-xl transition-colors border-2 border-slate-700 hover:border-slate-600 font-serif-sc"
        >
          🎲 随便挑
        </button>
      </form>
    </div>
  );
};

export default SearchSection;