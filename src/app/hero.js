"use client"
import { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, X, Send } from 'lucide-react';
import React from "react";
import PopUp from "./components/SideBar";


// Sample comments data
const generateComments = () => [
  { id: 1, user: 'sarah_learns', avatar: '👩‍🎓', text: 'This is so helpful! Thanks for sharing!', likes: 234, time: '2h ago' },
  { id: 2, user: 'mike_science', avatar: '🧑‍🔬', text: 'Great explanation! Can you make one about quantum physics?', likes: 189, time: '5h ago' },
  { id: 3, user: 'emma_studies', avatar: '👩‍💻', text: 'I finally understand this concept now 🎉', likes: 156, time: '8h ago' },
  { id: 4, user: 'alex_tech', avatar: '👨‍💼', text: 'Wow, the visuals really help. Keep it up!', likes: 98, time: '12h ago' },
  { id: 5, user: 'lily_math', avatar: '👩‍🏫', text: 'Could you do a follow-up on this topic?', likes: 67, time: '1d ago' },
  { id: 6, user: 'john_research', avatar: '🧑‍🎓', text: 'Exactly what I needed for my exam prep!', likes: 134, time: '1d ago' },
  { id: 7, user: 'sophia_code', avatar: '👩‍💻', text: 'Mind blown 🤯', likes: 201, time: '2d ago' },
  { id: 8, user: 'david_learn', avatar: '🧑‍🎓', text: 'Can you explain this in more detail?', likes: 45, time: '2d ago' },
];

