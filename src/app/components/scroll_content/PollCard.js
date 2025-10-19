"use client";
import { useState } from 'react';

export function PollCard({ content, onDoubleTap }) {
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = (index) => {
    if (!voted) {
      setSelectedOption(index);
      setVoted(true);
    }
  };

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
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '30px', textAlign: 'center', maxWidth: '90%' }}>
        {content.question}
      </h2>
      <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {content.options.map((option, index) => {
          const percentage = voted ? Math.round((option.votes / content.totalVotes) * 100) : 0;
          const isSelected = index === selectedOption;

          return (
            <button
              key={index}
              onClick={() => handleVote(index)}
              style={{
                padding: '16px',
                fontSize: '15px',
                fontWeight: '600',
                color: 'white',
                background: voted 
                  ? `linear-gradient(90deg, rgba(255,255,255,0.3) ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`
                  : 'rgba(255, 255, 255, 0.2)',
                border: isSelected ? '2px solid white' : '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                cursor: voted ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{option.text}</span>
                {voted && <span>{percentage}%</span>}
              </div>
            </button>
          );
        })}
      </div>
      {voted && (
        <p style={{ marginTop: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
          {content.totalVotes} total votes
        </p>
      )}
    </div>
  );
}
