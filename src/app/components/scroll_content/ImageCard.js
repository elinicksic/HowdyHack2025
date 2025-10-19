"use client";
import { useMemo, useRef, useState } from 'react';

export function ImageCard({ content, onDoubleTap }) {
  const images = useMemo(() => {
    if (Array.isArray(content?.images) && content.images.length > 0) return content.images;
    if (content?.file) return [content.file];
    return [];
  }, [content]);

  const imageUrl = images[0] || '';
  const title = content?.title || '';
  const description = content?.description || '';
  const alt = description || title || 'image';

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Max ±15 degrees like FlashCard
    const rotateY = (mouseX / (rect.width / 2)) * 15;
    const rotateX = -(mouseY / (rect.height / 2)) * 15;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: content?.background || '#000'
      }}
    >
      {/* 3D Tilt Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onDoubleClick={onDoubleTap}
        style={{
          width: '100%',
          maxWidth: '360px',
          aspectRatio: '1', // square
          perspective: '1000px',
          position: 'relative',
          userSelect: 'none'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s cubic-bezier(0.4, 0.2, 0.2, 1)',
            transform: `
              rotateX(${tilt.rotateX}deg)
              rotateY(${tilt.rotateY}deg)
            `
          }}
        >
          {/* Glassy image card (single face) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Shine effect */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at ${50 + tilt.rotateY * 2}% ${50 - tilt.rotateX * 2}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
                pointerEvents: 'none',
                transition: 'background 0.25s ease-out'
              }}
            />
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={"http://10.244.1.145:5000/images/" + imageUrl}
                alt={alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  backgroundColor: 'rgba(0,0,0,0.35)'
                }}
                draggable={false}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background:
                    content?.background ||
                    'linear-gradient(135deg, #2b2b2b 0%, #1a1a1a 100%)'
                }}
                aria-label="No image available"
              />
            )}
          </div>
        </div>
      </div>

      {/* Compact centered description */}
      {(description) && (
        <div
          style={{
            marginTop: 12,
            width: '100%',
            maxWidth: '360px',
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.4,
            fontSize: 14,
            textAlign: 'center',
            padding: '0 4px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {description}
        </div>
      )}
    </div>


    ); 
  }
