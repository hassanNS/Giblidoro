'use client';

import { useState, useEffect } from 'react';

interface AnalogTimerProps {
  initialMinutes: number;
  setInitialMinutes: (minutes: number) => void;
}

const AnalogTimer = ({ initialMinutes, setInitialMinutes }: AnalogTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setShowReset(true);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / (initialMinutes * 60)) * 100;
  const rotation = (360 * percentage) / 100;

  const handleStart = () => setIsRunning(true);
  const handleStop = () => {
    setIsRunning(false);
    setShowReset(true);
  };
  const handleReset = () => {
    setTimeLeft(initialMinutes * 60);
    setShowReset(false);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(60, Math.max(10, parseInt(e.target.value) || 10));
    setInitialMinutes(value);
    setTimeLeft(value * 60);
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 flex flex-col items-center gap-8">
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border-4 border-white/30">
        <div className="absolute inset-4 rounded-full">
          <div
            className="w-[2px] h-1/2 bg-white/90 absolute top-0 left-1/2 -translate-x-1/2 origin-bottom transform"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full"
              style={{ transform: `rotate(${i * 30}deg)` }}
            >
              <div className="w-[2px] h-3 bg-white/40 absolute top-0 left-1/2 -translate-x-1/2" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-7xl sm:text-8xl font-light tracking-wider tabular-nums">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {!isRunning && (
          <button
            onClick={handleStart}
            className="px-12 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white/90 text-lg tracking-wider uppercase transition-all"
          >
            Start
          </button>
        )}
        {isRunning && (
          <button
            onClick={handleStop}
            className="px-12 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white/90 text-lg tracking-wider uppercase transition-all"
          >
            Stop
          </button>
        )}
        {showReset && (
          <button
            onClick={handleReset}
            className="px-12 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white/90 text-lg tracking-wider uppercase transition-all"
          >
            Reset
          </button>
        )}
      </div>

      {!isRunning && (
        <input
          type="range"
          min="10"
          max="60"
          value={initialMinutes}
          onChange={handleMinutesChange}
          className="w-48 appearance-none bg-white/20 h-[2px] rounded-full outline-none"
        />
      )}
    </div>
  );
};

export default AnalogTimer;