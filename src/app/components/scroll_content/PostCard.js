"use client";
import { useRef, useState, useEffect, useCallback } from "react";

export function PostCard({ content, onDoubleTap }) {
  const slides = Array.isArray(content.slides) ? content.slides : [];
  const hasSlides = slides.length > 0;

  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const draggingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0, t: 0 });

  // Keep active index in range if slides change
  useEffect(() => {
    if (!hasSlides) return;
    setActiveIndex((i) => Math.min(i, slides.length - 1));
  }, [hasSlides, slides.length]);

  // Update active index on scroll (stable)
  useEffect(() => {
    if (!hasSlides) return;
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const w = el.clientWidth || 1;
      const next = Math.floor((el.scrollLeft + w * 0.5) / w);
      setActiveIndex((prev) => (prev === next ? prev : Math.max(0, Math.min(slides.length - 1, next))));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [hasSlides, slides.length]);

  // Go to a slide using its exact offset (avoids rounding issues)
  const goTo = useCallback((i) => {
    const el = scrollerRef.current;
    if (!el) return;
    const target = el.children[i];
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  }, []);

  // Click anywhere on slide area to advance to next (tap only, not drag)
  const goNext = useCallback(() => {
    if (!hasSlides) return;
    const nextIndex = (activeIndex + 1) % slides.length;
    goTo(nextIndex);
  }, [hasSlides, activeIndex, slides.length, goTo]);

  return (
    <div
      onDoubleClick={onDoubleTap}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px 20px",
        background: content.background,
        cursor: "pointer",
        boxSizing: "border-box",
      }}
    >
      {/* Title */}
      {content.title && (
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "white",
            marginBottom: hasSlides ? "12px" : "16px",
            textAlign: "center",
            maxWidth: "90%",
          }}
        >
          {content.title}
        </h2>
      )}

      {hasSlides ? (
        <>
          {/* Slides scroller */}
          <div
            ref={scrollerRef}
            className="slides-scroller"
            onClick={(e) => {
              // If it was a drag, ignore click
              if (draggingRef.current) return;
              e.stopPropagation();
              goNext();
            }}
            onPointerDown={(e) => {
              draggingRef.current = false;
              startRef.current = { x: e.clientX, y: e.clientY, t: performance.now() };
            }}
            onPointerMove={(e) => {
              const dx = Math.abs(e.clientX - startRef.current.x);
              const dy = Math.abs(e.clientY - startRef.current.y);
              if (dx > 6 || dy > 6) draggingRef.current = true;
            }}
            onPointerUp={(e) => {
              const dt = performance.now() - startRef.current.t;
              // If released quickly and not dragged, treat as tap (click handler will run)
              if (draggingRef.current) {
                e.preventDefault();
                e.stopPropagation();
              } else if (dt > 350) {
                // Long press -> don't advance
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            style={{
              width: "100%",
              maxWidth: "900px",
              flex: "0 0 auto",
              overflowX: "auto",
              display: "flex",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              gap: "0px",
              borderRadius: "16px",
              boxSizing: "border-box",
              border: "1px solid rgba(255,255,255,0.2)",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              overscrollBehaviorX: "contain",
            }}
          >
            {slides.map((s, i) => (
              <div
                key={i}
                style={{
                  flex: "0 0 100%",
                  minWidth: "100%",
                  maxWidth: "100%",
                  scrollSnapAlign: "start",
                  scrollSnapStop: "always",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "24px",
                  boxSizing: "border-box",
                  color: "white",
                  background: "rgba(0,0,0,0.25)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <div style={{ fontSize: "48px", lineHeight: 1 }}>{s.icon}</div>
                <p style={{ fontSize: "18px", lineHeight: 1.6, margin: 0 }}>
                  {s.content}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "14px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {slides.map((_, i) => {
              const active = i === activeIndex;
              return (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(i);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: active ? 10 : 8,
                    height: active ? 10 : 8,
                    borderRadius: "50%",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    background: active
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(255,255,255,0.5)",
                    transition: "all 120ms ease",
                    padding: 0,
                  }}
                />
              );
            })}
          </div>

          {/* Hide WebKit scrollbar via styled-jsx */}
          <style jsx>{`
            .slides-scroller::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </>
      ) : (
        <>
          {content.emoji && (
            <div style={{ fontSize: "96px", marginBottom: "24px" }}>
              {content.emoji}
            </div>
          )}
          {content.content && (
            <p
              style={{
                fontSize: "18px",
                color: "white",
                textAlign: "center",
                maxWidth: "85%",
                lineHeight: "1.6",
                fontWeight: "500",
              }}
            >
              {content.content}
            </p>
          )}
        </>
      )}
    </div>
  );
}