// Quiz Card Component
const QuizCard = ({ content, isActive, onDoubleTap }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  useEffect(() => {
    if (!isActive) {
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [isActive]);

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
      <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'white', marginBottom: '30px', textAlign: 'center', maxWidth: '90%' }}>
        {content.question}
      </h2>
      <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {content.options.map((option, index) => {
          const isCorrect = index === content.correctAnswer;
          const isSelected = index === selectedAnswer;
          let bgColor = 'rgba(255, 255, 255, 0.2)';
          
          if (showResult && isSelected) {
            bgColor = isCorrect ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)';
          } else if (showResult && isCorrect) {
            bgColor = 'rgba(34, 197, 94, 0.6)';
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              style={{
                padding: '16px',
                fontSize: '15px',
                fontWeight: '600',
                color: 'white',
                background: bgColor,
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                cursor: showResult ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
      {showResult && (
        <p style={{ marginTop: '24px', fontSize: '18px', color: 'white', fontWeight: 'bold' }}>
          {selectedAnswer === content.correctAnswer ? '✅ Correct!' : '❌ Try again!'}
        </p>
      )}
    </div>
  );
};

// Regular Content Card Component
const ContentCard = ({ content, onDoubleTap }) => {
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
      {content.content && (
        <p style={{ fontSize: '18px', color: 'white', textAlign: 'center', maxWidth: '85%', lineHeight: '1.6', fontWeight: '500' }}>
          {content.content}
        </p>
      )}
    </div>
  );
};

// Comments Sheet Component
const CommentsSheet = ({ isOpen, onClose, content }) => {
  const [comments, setComments] = useState(generateComments());
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState(new Set());

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        user: 'you',
        avatar: '😊',
        text: newComment,
        likes: 0,
        time: 'Just now'
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
    }
  };

  const toggleLike = (commentId) => {
    const newLiked = new Set(likedComments);
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId);
    } else {
      newLiked.add(commentId);
    }
    setLikedComments(newLiked);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease'
        }}
      />

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: '70vh',
        background: '#1a1a1a',
        borderRadius: '24px 24px 0 0',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideUp 0.3s ease'
      }}>
        <style jsx>{`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
            {comments.length} Comments
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={22} color="white" />
          </button>
        </div>

        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{ display: 'flex', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0
              }}>
                {comment.avatar}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '3px' }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '13px' }}>
                    {comment.user}
                  </span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '11px' }}>
                    {comment.time}
                  </span>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', lineHeight: '1.4', marginBottom: '6px' }}>
                  {comment.text}
                </p>
                <button
                  onClick={() => toggleLike(comment.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: likedComments.has(comment.id) ? '#ff4458' : 'rgba(255, 255, 255, 0.6)',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    padding: '3px 0'
                  }}
                >
                  ❤️ {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
            placeholder="Add a comment..."
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '10px 16px',
              color: 'white',
              fontSize: '13px',
              outline: 'none'
            }}
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            style={{
              background: newComment.trim() ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: newComment.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s'
            }}
          >
            <Send size={18} color="white" />
          </button>
        </div>
      </div>
    </>
  );
};

// Main Reel Component with Heart Animation
const Reel = ({ content, isActive }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  const handleDoubleTap = () => {
    if (!liked) {
      setLiked(true);
    }
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 1000);
  };

  const handleLikeClick = () => {
    setLiked(!liked);
    if (!liked) {
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 1000);
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      scrollSnapAlign: 'start',
      overflow: 'hidden'
    }}>
      {content.type === 'quiz' ? (
        <QuizCard content={content} isActive={isActive} onDoubleTap={handleDoubleTap} />
      ) : (
        <ContentCard content={content} onDoubleTap={handleDoubleTap} />
      )}

      {showHeartAnimation && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 50,
          animation: 'heartPop 1s ease-out'
        }}>
          <Heart size={120} color="#ff4458" fill="#ff4458" strokeWidth={0} />
        </div>
      )}

      <style jsx>{`
        @keyframes heartPop {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          15% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
          }
          30% {
            transform: translate(-50%, -50%) scale(0.95);
            opacity: 1;
          }
          45% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
      `}</style>

      <div style={{
        position: 'absolute',
        right: '12px',
        bottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        zIndex: 10
      }}>
        {content.likes && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              onClick={handleLikeClick}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Heart size={28} color={liked ? '#ff4458' : 'white'} fill={liked ? '#ff4458' : 'none'} strokeWidth={2.5} />
            </button>
            <span style={{ color: 'white', fontSize: '11px', fontWeight: 'bold', marginTop: '2px' }}>
              {(content.likes + (liked ? 1 : 0)).toLocaleString()}
            </span>
          </div>
        )}

        {content.comments && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              onClick={() => setShowComments(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <MessageCircle size={28} color="white" strokeWidth={2.5} />
            </button>
            <span style={{ color: 'white', fontSize: '11px', fontWeight: 'bold', marginTop: '2px' }}>
              {content.comments}
            </span>
          </div>
        )}

        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Share2 size={26} color="white" strokeWidth={2.5} />
        </button>

        <button
          onClick={() => setBookmarked(!bookmarked)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Bookmark size={26} color="white" fill={bookmarked ? 'white' : 'none'} strokeWidth={2.5} />
        </button>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        right: '70px',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            border: '2px solid white'
          }}>
            {content.emoji}
          </div>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '13px' }}>
            @studyscroll
          </span>
          <button style={{
            background: 'none',
            border: '1px solid white',
            color: 'white',
            padding: '3px 12px',
            borderRadius: '5px',
            fontSize: '11px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Follow
          </button>
        </div>
        <p style={{ color: 'white', fontSize: '13px', lineHeight: '1.3' }}>
          <span style={{ fontWeight: 'bold' }}>StudyScroll</span> {content.title || content.question?.substring(0, 50) + '...'}
        </p>
      </div>

      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        padding: '5px 10px',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '14px',
        color: 'white',
        fontSize: '11px',
        fontWeight: 'bold'
      }}>
        {content.type === 'quiz' ? '🧠 Quiz' : content.type === 'video' ? '🎥 Video' : '📖 Lesson'}
      </div>

      <CommentsSheet
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        content={content}
      />
    </div>
  );
};

// Main App Component
export default function VerticalScrollGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [content] = useState([
    {
      id: 1,
      type: 'image',
      title: 'The Water Cycle',
      description: 'Learn how water moves through Earth\'s atmosphere',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      emoji: '💧',
      likes: 1234,
      comments: 56
    },
    {
      id: 2,
      type: 'quiz',
      question: 'What is the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'],
      correctAnswer: 1,
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      emoji: '🧬',
      comments: 42
    },
    {
      id: 3,
      type: 'video',
      title: 'Photosynthesis Explained',
      description: 'How plants convert sunlight into energy',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      emoji: '🌱',
      likes: 2456,
      comments: 89
    },
    {
      id: 4,
      type: 'text',
      title: 'Newton\'s First Law',
      content: 'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.',
      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      emoji: '⚛️',
      likes: 3421,
      comments: 134
    }
  ]);
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);

  const navigateTo = (newIndex) => {
    if (newIndex >= 0 && newIndex < content.length && !isScrollingRef.current) {
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
  };

  useEffect(() => {
    let accumulatedDelta = 0;
    let scrollTimeout = null;

    const handleWheel = (e) => {
      e.preventDefault();
      accumulatedDelta += e.deltaY;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        if (Math.abs(accumulatedDelta) > 20) {
          if (accumulatedDelta > 0) {
            navigateTo(currentIndex + 1);
          } else {
            navigateTo(currentIndex - 1);
          }
        }
        accumulatedDelta = 0;
      }, 30);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [currentIndex, content.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
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
  }, [currentIndex]);

  const touchStartY = useRef(0);
  
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
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
    
    <div className="home"> 
      
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0a0a0a',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px' // Changed from '40px 20px'
    }}>
       <PopUp/>
      {/* MANY MORE Floating Gradient Blobs with Higher Opacity */}
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

      {/* Thicker Glassmorphic Wrapper with Enhanced Warping Effect */}
      <div style={{
          position: 'relative',
          width: 'min(calc((100vh - 40px) * 9 / 16), calc(100vw - 40px))', // Changed from 80px to 40px
          height: 'calc(100vh - 40px)', // Changed from 80px to 40px
          borderRadius: '36px',
          padding: '6px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.25) 100%)',
          boxShadow: '0 0 100px rgba(0, 0, 0, 0.6), inset 0 0 60px rgba(255, 255, 255, 0.08)',
      }}>
        
        {/* Inner Glass Border with Strong Backdrop Filter */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '36px',
          padding: '3px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 75%, rgba(255,255,255,0.35) 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          backdropFilter: 'blur(50px) saturate(180%)',
          pointerEvents: 'none',
          zIndex: 2
        }} />

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
            borderRadius: '30px',
            zIndex: 1
          }}
        >
          {content.map((item, index) => (
            <Reel
              key={item.id}
              content={item}
              isActive={index === currentIndex}
            />
          ))}

          {/* Progress Dots */}
          <div style={{
            position: 'absolute',
            bottom: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '5px',
            zIndex: 100
          }}>
            {content.map((_, index) => (
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
    </div>
    </div>
    </>
  );
}
