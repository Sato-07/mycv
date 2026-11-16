import React, { MutableRefObject, useEffect, useRef } from 'react';

const BAR_COUNT = 5;

type VoiceBarsProps = {
  active: boolean;
  analyserRef: MutableRefObject<AnalyserNode | null>;
};

// Barres qui suivent le volume réel de la voix (Web Audio). Sans analyseur (voix du navigateur),
// elles ondulent en CSS pour garder l'effet.
export const VoiceBars: React.FC<VoiceBarsProps> = ({ active, analyserRef }) => {
  const bars = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!active) return;
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    let frame = 0;
    const tick = () => {
      analyser.getByteFrequencyData(data);
      bars.current.forEach((bar, i) => {
        if (!bar) return;
        const value = data[2 + i * 3] / 255;
        bar.style.transform = `scaleY(${Math.max(0.15, value).toFixed(3)})`;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, analyserRef]);

  const simulated = active && !analyserRef.current;

  return (
    <span className="flex h-4 items-center gap-[3px]" aria-hidden>
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            bars.current[i] = el;
          }}
          className={`h-full w-[3px] origin-center rounded-full bg-light transition-transform duration-75 ${
            simulated ? 'animate-wave' : ''
          }`}
          style={{ transform: active ? undefined : 'scaleY(0.15)', animationDelay: `${i * 120}ms` }}
        />
      ))}
    </span>
  );
};
