import React from 'react';

const LoadingView: React.FC = () => {
  const loadingTexts = [
    "总裁正在签发文件...",
    "正在收购这家词汇公司...",
    "三分钟内，我要这个词根的所有资料...",
    "这点词汇量，怎么做我的女人...",
    "不要乱动，正在输入..."
  ];
  
  const [textIndex, setTextIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [loadingTexts.length]);

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-pulse">
      <div className="w-16 h-16 border-4 border-amber-900 border-t-amber-500 rounded-full animate-spin mb-8"></div>
      <p className="text-xl font-serif-sc text-amber-500/80 italic">
        {loadingTexts[textIndex]}
      </p>
    </div>
  );
};

export default LoadingView;