"use client"
import { useState, useEffect, useRef } from 'react';
import PopUp from "./components/sidebar/SideBar";
import VerticalScrollFeed from './components/reel_view/VerticalScrollView';

export default function HomePage() {
  const topics = [
    "Principles of Rocketry",
    "Principles of Rocketry",
    "Principles of Rocketry",
  ];

  const suggestedTopics = [
    {title: "Python Basics", feed_id: "91ebe048-5253-415d-8f18-f39e3a68241c"},
    {title: "Physics Mechanics", feed_id: "6fc40731-73be-4120-89bb-f3a490fd49ce"}
  ];

  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [tiltStyle, setTiltStyle] = useState({ transform: '', transition: '' });
  const [inputValue, setInputValue] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentFeedId, setCurrentFeedId] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [feedData, setFeedData] = useState(null)
  const lineRef = useRef(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

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
    
    const timer = setTimeout(updateWidth, 50);

    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timer);
    };
  }, [currentTopicIndex]);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!buttonRef.current || showHero) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - buttonCenterX;
      const deltaY = e.clientY - buttonCenterY;

      const rotateY = (deltaX / window.innerWidth) * 60;
      const rotateX = -(deltaY / window.innerHeight) * 60;

      const scale = isHovering ? 1.15 : 1.05;

      setTiltStyle({
        transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: 'transform 0.05s ease-out'
      });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [isHovering, showHero]);

  const handleSuggestedTopicClick = (topic) => {
    loadPregenerated(topic.feed_id);
  };
  
  const loadPregenerated = async (feed_id) => {
    try {
      setLoading(true);
      setIsTransitioning(true);
      setCurrentFeedId(feed_id);

      const res = await fetch(`/studysets/get?username=eli&id=${encodeURIComponent(feed_id)}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`Failed to load feed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setFeedData(data);

      setTimeout(() => {
        setShowHero(true);
      }, 300);
    } catch (err) {
      console.error('Error loading pre-generated feed', err);
      setIsTransitioning(false);
    } finally {
      setLoading(false);
    }
  }

  const loadNewGenerated = async () => {
    try {
      setLoading(true);
      setIsTransitioning(true);
      setFeedData(null);

      const create_res = await fetch(`/studysets/create?username=eli`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: inputValue
        }),
      });
      if (!create_res.ok) {
        throw new Error(`Failed to create studyset: ${create_res.status} ${create_res.statusText}`);
      }

      const { id } = await create_res.json();
      setCurrentFeedId(id);

      const maxAttempts = 1000;
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const get_res = await fetch(
          `/studysets/get?username=eli&id=${encodeURIComponent(id)}`,
          { method: 'GET', headers: { Accept: 'application/json' }, cache: 'no-store' }
        );
        if (!get_res.ok) {
          throw new Error(`Failed to load feed: ${get_res.status} ${get_res.statusText}`);
        }

        const data = await get_res.json();

        if (data.status === 'ready') {
          setFeedData(data);
          setTimeout(() => setShowHero(true), 300);
          return; // done
        }
        if (data.status === 'error') {
          throw new Error(data.error || 'Generation failed');
        }

        // wait 1.5s before next poll
        await new Promise((r) => setTimeout(r, 1500));
      }

      throw new Error('Timed out waiting for generation');
    } catch (err) {
      console.error('Error generating studyset', err);
      setIsTransitioning(false);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loadNewGenerated();
  };

  const handleBackToHome = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setShowHero(false);
      setIsTransitioning(false);
    }, 300);
  };

  if (showHero) {
    return (
      <>
        <style jsx global>{`
          @keyframes floatBlob1 {
            0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
            33% { transform: translate(30px, -40px) scale(1.1) rotate(120deg); }
            66% { transform: translate(-40px, 30px) scale(0.9) rotate(240deg); }
          }
          @keyframes floatBlob2 {
            0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
            33% { transform: translate(-50px, 50px) scale(1.15) rotate(-120deg); }
            66% { transform: translate(60px, -30px) scale(0.85) rotate(-240deg); }
          }
          @keyframes floatBlob3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(40px, 60px) scale(1.2); }
          }
          @keyframes floatBlob4 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-60px, -40px) scale(1.1); }
          }
        `}</style>
        
        <div className="relative h-screen w-screen overflow-hidden" style={{ background: '#0a0a0a' }}>
          {/* Enhanced Gradient Blobs */}
          <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full filter blur-3xl opacity-40 pointer-events-none"
               style={{ 
                 background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)',
                 animation: 'floatBlob1 14s ease-in-out infinite'
               }} />
          
          <div className="absolute top-[50%] right-[3%] w-[450px] h-[450px] rounded-full filter blur-3xl opacity-40 pointer-events-none"
               style={{ 
                 background: 'radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, transparent 70%)',
                 animation: 'floatBlob2 16s ease-in-out infinite'
               }} />
          
          <div className="absolute bottom-[15%] left-[15%] w-[550px] h-[550px] rounded-full filter blur-3xl opacity-35 pointer-events-none"
               style={{ 
                 background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)',
                 animation: 'floatBlob3 18s ease-in-out infinite'
               }} />
          
          <div className="absolute top-[30%] left-[35%] w-[400px] h-[400px] rounded-full filter blur-3xl opacity-30 pointer-events-none"
               style={{ 
                 background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, transparent 70%)',
                 animation: 'floatBlob4 20s ease-in-out infinite'
               }} />
          
          <div className="absolute bottom-[30%] right-[20%] w-[480px] h-[480px] rounded-full filter blur-3xl opacity-35 pointer-events-none"
               style={{ 
                 background: 'radial-gradient(circle, rgba(34, 197, 94, 0.5) 0%, transparent 70%)',
                 animation: 'floatBlob1 15s ease-in-out infinite reverse'
               }} />

          {/* Glassmorphic Back Button */}
          <button 
            onClick={handleBackToHome}
            className="glass-back-button"
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              zIndex: 50,
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '16px',
              padding: '12px 24px',
              color: 'white',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </button>

          <PopUp/>
          
          <div className="flex h-full">
            <main className="flex-1 relative">
              <div style={{
                animation: 'fadeIn 0.5s ease-in-out',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}>
                <style>
                  {`
                    @keyframes fadeIn {
                      from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
                      to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    }
                  `}
                </style>
                <VerticalScrollFeed onBack={handleBackToHome} content={feedData} searchQuery={inputValue} />    
              </div>
            </main>
          </div>      
        </div>
      </>
    );
  }

  return (
    <>
      <style jsx global>{`
        body {
          background: linear-gradient(270deg, #1a1a1a, #111, #222);
          color: #fff;
          background-size: 400% 400%;
          animation: gradientMove 20s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .input-glow:focus {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }
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
        @keyframes fadeOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95); }
        }
        .animate-blob { animation: blob 12s ease-in-out infinite; }
        .animate-blob2 { animation: blob2 15s ease-in-out infinite; }
        .animate-blob3 { animation: blob3 18s ease-in-out infinite; }
        .blob-gradient { background: linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4)); }
        .blob-gradient2 { background: linear-gradient(135deg, rgba(251, 191, 36, 0.4), rgba(234, 88, 12, 0.4)); }
        .blob-gradient3 { background: linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4)); }
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
        .tilt-button {
          transform-style: preserve-3d;
          will-change: transform;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }
        .tilt-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
          border-radius: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .tilt-button:hover::before {
          opacity: 1;
        }
        .topic-pill {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.9);
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .topic-pill:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }
        .transitioning {
          animation: fadeOut 0.3s ease-out forwards;
        }
      `}</style>

      {isLoading ? <h1 style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>Generating Feed...</h1> : <></>}
      
      <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${isTransitioning ? 'transitioning' : ''}`}>
        
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none"></div>
        
        <div className="absolute top-10 left-0 w-[600px] h-[600px] rounded-full filter blur-3xl opacity-60 animate-blob blob-gradient"></div>
        <div className="absolute top-20 right-0 w-[550px] h-[550px] rounded-full filter blur-3xl opacity-60 animate-blob2 blob-gradient2"></div>
        <div className="absolute bottom-10 left-1/4 w-[650px] h-[650px] rounded-full filter blur-3xl opacity-60 animate-blob3 blob-gradient3"></div>

        <main className="w-full max-w-2xl mx-auto rounded-2xl p-8 md:p-12 shadow-2xl glass-effect z-10 text-center">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-500">
              StudyScroll
            </h1>
            <div className="text-lg text-white/70 mt-1">
              <div className="learn-about-wrapper">
                <div ref={lineRef} className="learn-about-line">
                  <span>Learn about</span>
                  <span className="topic-rotator">
                    <div className="topic-slider" style={{ transform: `translateY(-${currentTopicIndex * 28}px)` }}>
                      {topics.map((topic, index) => (
                        <div key={index} className="topic-item">{topic}</div>
                      ))}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </header>
          
          <section>
            <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
              <label htmlFor="learn-input" className="sr-only">What would you like to learn today?</label>
              <div className="relative w-full">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  id="learn-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="What would you like to learn today?"
                  className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-12 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 input-glow"
                />
              </div>

              <div className="w-full">
                <p className="text-sm text-white/50 mb-3">Or try one of these:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestedTopics.map((topic, index) => (
                    <button key={index} type="button" onClick={() => handleSuggestedTopicClick(topic)} className="topic-pill">
                      {topic.title}
                    </button>
                  ))}
                </div>
              </div>

              <button
                ref={buttonRef}
                type="submit"
                className="relative w-auto bg-white text-gray-900 font-semibold rounded-lg px-8 py-3 tilt-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white mt-2"
                style={tiltStyle}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Generate Scroll
              </button>
            </form>
          </section>
          
          <footer className="mt-6">
            <p className="text-sm text-white/50">Crafted for the endlessly curious mind.</p>
          </footer>
        </main>
      </div>
    </>
  );
}
