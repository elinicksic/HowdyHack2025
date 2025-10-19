"use client";
import { useState, useEffect } from 'react';

export function QuizCard({ content, isActive, onDoubleTap }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showGoodWork, setShowGoodWork] = useState(false);
  const [showBadWork, setShowBadWork] = useState(false);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
    
    // Show good work image if correct, bad work if incorrect
    if (index === content.correct_idx) {
      console.log('Correct answer! Showing goodWork.png');
      setShowGoodWork(true);
      setTimeout(() => setShowGoodWork(false), 2000);
    } else {
      console.log('Incorrect answer! Showing badWork.png');
      setShowBadWork(true);
      setTimeout(() => setShowBadWork(false), 2000);
    }
  };

  useEffect(() => {
    if (!isActive) {
      setSelectedAnswer(null);
      setShowResult(false);
      setShowGoodWork(false);
      setShowBadWork(false);
    }
  }, [isActive]);

  return (
    <div 
      onDoubleClick={onDoubleTap}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px 20px',
        background: content.background,
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>{content.emoji}</div>
      <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'white', marginBottom: '30px', textAlign: 'center', maxWidth: '85%' }}>
        {content.question}
      </h2>
      <div style={{ width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {content.choices.map((option, index) => {
          const isCorrect = index === content.correct_idx;
          const isSelected = index === selectedAnswer;
          let bgColor = 'rgba(255, 255, 255, 0.2)';
          
          if (showResult && isSelected) {
            bgColor = isCorrect ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)';
          } else if (showResult && isCorrect) {
            bgColor = 'rgba(34, 197, 94, 0.6)';
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              style={{
                padding: '14px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
                background: bgColor,
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                cursor: showResult ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
      {showResult && (
        <p style={{ marginTop: '24px', fontSize: '18px', color: 'white', fontWeight: 'bold' }}>
          {selectedAnswer === content.correct_idx ? '✅ Correct!' : '❌ Incorrect!'}
        </p>
      )}

      {/* Good Work Pop-up */}
      {showGoodWork && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100,
          animation: 'goodWorkPop 2s ease-out',
          pointerEvents: 'none'
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/goodWork.png" 
            alt="Good Work!"
            onError={(e) => {
              console.error('Failed to load goodWork.png');
              e.target.style.display = 'none';
            }}
            style={{
              width: '300px',
              height: 'auto',
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))'
            }}
          />
        </div>
      )}

      {/* Bad Work Pop-up */}
      {showBadWork && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100,
          animation: 'badWorkShake 2s ease-out',
          pointerEvents: 'none'
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/badWork.png" 
            alt="Try Again!"
            onError={(e) => {
              console.error('Failed to load badWork.png');
              e.target.style.display = 'none';
            }}
            style={{
              width: '300px',
              height: 'auto',
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))'
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes goodWorkPop {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(-10deg);
            opacity: 0;
          }
          10% {
            transform: translate(-50%, -50%) scale(1.2) rotate(5deg);
            opacity: 1;
          }
          20% {
            transform: translate(-50%, -50%) scale(1) rotate(-2deg);
            opacity: 1;
          }
          30% {
            transform: translate(-50%, -50%) scale(1.05) rotate(0deg);
            opacity: 1;
          }
          85% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.8) rotate(0deg);
            opacity: 0;
          }
        }

        @keyframes badWorkShake {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          10% {
            transform: translate(-50%, -50%) scale(1.1) rotate(0deg);
            opacity: 1;
          }
          15% {
            transform: translate(-50%, -50%) scale(1) rotate(-5deg);
          }
          20% {
            transform: translate(-50%, -50%) scale(1) rotate(5deg);
          }
          25% {
            transform: translate(-50%, -50%) scale(1) rotate(-5deg);
          }
          30% {
            transform: translate(-50%, -50%) scale(1) rotate(5deg);
          }
          35% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          85% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.8) rotate(0deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
