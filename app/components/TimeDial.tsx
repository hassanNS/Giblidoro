'use client';

const TimeDial = ({ duration, setDuration }: { duration: number, setDuration: (duration: number) => void }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(parseInt(e.target.value));
  };

  const percentage = ((duration - 5) / (60 - 5)) * 100;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-white/10 dark:bg-black/20 backdrop-blur-xl p-4 sm:p-6 rounded-xl border border-white/20 shadow-lg flex flex-col items-center gap-2 sm:gap-4">
      <div className="text-white/90 text-xs sm:text-sm font-medium">Background Duration</div>
      <div className="relative w-[140px] sm:w-[200px] h-10 flex items-center">
        <div className="absolute w-full h-[2px] bg-white/10 rounded-full">
          <div
            className="absolute h-full bg-white/40 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min="5"
          max="60"
          value={duration}
          onChange={handleChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-lg border-2 border-white/50 transition-all pointer-events-none"
          style={{ left: `calc(${percentage}% - ${percentage === 0 ? '6px' : percentage === 100 ? '12px' : '8px'})` }}
        />
      </div>
      <div className="text-white/80 text-sm sm:text-base font-semibold tabular-nums">{duration}s</div>
    </div>
  );
};

export default TimeDial;