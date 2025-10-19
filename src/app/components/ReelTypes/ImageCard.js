"use client";

export function ImageCard({ content, onDoubleTap }) {
  return (
    <div 
      onDoubleClick={onDoubleTap}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden'
      }}
    >
      {/* Background Image */}
      {content.imageUrl ? (
        <img 
          src={content.imageUrl}
          alt={content.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          background: content.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'absolute',
          top: 0,
          left: 0
        }} />
      )}

      {/* Gradient Overlay for better text readability */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
        zIndex: 1
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
