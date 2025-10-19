"use client";
import { useState, useRef } from 'react';

export function FlashCard({ content, onDoubleTap }) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation (max ±15 degrees)
    const rotateY = (mouseX / (rect.width / 2)) * 15;
    const rotateX = -(mouseY / (rect.height / 2)) * 15;
    
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

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
      
      {/* 3D Flip Container with Tilt */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '100%',
          maxWidth: '300px',
          minHeight: '350px',
          perspective: '1000px',
          position: 'relative'
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          minHeight: '350px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)',
          transform: `
            rotateX(${tilt.rotateX}deg) 
            rotateY(${(flipped ? 180 : 0) + tilt.rotateY}deg)
          `
        }}>
          {/* Front of Card */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden'
          }}>
            {/* Shine effect on tilt */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at ${50 + tilt.rotateY * 2}% ${50 - tilt.rotateX * 2}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
              pointerEvents: 'none',
              transition: 'background 0.3s ease-out'
            }} />
            
            <p style={{ 
              fontSize: '20px', 
              color: 'white', 
              textAlign: 'center', 
              fontWeight: '600',
              lineHeight: '1.6',
              marginBottom: '30px',
              position: 'relative',
              zIndex: 1
            }}>
              {content.front}
            </p>
            <p style={{ 
              fontSize: '14px', 
              color: 'rgba(255,255,255,0.7)',
              fontStyle: 'italic',
              position: 'relative',
              zIndex: 1
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
            WebkitBackfaceVisibility: 'hidden',
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
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden'
          }}>
            {/* Shine effect on tilt */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at ${50 + tilt.rotateY * 2}% ${50 - tilt.rotateX * 2}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
              pointerEvents: 'none',
              transition: 'background 0.3s ease-out'
            }} />
            
            <p style={{ 
              fontSize: '20px', 
              color: 'white', 
              textAlign: 'center', 
              fontWeight: '600',
              lineHeight: '1.6',
              marginBottom: '30px',
              position: 'relative',
              zIndex: 1
            }}>
              {content.back}
            </p>
            <p style={{ 
              fontSize: '14px', 
              color: 'rgba(255,255,255,0.7)',
              fontStyle: 'italic',
              position: 'relative',
              zIndex: 1
            }}>
              Tap to see question
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
