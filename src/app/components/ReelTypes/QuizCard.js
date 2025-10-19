"use client";
import { useState, useEffect } from 'react';

export function QuizCard({ content, isActive, onDoubleTap }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  useEffect(() => {
    if (!isActive) {
      setSelectedAnswer(null);
      setShowResult(false);
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
        cursor: 'pointer'
      }}
    >
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>{content.emoji}</div>
      <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'white', marginBottom: '30px', textAlign: 'center', maxWidth: '90%' }}>
        {content.question}
      </h2>
      <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {content.options.map((option, index) => {
          const isCorrect = index === content.correctAnswer;
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
                padding: '16px',
                fontSize: '15px',
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
          {selectedAnswer === content.correctAnswer ? '✅ Correct!' : '❌ Try again!'}
        </p>
      )}
    </div>
  );
}
