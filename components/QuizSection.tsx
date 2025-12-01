import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizSectionProps {
  questions: QuizQuestion[];
}

const QuizSection: React.FC<QuizSectionProps> = ({ questions }) => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleStart = () => {
    setStarted(true);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedOption(null);
  };

  const handleAnswer = (option: string) => {
    if (selectedOption) return; // Prevent multiple clicks
    setSelectedOption(option);
    
    if (option === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const getResultTitle = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "总裁夫人 (CEO's Wife)";
    if (percentage >= 60) return "贴身秘书 (Personal Secretary)";
    return "保洁小妹 (Office Cleaner)";
  };

  const getResultComment = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "很好，这张黑卡拿去随便刷。";
    if (percentage >= 60) return "勉强及格，今晚留下来加班补习。";
    return "这点词汇量，你在挑战我的底线？";
  };

  if (!started) {
    return (
      <div className="max-w-3xl mx-auto mt-16 text-center animate-fade-in-up">
        <div className="bg-slate-900/80 border border-amber-600/30 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-amber-600/5 opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <h3 className="text-3xl font-serif-sc font-bold text-amber-500 mb-4">
            霸总的随堂测试
          </h3>
          <p className="text-slate-400 mb-8 font-serif-sc text-lg">
            "刚才记住了吗？不要让我发现你在敷衍我。"
          </p>
          <button
            onClick={handleStart}
            className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-lg py-3 px-10 rounded-full transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95"
          >
            接受考验
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto mt-16 text-center animate-fade-in">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-amber-500/50 rounded-2xl p-10 shadow-2xl relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-amber-500 text-slate-900 font-bold px-6 py-2 rounded-full border-4 border-slate-900">
            测试结果
          </div>
          
          <h2 className="text-5xl font-black text-amber-400 mt-4 mb-2 font-serif-sc">
            {score} / {questions.length}
          </h2>
          
          <div className="text-2xl font-serif-sc text-slate-200 mb-6 font-bold">
            头衔：{getResultTitle()}
          </div>
          
          <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-700 mb-8 relative">
            <span className="absolute -top-3 left-4 text-4xl text-slate-600">“</span>
            <p className="text-amber-100/90 italic text-lg px-4">{getResultComment()}</p>
            <span className="absolute -bottom-6 right-4 text-4xl text-slate-600">”</span>
          </div>

          <button
            onClick={handleStart}
            className="text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
          >
            再测一次 (Replay)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-16 animate-fade-in">
       <div className="flex justify-between items-center mb-4 px-2">
         <span className="text-amber-600 font-bold tracking-widest text-sm">QUESTION {currentIndex + 1} / {questions.length}</span>
         <div className="text-slate-500 text-sm">Loyalty Test</div>
       </div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-10 shadow-xl relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-amber-600 transition-all duration-300" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>

        <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-8 leading-relaxed font-serif-sc">
          {currentQuestion.question}
        </h3>

        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium relative overflow-hidden ";
            
            if (selectedOption) {
              if (option === currentQuestion.correctAnswer) {
                btnClass += "bg-green-900/30 border-green-500 text-green-100";
              } else if (option === selectedOption) {
                btnClass += "bg-red-900/30 border-red-500 text-red-100";
              } else {
                btnClass += "bg-slate-900 border-slate-800 text-slate-500 opacity-50";
              }
            } else {
              btnClass += "bg-slate-800 border-slate-700 hover:border-amber-500/50 hover:bg-slate-800/80 text-slate-200";
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedOption}
                className={btnClass}
              >
                <div className="flex items-center">
                   <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-950/50 text-xs mr-4 border border-slate-700">
                     {String.fromCharCode(65 + idx)}
                   </span>
                   {option}
                </div>
              </button>
            );
          })}
        </div>

        {selectedOption && (
           <div className="mt-8 pt-6 border-t border-slate-800 animate-fade-in">
             <div className="flex items-start gap-4">
               <div className="flex-shrink-0 w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-2xl border border-slate-700">
                 🤵
               </div>
               <div>
                 <p className="text-amber-500 text-xs font-bold uppercase mb-1">CEO's Feedback</p>
                 <p className="text-slate-300 italic">"{currentQuestion.explanation}"</p>
               </div>
             </div>
             
             <div className="mt-6 text-right">
               <button
                 onClick={handleNext}
                 className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-2 px-8 rounded-lg transition-colors"
               >
                 {currentIndex === questions.length - 1 ? "查看结果" : "下一题"}
               </button>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default QuizSection;