"use client";

export function VideoCard({ content, onDoubleTap }) {
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
      <div style={{ fontSize: '96px', marginBottom: '24px' }}>{content.emoji}</div>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '16px', textAlign: 'center', maxWidth: '90%' }}>
        {content.title}
      </h2>
      {content.description && (
        <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', textAlign: 'center', maxWidth: '85%', lineHeight: '1.5' }}>
          {content.description}
        </p>
      )}
    </div>
  );
}
