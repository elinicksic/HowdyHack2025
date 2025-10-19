import { useState, useEffect } from 'react';

// Define a set of color palettes to cycle through
const colorPalettes = [
  { start: 'rgba(139, 123, 209, 0.9)', middle: 'rgba(99, 102, 241, 1)', end: 'rgba(139, 123, 209, 0.9)', shadow: 'rgba(139, 123, 209, 0.6)' },
  { start: 'rgba(239, 68, 68, 0.9)', middle: 'rgba(234, 179, 8, 1)', end: 'rgba(239, 68, 68, 0.9)', shadow: 'rgba(239, 68, 68, 0.6)' },
  { start: 'rgba(16, 185, 129, 0.9)', middle: 'rgba(5, 150, 105, 1)', end: 'rgba(16, 185, 129, 0.9)', shadow: 'rgba(16, 185, 129, 0.6)' },
];
const largePalette = { start: '#ff7a7a', middle: '#ffd166', end: '#ff7a7a', shadow: 'rgba(255,122,122,0.6)' };

export default function ProgressBar({ progress, autoProgress = false, style_change}) {
  const [currentProgress, setCurrentProgress] = useState(progress);
  const [colorIndex, setColorIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState('normal');
  
  const currentPalette = style_change ? largePalette : colorPalettes[colorIndex];

  const cssVars = {
    '--start-color': currentPalette.start,
    '--middle-color': currentPalette.middle,
    '--end-color': currentPalette.end,
    '--shadow-color': currentPalette.shadow,
  };

  useEffect(() => {
    let progressInterval;
    let colorInterval;
    let directionInterval;

    if (autoProgress) {
      progressInterval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 50);

      colorInterval = setInterval(() => {
        setColorIndex((prevIndex) => (prevIndex + 1) % colorPalettes.length);
      }, 3000);

      // Randomize direction periodically
      directionInterval = setInterval(() => {
        const directions = ['normal', 'reverse', 'alternate', 'alternate-reverse'];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        setAnimationDirection(randomDirection);
      }, 5000);

      return () => {
        clearInterval(progressInterval);
        clearInterval(colorInterval);
        clearInterval(directionInterval);
      };
    } else {
      setCurrentProgress(progress);
      setColorIndex(0);
      
      // Set random direction on mount for non-auto progress bars
      const directions = ['normal', 'reverse'];
      setAnimationDirection(directions[Math.floor(Math.random() * directions.length)]);
    }
  }, [autoProgress, progress]);

  return (
    <>
      <div 
        className={`progress-container ${style_change ? 'large' : ''}`}
        style={cssVars}
      >
        <div 
          className={`progress-bar ${style_change ? 'large' : ''}`}
          style={{ 
            width: `${currentProgress}%`,
            animationDirection: animationDirection
          }}
        >
          <div className="progress-glow"></div>
        </div>
        <span className={`progress-text ${style_change ? 'large' : ''}`}>{currentProgress}%</span>
      </div>

      <style jsx>{`
        .progress-container {
          width: 200px;
          height: 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.3),
            inset 0 1px 2px rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          border: none;
        }

        .progress-container.large {
          width: 250px;
          height: 24px;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(
            90deg,
            var(--start-color) 0%,
            var(--middle-color) 25%,
            var(--end-color) 50%,
            var(--middle-color) 75%,
            var(--start-color) 100%
          );
          background-size: 300% 100%;
          border-radius: 12px;
          transition: width 0.3s ease;
          position: relative;
          box-shadow: 0 0 12px var(--shadow-color);
          animation: gradientShift 6s ease-in-out infinite;
          border: none;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .progress-glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 35px;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.15) 100%
          );
          animation: shimmer 3s ease-in-out infinite;
          border-radius: 0 12px 12px 0;
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
        }

        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: rgba(255, 255, 255, 0.95);
          font-size: 10px;
          font-weight: 700;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
          pointer-events: none;
          z-index: 10;
        }

        .progress-text.large {
          font-size: 12px;
        }
      `}</style>
    </>
  );
}
