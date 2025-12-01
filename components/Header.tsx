import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 text-center border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <h1 className="text-4xl md:text-5xl font-serif-sc font-black text-amber-500 tracking-wider mb-2 drop-shadow-lg">
        霸总单词课
      </h1>
      <p className="text-slate-400 text-sm md:text-base italic font-serif-sc">
        "女人，这几个词根，我允许你记一辈子。"
      </p>
    </header>
  );
};

export default Header;