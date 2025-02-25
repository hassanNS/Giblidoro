'use client';

import { useState } from 'react';
import BackgroundSlider from './components/BackgroundSlider';
import TimeDial from './components/TimeDial';

export default function Home() {
  const [duration, setDuration] = useState(30);

  return (
    <div className="min-h-screen">
      <BackgroundSlider duration={duration} />
      <TimeDial duration={duration} setDuration={setDuration} />
    </div>
  );
}