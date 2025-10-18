"use client";
import { useState, useEffect, useRef } from 'react';


export default function HomePage() {
  const topics = [
    "Quantum Mechanics",
    "Principles of Rocketry",
    "Artificial Intelligence",
  ];


  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const lineRef = useRef(null);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopicIndex((prev) => (prev + 1) % topics.length);
    }, 3000);


    return () => clearInterval(interval);
  }, [topics.length]);

  useEffect(() => {
    const updateWidth = () => {
      if (lineRef.current) {
        setContainerWidth(lineRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    // Update width when topic changes
    const timer = setTimeout(updateWidth, 100);

    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timer);
    };
  }, [currentTopicIndex]);


  return (
    <>
      <style jsx global>{`
        /* Background and text defaults */
        body {
          background: linear-gradient(270deg, #1a1a1a, #111, #222);
          color: #fff;
          background-size: 400% 400%;
          animation: gradientMove 20s ease infinite;
        }
        /* Gradient animation */
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        /* Glassmorphism effect */
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .input-glow:focus {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }
        /* Floating blob animation */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          25% { transform: translate(100px, -100px) scale(1.2) rotate(90deg); }
          50% { transform: translate(-80px, 80px) scale(0.8) rotate(180deg); }
          75% { transform: translate(120px, 60px) scale(1.1) rotate(270deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
        }
        @keyframes blob2 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          25% { transform: translate(-120px, 100px) scale(0.9) rotate(-90deg); }
          50% { transform: translate(90px, -70px) scale(1.3) rotate(-180deg); }
          75% { transform: translate(-100px, -80px) scale(1.05) rotate(-270deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(-360deg); }
        }
        @keyframes blob3 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-90px, -120px) scale(1.15); }
          66% { transform: translate(110px, 90px) scale(0.85); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 12s ease-in-out infinite; }
        .animate-blob2 { animation: blob2 15s ease-in-out infinite; }
        .animate-blob3 { animation: blob3 18s ease-in-out infinite; }
        .blob-gradient { background: linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4)); }
        .blob-gradient2 { background: linear-gradient(135deg, rgba(251, 191, 36, 0.4), rgba(234, 88, 12, 0.4)); }
        .blob-gradient3 { background: linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4)); }


        /* Smooth Vertical Topic Rotator */
        .topic-rotator {
          display: inline-block;
          height: 28px;
          line-height: 28px;
          overflow: hidden;
          vertical-align: bottom;
          position: relative;
        }
        
        .topic-slider {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        
        .topic-item {
          height: 28px;
          line-height: 28px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          white-space: nowrap;
        }

        /* Centered text line with natural spacing */
        .learn-about-wrapper {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .learn-about-line {
          display: inline-flex;
          align-items: baseline;
          gap: 0.5rem;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>


      {/* Main Container */}
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        
        {/* Animated Gradient Layer & Floating Blobs */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none"></div>
        <div className="absolute top-10 left-0 w-[600px] h-[600px] rounded-full filter blur-3xl opacity-60 animate-blob blob-gradient"></div>
        <div className="absolute top-20 right-0 w-[550px] h-[550px] rounded-full filter blur-3xl opacity-60 animate-blob2 blob-gradient2"></div>
        <div className="absolute bottom-10 left-1/4 w-[650px] h-[650px] rounded-full filter blur-3xl opacity-60 animate-blob3 blob-gradient3"></div>


        {/* Glassmorphic Card */}
        <main className="w-full max-w-2xl mx-auto rounded-2xl p-8 md:p-12 shadow-2xl glass-effect z-10 text-center">
          
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-500">
              StudyScroll
            </h1>
            <div className="text-lg text-white/70 mt-1">
              <div className="learn-about-wrapper">
                <div 
                  ref={lineRef}
                  className="learn-about-line"
                >
                  <span>Learn about</span>
                  <span className="topic-rotator">
                    <div 
                      className="topic-slider"
                      style={{
                        transform: `translateY(-${currentTopicIndex * 28}px)`
                      }}
                    >
                      {topics.map((topic, index) => (
                        <div key={index} className="topic-item">
                          {topic}
                        </div>
                      ))}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </header>
          
          <section>
            <form className="flex flex-col items-center gap-4">
              <label htmlFor="learn-input" className="sr-only">
                What would you like to learn today?
              </label>
              <div className="relative w-full">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  id="learn-input"
                  placeholder="What would you like to learn today?"
                  className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-12 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 input-glow"
                />
              </div>


              <button
                type="submit"
                className="w-auto bg-white text-gray-900 font-semibold rounded-lg px-8 py-3 transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
              >
                Generate Scroll
              </button>
            </form>
          </section>
          
          <footer className="mt-6">
            <p className="text-sm text-white/50">
              Crafted for the endlessly curious mind. 
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
