import { useState, useEffect } from 'react';

// Define a set of color palettes to cycle through
const colorPalettes = [
  { start: 'rgba(139, 123, 209, 0.9)', middle: 'rgba(99, 102, 241, 1)', end: 'rgba(139, 123, 209, 0.9)', shadow: 'rgba(139, 123, 209, 0.6)' }, // Purple/Indigo
  { start: 'rgba(239, 68, 68, 0.9)', middle: 'rgba(234, 179, 8, 1)', end: 'rgba(239, 68, 68, 0.9)', shadow: 'rgba(239, 68, 68, 0.6)' }, // Red/Yellow
  { start: 'rgba(16, 185, 129, 0.9)', middle: 'rgba(5, 150, 105, 1)', end: 'rgba(16, 185, 129, 0.9)', shadow: 'rgba(16, 185, 129, 0.6)' }, // Teal/Green
];

export default function ProgressBar({ progress, autoProgress = false }) {
  const [currentProgress, setCurrentProgress] = useState(progress);
  // State to hold the current color palette index
  const [colorIndex, setColorIndex] = useState(0);

  // Effect for progress and color change
  useEffect(() => {
    let progressInterval;
    let colorInterval;

    if (autoProgress) {
      // 1. Progress update interval
      progressInterval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 50);

      // 2. Color change interval (e.g., change every 3 seconds)
      colorInterval = setInterval(() => {
        setColorIndex((prevIndex) => (prevIndex + 1) % colorPalettes.length);
      }, 3000);

      return () => {
        clearInterval(progressInterval);
        clearInterval(colorInterval);
      };
    } else {
      // When not auto-progressing, set progress to the prop value
      setCurrentProgress(progress);
      // Reset color to the first one (optional, but good practice)
      setColorIndex(0);
    }
  }, [autoProgress, progress]);

  // Get the current palette
  const currentPalette = colorPalettes[colorIndex];

  return (
    <>
      <div 
        className="progress-container" 
        // Set CSS variables on the container element
        style={{
          '--start-color': currentPalette.start,
          '--middle-color': currentPalette.middle,
          '--end-color': currentPalette.end,
          '--shadow-color': currentPalette.shadow,
        }}
      >
        <div className="progress-bar" style={{ width: `${currentProgress}%` }}>
          <div className="progress-glow"></div>
        </div>
        <span className="progress-text">{currentProgress}%</span>
      </div>

      <style jsx>{`
        /* ... (Keep existing styles for progress-container, progress-glow, progress-text, and @keyframes shimmer) ... */

        .progress-container {
          width: 200px;
          height: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .progress-bar {
          height: 100%;
          /* Use CSS variables for the gradient and shadow */
          background: linear-gradient(
            90deg,
            var(--start-color) 0%,
            var(--middle-color) 50%,
            var(--end-color) 100%
          );
          border-radius: 10px;
          transition: width 0.3s ease, background 0.3s ease, box-shadow 0.3s ease; /* Added background and box-shadow to transition */
          position: relative;
          box-shadow: 0 0 20px var(--shadow-color);
        }

        .progress-glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 30px;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 100%
          );
          animation: shimmer 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: rgba(255, 255, 255, 0.9);
          font-size: 10px;
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          pointer-events: none;
        }
      `}</style>
    </>
  );
}