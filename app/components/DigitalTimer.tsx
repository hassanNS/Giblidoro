'use client';

import { useState, useEffect, useRef } from 'react';
import { RotateCw, Edit2 } from 'lucide-react';
import Draggable from 'react-draggable';

interface DigitalTimerProps {
  initialMinutes: number;
  setInitialMinutes: (minutes: number) => void;
}

const DigitalTimer = ({ initialMinutes, setInitialMinutes }: DigitalTimerProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMinutes, setEditMinutes] = useState(initialMinutes.toString());
  const [editSeconds, setEditSeconds] = useState('00');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Set initial position after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPosition({
        x: (window.innerWidth - 500) / 2,
        y: (window.innerHeight - 200) / 2,
      });
    }
  }, []);

  // Add window resize handler
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      if (!isDragging) {
        setPosition({
          x: (window.innerWidth - 500) / 2,
          y: (window.innerHeight - 200) / 2,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDragging]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setTimeLeft(initialMinutes * 60);
    setIsRunning(false);
    if (typeof window !== 'undefined') {
      setPosition({
        x: (window.innerWidth - 500) / 2,
        y: (window.innerHeight - 200) / 2,
      });
    }
  };

  const handleTimeChange = (type: 'minutes' | 'seconds', value: string) => {
    if (/^\d*$/.test(value)) {
      if (type === 'minutes') {
        setEditMinutes(value.slice(0, 2));
      } else {
        setEditSeconds(value.slice(0, 2));
      }
    }
  };

  const handleTimeClick = () => {
    if (!isRunning) {
      setIsEditing(true);
      setEditMinutes(minutes.toString().padStart(2, '0'));
      setEditSeconds(seconds.toString().padStart(2, '0'));
    }
  };

  const handleTimeSubmit = () => {
    const newMinutes = Math.min(60, Math.max(0, parseInt(editMinutes) || 0));
    const newSeconds = Math.min(59, Math.max(0, parseInt(editSeconds) || 0));
    const totalSeconds = (newMinutes * 60) + newSeconds;

    if (totalSeconds < 60) {
      setTimeLeft(60);
      setInitialMinutes(1);
    } else {
      setTimeLeft(totalSeconds);
      setInitialMinutes(Math.ceil(totalSeconds / 60));
    }
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Draggable
        nodeRef={nodeRef as React.RefObject<HTMLElement>}
        position={position}
        onStart={() => setIsDragging(true)}
        onStop={(e, data) => {
          setIsDragging(false);
          setPosition({ x: data.x, y: data.y });
        }}
        bounds="parent"
        handle=".drag-handle"
      >
        <div
          ref={nodeRef}
          className="absolute flex flex-col items-center gap-8"
        >
          <div className={`${isEditing ? 'bg-black' : 'bg-black/40'} backdrop-blur-sm px-12 py-6 rounded-3xl min-w-[500px] flex items-center justify-center relative drag-handle cursor-move`}>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editMinutes}
                  onChange={(e) => handleTimeChange('minutes', e.target.value)}
                  className="bg-transparent text-white font-mono text-8xl sm:text-9xl font-normal tracking-wider w-[180px] text-center focus:outline-none"
                  onBlur={(e) => {
                    if (!e.relatedTarget || !e.relatedTarget.classList.contains('timer-input')) {
                      handleTimeSubmit();
                    }
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleTimeSubmit()}
                />
                <span className="text-white font-mono text-8xl sm:text-9xl font-normal tracking-wider">:</span>
                <input
                  type="text"
                  value={editSeconds}
                  onChange={(e) => handleTimeChange('seconds', e.target.value)}
                  className="timer-input bg-transparent text-white font-mono text-8xl sm:text-9xl font-normal tracking-wider w-[180px] text-center focus:outline-none"
                  onBlur={(e) => {
                    if (!e.relatedTarget || !e.relatedTarget.classList.contains('timer-input')) {
                      handleTimeSubmit();
                    }
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleTimeSubmit()}
                />
              </div>
            ) : (
              <div className="text-white font-mono text-8xl sm:text-9xl font-normal tracking-wider tabular-nums">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </div>
            )}

            {!isRunning && !isEditing && (
              <button
                onClick={handleTimeClick}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors"
              >
                <Edit2 size={24} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isRunning ? (
              <button
                onClick={handleStart}
                disabled={isEditing}
                className={`px-16 py-4 rounded-full text-xl tracking-wider uppercase transition-all font-mono ${
                  isEditing
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-white hover:text-black'
                }`}
              >
                Start
              </button>
            ) : (
              <button
                onClick={handleStop}
                disabled={isEditing}
                className={`px-16 py-4 rounded-full text-xl tracking-wider uppercase transition-all font-mono ${
                  isEditing
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-white hover:text-black'
                }`}
              >
                Stop
              </button>
            )}

            <button
              onClick={handleReset}
              disabled={isEditing}
              className={`p-4 transition-all ${
                isEditing ? 'text-gray-500 cursor-not-allowed' : 'text-white'
              }`}
            >
              <RotateCw size={32} />
            </button>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default DigitalTimer;