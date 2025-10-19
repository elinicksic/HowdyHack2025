import { useCallback, useEffect, useRef, useState } from "react";
import FeedItem from "./FeedItem";

// Main App Component
export default function VerticalScrollView({ content }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stopScroll, setStopScroll] = useState(false);
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);

  const navigateTo = useCallback((newIndex) => {
    if (stopScroll) return;

    if (newIndex >= 0 && newIndex < content.feed.length && !isScrollingRef.current) {
      isScrollingRef.current = true;
      setCurrentIndex(newIndex);
      
      if (containerRef.current) {
        const targetScroll = newIndex * containerRef.current.clientHeight;
        containerRef.current.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }
      
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    }
  }, [content.feed.length, stopScroll]);

  useEffect(() => {
    let accumulatedDelta = 0;
    let scrollTimeout = null;

    const handleWheel = (e) => {
      // Always prevent default so the page doesn’t move
      if (stopScroll) return; // block navigation when comments are open
      e.preventDefault();

      accumulatedDelta += e.deltaY;

      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (Math.abs(accumulatedDelta) > 20) {
          if (accumulatedDelta > 0) navigateTo(currentIndex + 1);
          else navigateTo(currentIndex - 1);
        }
        accumulatedDelta = 0;
      }, 30);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [currentIndex, content.feed.length, stopScroll, navigateTo]); // include stopScroll

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (stopScroll) {
        return; // block arrow navigation when comments are open
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateTo(currentIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateTo(currentIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, navigateTo, stopScroll]); // include stopScroll

  const touchStartY = useRef(0);
  
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (stopScroll) return; // block touch navigation when comments are open
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        navigateTo(currentIndex + 1);
      } else {
        navigateTo(currentIndex - 1);
      }
    }
  };

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          overflow: hidden;
          background: #0a0a0a;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(40px, -60px) scale(1.2) rotate(120deg); }
          66% { transform: translate(-30px, 30px) scale(0.85) rotate(240deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
        }
        @keyframes blob2 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(-50px, 40px) scale(1.1) rotate(-120deg); }
          66% { transform: translate(60px, -40px) scale(0.9) rotate(-240deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(-360deg); }
        }
        @keyframes blob3 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, 50px) scale(1.25); }
          66% { transform: translate(-40px, -30px) scale(0.8); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes blob4 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(-35px, -45px) scale(1.15) rotate(90deg); }
          66% { transform: translate(45px, 35px) scale(0.95) rotate(180deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(270deg); }
        }
        @keyframes blob5 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(55px, -35px) scale(1.3); }
          66% { transform: translate(-25px, 45px) scale(0.75); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes blob6 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(-45px, 55px) scale(1.05) rotate(-90deg); }
          66% { transform: translate(35px, -25px) scale(1.2) rotate(-180deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(-270deg); }
        }
      `}</style>

      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '12%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)',
        filter: 'blur(70px)',
        animation: 'blob3 16s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      

      <div style={{
        position: 'absolute',
        top: '25%',
        right: '20%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)',
        filter: 'blur(70px)',
        animation: 'blob4 14s ease-in-out infinite',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '30%',
        right: '8%',
        width: '520px',
        height: '520px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)',
        filter: 'blur(70px)',
        animation: 'blob5 15s ease-in-out infinite',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        top: '60%',
        left: '25%',
        width: '480px',
        height: '480px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)',
        filter: 'blur(70px)',
        animation: 'blob6 17s ease-in-out infinite',
        pointerEvents: 'none'
      }} />

      {/* Translucent Glassmorphic Border Wrapper */}
      <div style={{
        position: 'relative',
        width: 'min(calc((100vh - 80px) * 9 / 16), calc(100vw - 40px))',
        height: 'calc(100vh - 80px)',
        borderRadius: '36px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(40px) saturate(200%)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 0 60px rgba(255, 255, 255, 0.05)',
        padding: '8px',
      }}>
        
        {/* Content Container */}
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            scrollSnapType: 'y mandatory',
            backgroundColor: '#000',
            position: 'relative',
            borderRadius: '28px',
            zIndex: 1
          }}
        >
          {content.feed.map((item, index) => (
            <FeedItem
              key={item.title}
              content={item}
              setStopScroll={setStopScroll}
              isActive={index === currentIndex}
            />
          ))}

          {/* Progress Dots */}
          <div style={{
            position: 'absolute',
            top: '8%',
            left: '3%',
            width: '550px',
            height: '550px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'blob 10s ease-in-out infinite',
            pointerEvents: 'none'
          }} />
          
          <div style={{
            position: 'absolute',
            top: '45%',
            right: '2%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'blob2 13s ease-in-out infinite',
            pointerEvents: 'none'
          }} />

          <div style={{
            position: 'absolute',
            bottom: '8%',
            left: '12%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'blob3 16s ease-in-out infinite',
            pointerEvents: 'none'
          }} />

          <div style={{
            position: 'absolute',
            top: '25%',
            right: '20%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'blob4 14s ease-in-out infinite',
            pointerEvents: 'none'
          }} />

          <div style={{
            position: 'absolute',
            bottom: '30%',
            right: '8%',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'blob5 15s ease-in-out infinite',
            pointerEvents: 'none'
          }} />

          <div style={{
            position: 'absolute',
            top: '60%',
            left: '25%',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'blob6 17s ease-in-out infinite',
            pointerEvents: 'none'
          }} />

          {/* Translucent Glassmorphic Border Wrapper */}
          <div style={{
            position: 'relative',
            width: 'min(calc((100vh - 80px) * 9 / 16), calc(100vw - 40px))',
            height: 'calc(100vh - 80px)',
            borderRadius: '36px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(40px) saturate(200%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 0 60px rgba(255, 255, 255, 0.05)',
            padding: '8px',
          }}>
            {content.feed.map((_, index) => (
              <div
                key={index}
                style={{
                  width: currentIndex === index ? '20px' : '5px',
                  height: '5px',
                  borderRadius: '3px',
                  background: currentIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => navigateTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}