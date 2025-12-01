import React, { useState } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import RootInfoDisplay from './components/RootInfoDisplay';
import WordCard from './components/WordCard';
import LoadingView from './components/LoadingView';
import QuizSection from './components/QuizSection';
import { generateRootData } from './services/geminiService';
import { RootData, AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [data, setData] = useState<RootData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (term: string) => {
    setState(AppState.LOADING);
    setError(null);
    setData(null);

    try {
      const result = await generateRootData(term);
      setData(result);
      setState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("总裁很忙，服务器此时没有响应。请稍后再试。(Did you set the API KEY?)");
      setState(AppState.ERROR);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
      <Header />
      
      <main className="container mx-auto px-4">
        <SearchSection onSearch={handleSearch} state={state} />

        {state === AppState.LOADING && <LoadingView />}

        {state === AppState.ERROR && (
          <div className="max-w-md mx-auto mt-10 p-6 bg-red-900/20 border border-red-800 rounded-xl text-center">
            <h3 className="text-red-500 font-bold mb-2 text-xl font-serif-sc">操作失败</h3>
            <p className="text-red-300/80">{error}</p>
          </div>
        )}

        {state === AppState.SUCCESS && data && (
          <div className="animate-fade-in space-y-12">
            <RootInfoDisplay root={data.root} meaning={data.meaning} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.words.map((word, index) => (
                <WordCard key={index} wordData={word} index={index} />
              ))}
            </div>

            {/* Quiz Section Integration */}
            {data.quiz && data.quiz.length > 0 && (
              <QuizSection questions={data.quiz} />
            )}

            <div className="text-center pt-10">
              <p className="text-slate-600 text-sm font-serif-sc">
                * 解释权归总裁办所有 | 学习是给自己学的，不是给我学的 *
              </p>
            </div>
          </div>
        )}

        {state === AppState.IDLE && (
          <div className="text-center mt-20 opacity-30 select-none pointer-events-none">
            <h2 className="text-9xl font-black text-slate-800">CEO</h2>
            <p className="text-2xl font-serif-sc mt-4 text-slate-700">等待您的汇报...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;