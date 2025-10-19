"use client";
import { useRef, useState, useEffect } from 'react';

export function VideoCard({ content, onDoubleTap }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play when card becomes active
  useEffect(() => {
    if (videoRef.current && content.autoPlay) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [content.autoPlay]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      onDoubleClick={onDoubleTap}
      onClick={togglePlay}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: content.background || '#000',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {content.videoUrl ? (
        <>
          <video
            ref={videoRef}
            src={content.videoUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            loop
            playsInline
            muted={content.muted !== false}
          />
          
          {/* Play/Pause Indicator */}
          {!isPlaying && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}>
              <div style={{
                width: 0,
                height: 0,
                borderLeft: '25px solid white',
                borderTop: '15px solid transparent',
                borderBottom: '15px solid transparent',
                marginLeft: '8px'
              }} />
            </div>
          )}
        </>
      ) : (
        // Fallback if no video URL
        <>
          <div style={{ fontSize: '96px', marginBottom: '24px' }}>{content.emoji}</div>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '16px', textAlign: 'center', maxWidth: '90%' }}>
            {content.title}
          </h2>
          {content.description && (
            <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', textAlign: 'center', maxWidth: '85%', lineHeight: '1.5' }}>
              {content.description}
            </p>
          )}
        </>
      )}
    </div>
  );
}
