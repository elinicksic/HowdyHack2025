"use client";
import { useState } from 'react';

export function FlashCard({ content, onDoubleTap }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      onClick={() => setFlipped(!flipped)}
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
      
      {/* 3D Flip Container */}
      <div style={{
        width: '100%',
        maxWidth: '300px',
        minHeight: '350px',
        perspective: '1000px',
        position: 'relative'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          minHeight: '350px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}>
          {/* Front of Card */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <p style={{ 
              fontSize: '20px', 
              color: 'white', 
              textAlign: 'center', 
              fontWeight: '600',
              lineHeight: '1.6',
              marginBottom: '30px'
            }}>
              {content.front}
            </p>
            <p style={{ 
              fontSize: '14px', 
              color: 'rgba(255,255,255,0.7)',
              fontStyle: 'italic'
            }}>
              Tap to reveal answer
            </p>
          </div>

          {/* Back of Card */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            transform: 'rotateY(180deg)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <p style={{ 
              fontSize: '20px', 
              color: 'white', 
              textAlign: 'center', 
              fontWeight: '600',
              lineHeight: '1.6',
              marginBottom: '30px'
            }}>
              {content.back}
            </p>
            <p style={{ 
              fontSize: '14px', 
              color: 'rgba(255,255,255,0.7)',
              fontStyle: 'italic'
            }}>
              Tap to see question
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
