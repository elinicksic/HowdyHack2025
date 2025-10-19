"use client";
import { useState, useRef, useEffect } from 'react';

export function ImageCard({ content, onDoubleTap, isActive }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef(null);
  const touchStartX = useRef(0);

  // Support for single image or array of images
  const images = Array.isArray(content.images) ? content.images : (content.imageUrl ? [content.imageUrl] : []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentImageIndex < images.length - 1) {
        // Swipe left - next image
        setCurrentImageIndex(currentImageIndex + 1);
      } else if (diff < 0 && currentImageIndex > 0) {
        // Swipe right - previous image
        setCurrentImageIndex(currentImageIndex - 1);
      }
    }
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Arrow key navigation (only when this card is active)
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex(currentImageIndex - 1);
      } else if (e.key === 'ArrowRight' && currentImageIndex < images.length - 1) {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex(currentImageIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, currentImageIndex, images.length]);

  // Reset to first image when card becomes inactive
  useEffect(() => {
    if (!isActive) {
      setCurrentImageIndex(0);
    }
  }, [isActive]);

  return (
    <div 
      onDoubleClick={onDoubleTap}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden'
      }}
    >
      {/* Images Container */}
      <div
        ref={scrollRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          transition: 'transform 0.3s ease-out',
          transform: `translateX(-${currentImageIndex * 100}%)`
        }}
      >
        {images.map((imageUrl, index) => (
          <div
            key={index}
            style={{
              minWidth: '100%',
              height: '100%',
              position: 'relative'
            }}
          >
            {imageUrl ? (
              <img 
                src={imageUrl}
                alt={`${content.title} - Image ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                background: content.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Image Navigation Dots (Top) - Only show if multiple images */}
      {images.length > 1 && (
        <div style={{
          position: 'absolute',
          top: '645px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '6px',
          zIndex: 3
        }}>
          {images.map((_, index) => (
            <div
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleDotClick(index);
              }}
              style={{
                width: currentImageIndex === index ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: currentImageIndex === index 
                  ? 'rgba(255, 255, 255, 0.9)' 
                  : 'rgba(255, 255, 255, 0.4)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            />
          ))}
        </div>
      )}

      {/* Gradient Overlay for better text readability */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* Text Content */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: '20px',
        right: '20px',
        zIndex: 2
      }}>
        {content.emoji && (
          <div style={{ 
            fontSize: '48px', 
            marginBottom: '12px',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}>
            {content.emoji}
          </div>
        )}
        
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: 'white', 
          marginBottom: '12px',
          lineHeight: '1.2',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)'
        }}>
          {content.title}
        </h2>
        
        {content.description && (
          <p style={{ 
            fontSize: '16px', 
            color: 'rgba(255, 255, 255, 0.95)', 
            lineHeight: '1.5',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            maxWidth: '90%'
          }}>
            {content.description}
          </p>
        )}
      </div>

      {/* Optional: Category badge */}
      {content.category && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '8px 16px',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          color: 'white',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          zIndex: 2
        }}>
          {content.category}
        </div>
      )}
    </div>
  );
}
