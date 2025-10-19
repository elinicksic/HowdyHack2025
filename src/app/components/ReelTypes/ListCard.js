"use client";

export function ListCard({ content, onDoubleTap }) {
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
      <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: 'white', marginBottom: '30px', textAlign: 'center', maxWidth: '85%' }}>
        {content.title}
      </h2>
      <div style={{ width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {content.items.map((item, index) => (
          <div
            key={index}
            style={{
              padding: '14px 18px',
              fontSize: '14px',
              fontWeight: '500',
              color: 'white',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ 
              width: '26px', 
              height: '26px', 
              borderRadius: '50%', 
              background: 'rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              {index + 1}
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
