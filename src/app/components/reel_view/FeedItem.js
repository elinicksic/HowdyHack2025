import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { FlashCard, ImageCard, ListCard, PollCard, PostCard, QuizCard, TextCard, VideoCard } from "../scroll_content";
import CommentsPane from "./CommentsPane";
import { useEffect, useState } from "react";

// Main Reel Component with Heart Animation
const FeedItem = ({ content, isActive, setStopScroll }) => {
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
        return <VideoCard content={content} onDoubleTap={handleDoubleTap} isVisible={isActive}/>;
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
            {content.author_pfp_emoji}
          </div>
          <span style={{ 
            color: 'white', 
            fontWeight: 'bold', 
            fontSize: '13px',
            textShadow: '0 2px 4px rgba(0,0,0,0.7)'
          }}>
            @{content.author}
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
          <span style={{ fontWeight: 'bold' }}>{content.author}</span> {content.title}
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
        fontWeight: 'bold',
        overflow: 'hidden'
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
      <CommentsPane
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        content={content}
      />
    </div>
  );
};

export default FeedItem;