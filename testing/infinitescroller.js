"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect, useRef, useCallback } from 'react';

export default function InfiniteScroller() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  const fetchMoreItems = useCallback(async (pageNum) => {
    if (loading) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newItems = Array.from({ length: 10 }, (_, i) => ({
      id: (pageNum - 1) * 10 + i + 1,
      title: `Item ${(pageNum - 1) * 10 + i + 1}`,
      description: `This is the description for item ${(pageNum - 1) * 10 + i + 1}`,
      color: `hsl(${((pageNum - 1) * 10 + i) * 15}, 70%, 60%)`
    }));
    
    setItems(prev => [...prev, ...newItems]);
    setLoading(false);
    
    if (pageNum >= 5) {
      setHasMore(false);
    }
  }, [loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading]);

  useEffect(() => {
    fetchMoreItems(page);
  }, [page]);

  return (
    <>
      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%);
          padding: 2rem;
        }
        .wrapper {
          max-width: 56rem;
          margin: 0 auto;
        }
        .title {
          font-size: 2.5rem;
          font-weight: bold;
          color: white;
          margin-bottom: 2rem;
          text-align: center;
        }
        .card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin-bottom: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        .card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.02);
        }
        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.5rem;
        }
        .card-description {
          color: #d1d5db;
          line-height: 1.5;
        }
        .spinner {
          display: flex;
          justify-content: center;
          padding: 2rem;
        }
        .spinner-circle {
          width: 3rem;
          height: 3rem;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .observer-target {
          height: 5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .end-message {
          text-align: center;
          padding: 2rem;
          color: #9ca3af;
          font-size: 1.125rem;
        }
        .loading-text {
          color: #9ca3af;
        }
      `}</style>

      <div className="container">
        <div className="wrapper">
          <h1 className="title">Infinite Scroll Demo</h1>
          
          <div>
            {items.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{
                  borderLeft: `4px solid ${item.color}`
                }}
              >
                <h2 className="card-title">{item.title}</h2>
                <p className="card-description">{item.description}</p>
              </div>
            ))}
          </div>

          {loading && (
            <div className="spinner">
              <div className="spinner-circle"></div>
            </div>
          )}

          {hasMore && (
            <div ref={observerTarget} className="observer-target">
              <p className="loading-text">Loading more...</p>
            </div>
          )}

          {!hasMore && (
            <div className="end-message">
              🎉 You've reached the end!
            </div>
          )}
        </div>
      </div>
    </>
  );
}