import { Send, X } from "lucide-react";
import { useState } from "react";

// Comments Sheet Component
const CommentsPane = ({ isOpen, onClose, content }) => {
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
          // position: 'fixed',
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '200vh',
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease'
        }}
      />
      <div style={{
        // position: 'fixed',
        position: 'absolute',
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

export default CommentsPane;