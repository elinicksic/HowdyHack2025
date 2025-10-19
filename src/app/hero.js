"use client";
import { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, X, Send } from 'lucide-react';
import { reelsContent } from './data/reelsContent';
import Button from '@mui/material/Button';

import { LuMousePointer2 } from "react-icons/lu";
import PopUp from "./components/SideBar";
import { 
  QuizCard, 
  ImageCard, 
  VideoCard, 
  TextCard, 
  PollCard, 
  FlashCard, 
  ListCard,
  PostCard
} from './components/ReelTypes';
const handleClick = () => {
    alert('Button clicked!');
  };

// Comments Sheet Component
const CommentsSheet = ({ isOpen, onClose, content }) => {
  const [comments, setComments] = useState(() =>
    (content.comments || []).map((c) => ({ ...c, replies: Array.isArray(c.replies) ? c.replies : [] }))
  );
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState(new Set());
  const [replyingTo, setReplyingTo] = useState(null);

  const countAll = (nodes) =>
    nodes.reduce((acc, n) => acc + 1 + (n.replies?.length || 0), 0);

  // --- Helpers for AI reply ---
  const insertAfter = (arr, id, item) => {
    const idx = arr.findIndex((x) => x.id === id);
    if (idx === -1) return [...arr, item];
    const copy = arr.slice();
    copy.splice(idx + 1, 0, item);
    return copy;
  };

  const formatConversation = (topLevel, repliesList) => {
    const lines = [];
    if (topLevel) {
      lines.push(`Top: ${topLevel.author || 'user'}: ${topLevel.content || topLevel.text || ''}`);
    }
    for (const r of repliesList || []) {
      lines.push(`${r.author || 'user'}: ${r.content || r.text || ''}`);
    }
    return lines.join('\n');
  };

  const fetchAiReply = async ({ commentText, conversation }) => {
    const res = await fetch('http://127.0.0.1:5000/comments/response?username=eli', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comment: commentText,
        post_context: JSON.stringify(content),
        conversation
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || `Request failed: ${res.status}`);
    }
    return res.json();
  };

  const mapBotReply = (data) => {
    const text =
      data?.text ??
      data?.content ??
      data?.reply ??
      data?.message ??
      (typeof data === 'string' ? data : JSON.stringify(data));
    return {
      id: Date.now() + Math.random(),
      author: 'studyscroll',
      pfp_emoji: '🤖',
      content: text,
      likes: 0,
      time: 'now',
    };
  };
  // --- End helpers ---

  const handleAddComment = async () => {
    const text = newComment.trim();
    if (!text) return;

    // New user comment object
    const newObj = {
      id: Date.now(),
      author: 'you',
      pfp_emoji: '😊',
      content: text,
      likes: 0,
      time: 'now',
    };

    try {
      if (replyingTo) {
        // Replying to a top-level comment: append to that comment’s replies
        const parentTop = comments.find((c) => c.id === replyingTo.id);
        const existingReplies = parentTop?.replies || [];

        // Update UI immediately
        setComments((prev) =>
          prev.map((c) =>
            c.id === replyingTo.id
              ? { ...c, replies: [...(c.replies || []), newObj] }
              : c
          )
        );
        setReplyingTo(null);
        setNewComment('');

        // Build conversation including the new user reply
        const conversation = formatConversation(parentTop, [...existingReplies, newObj]);

        // Fetch AI reply and insert right under user's reply
        const data = await fetchAiReply({ commentText: text, conversation });
        const bot = mapBotReply(data);

        setComments((prev) =>
          prev.map((c) =>
            c.id === (parentTop?.id ?? replyingTo.id)
              ? {
                  ...c,
                  replies: insertAfter(c.replies || [], newObj.id, bot),
                }
              : c
          )
        );
      } else {
        // New top-level comment: show it, then append AI reply in its replies
        const newTop = { ...newObj, replies: [] };
        setComments((prev) => [newTop, ...prev]);
        setNewComment('');

        // Conversation only contains the new top-level comment at this point
        const conversation = formatConversation(newTop, []);

        const data = await fetchAiReply({ commentText: text, conversation });
        const bot = mapBotReply(data);

        setComments((prev) =>
          prev.map((c) =>
            c.id === newTop.id ? { ...c, replies: [...(c.replies || []), bot] } : c
          )
        );
      }
    } catch (err) {
      console.error('AI reply failed:', err);
      // Keep the user’s comment; silently skip AI reply on error
    }
  };

  const toggleLike = (commentId) => {
    const next = new Set(likedComments);
    if (next.has(commentId)) next.delete(commentId);
    else next.add(commentId);
    setLikedComments(next);
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
        animation: 'slideUp 0.3s ease',
        overflow: 'hidden'
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
            {countAll(comments)} Comments
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
            <div key={comment.id}>
              <div style={{ display: 'flex', gap: '10px' }}>
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
                  {comment.pfp_emoji}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '3px' }}>
                    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '13px' }}>
                      {comment.author}
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '11px' }}>
                      {comment.time}
                    </span>
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', lineHeight: '1.4', marginBottom: '6px' }}>
                    {comment.content}
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
                  <button
                    onClick={() => setReplyingTo(comment)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      padding: '3px 0',
                      marginLeft: '8px'
                    }}
                  >
                    Reply
                  </button>
                </div>
              </div>

              {comment.replies?.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px', marginLeft: '46px' }}>
                  {comment.replies.map((r) => (
                    <div key={r.id} style={{ display: 'flex', gap: '10px' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        flexShrink: 0
                      }}>
                        {r.pfp_emoji || '😊'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '3px' }}>
                          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}>
                            {r.author}
                          </span>
                          {r.time && (
                            <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '11px' }}>
                              {r.time}
                            </span>
                          )}
                        </div>
                        <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', lineHeight: '1.4', marginBottom: '6px' }}>
                          {r.content}
                        </p>
                        <button
                          onClick={() => toggleLike(r.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: likedComments.has(r.id) ? '#ff4458' : 'rgba(255, 255, 255, 0.6)',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            padding: '3px 0'
                          }}
                        >
                          ❤️ {r.likes + (likedComments.has(r.id) ? 1 : 0)}
                        </button>
                        {/* No reply button here to keep a single-level thread */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          padding: '16px 20px 20px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          background: '#1a1a1a',
          borderRadius: '0 0 24px 24px',
          flexWrap: 'wrap'
        }}>
          {replyingTo && (
            <div style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white',
              fontSize: '12px'
            }}>
              Replying to @{replyingTo.author}
              <button
                onClick={() => setReplyingTo(null)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: 0 }}
                aria-label="Cancel reply"
              >
                <X size={14} />
              </button>
            </div>
          )}
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            placeholder={replyingTo ? "Add a reply..." : "Add a comment..."}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              padding: '12px 18px',
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
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: newComment.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s',
              flexShrink: 0
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
const Reel = ({ content, isActive, setStopScroll }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  useEffect(() => {
    setStopScroll(showComments);
  }, [setStopScroll, showComments])

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

  // Render different content types
  const renderContent = () => {
    switch (content.type) {
      case 'question':
        return <QuizCard content={content} isActive={isActive} onDoubleTap={handleDoubleTap} />;
      case 'image':
        return <ImageCard content={content} isActive={isActive} onDoubleTap={handleDoubleTap} />;
      case 'reel':
        return <VideoCard content={content} onDoubleTap={handleDoubleTap} />;
      case 'post':
        return <PostCard content={content} onDoubleTap={handleDoubleTap} />;
      case 'poll':
        return <PollCard content={content} onDoubleTap={handleDoubleTap} />;
      case 'flashcard':
        return <FlashCard content={content} onDoubleTap={handleDoubleTap} />;
      case 'list':
        return <ListCard content={content} onDoubleTap={handleDoubleTap} />;
      default:
        return <TextCard content={content} onDoubleTap={handleDoubleTap} />;
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
      {/* Render Content Based on Type */}
      {renderContent()}

      {/* Bottom Gradient Overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 10%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 5
      }} />

      {/* Double Tap Heart Animation */}
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

      {/* Right Side Action Buttons */}
      <div style={{
        position: 'absolute',
        right: '12px',
        bottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        zIndex: 10
      }}>
        {content.likes !== undefined && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              onClick={handleLikeClick}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                transition: 'transform 0.2s',
                opacity: 0.85,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.opacity = '0.85';
              }}
            >
              <Heart size={24} color={liked ? '#ff4458' : 'white'} fill={liked ? '#ff4458' : 'none'} strokeWidth={2.5} />
            </button>
            <span style={{ 
              color: 'white', 
              fontSize: '11px', 
              fontWeight: 'bold', 
              marginTop: '2px', 
              opacity: 0.85,
              textShadow: '0 2px 4px rgba(0,0,0,0.7)'
            }}>
              {(content.likes + (liked ? 1 : 0)).toLocaleString()}
            </span>
          </div>
        )}

      {content.comments !== undefined && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            onClick={() => setShowComments(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              transition: 'transform 0.2s',
              opacity: 0.85
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '0.85';
            }}
          >
            <MessageCircle size={24} color="white" strokeWidth={2.5} />
          </button>
          <span style={{ color: 'white', fontSize: '11px', fontWeight: 'bold', marginTop: '2px', opacity: 0.85 }}>
            {content.comments.length}
          </span>
        </div>
      )}

        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            transition: 'transform 0.2s',
            opacity: 0.85,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '0.85';
          }}
        >
          <Share2 size={22} color="white" strokeWidth={2.5} />
        </button>

        <button
          onClick={() => setBookmarked(!bookmarked)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            transition: 'transform 0.2s',
            opacity: 0.85,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '0.85';
          }}
        >
          <Bookmark size={22} color="white" fill={bookmarked ? 'white' : 'none'} strokeWidth={2.5} />
        </button>
      </div>

      {/* Bottom Info */}
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
            border: '2px solid white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}>
            {content.emoji}
          </div>
          <span style={{ 
            color: 'white', 
            fontWeight: 'bold', 
            fontSize: '13px',
            textShadow: '0 2px 4px rgba(0,0,0,0.7)'
          }}>
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
            cursor: 'pointer',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Follow
          </button>
        </div>
        <p style={{ 
          color: 'white', 
          fontSize: '13px', 
          lineHeight: '1.3',
          textShadow: '0 2px 4px rgba(0,0,0,0.7)'
        }}>
          <span style={{ fontWeight: 'bold' }}>StudyScroll</span> {content.title || content.question?.substring(0, 50) + '...'}
        </p>
      </div>

      {/* Type Indicator */}
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
        {content.type === 'quiz' ? '🧠 Quiz' : 
         content.type === 'video' ? '🎥 Video' : 
         content.type === 'poll' ? '📊 Poll' :
         content.type === 'flashcard' ? '🔄 Flashcard' :
         content.type === 'list' ? '📋 List' :
         content.type === 'image' ? '📷 Images' :
         '📖 Lesson'}
      </div>

      {/* Comments Sheet */}
      <CommentsSheet
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        content={content}
      />
    </div>
  );
};

// Main App Component
export default function VerticalScrollGallery({ content }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stopScroll, setStopScroll] = useState(false);
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);

  const navigateTo = (newIndex) => {
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
  };

  useEffect(() => {
    let accumulatedDelta = 0;
    let scrollTimeout = null;

    const handleWheel = (e) => {
      // Always prevent default so the page doesn’t move
      e.preventDefault();
      if (stopScroll) return; // block navigation when comments are open

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
  }, [currentIndex, content.feed.length, stopScroll]); // include stopScroll

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
  }, [currentIndex, stopScroll]); // include stopScroll

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
            <Reel
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
