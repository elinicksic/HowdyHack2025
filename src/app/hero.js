"use client"
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Heart, ShoppingCart, Share2 } from 'lucide-react';
const ProductCard = ({ product, isActive }) => {
  return (
    <div style={{
      height: '100vh',
      width: '100%',
      flexShrink: 0,
      position: 'relative',
      opacity: isActive ? 1 : 0.5,
      transition: 'opacity 0.3s'
    }}>
      {/* Product Image Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ fontSize: '144px' }}>{product.emoji}</span>
      </div>
      
      {/* Overlay Gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0,0,0,0.6) 100%)'
      }}></div>
      
      {/* Content Bottom Left */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '24px',
        paddingBottom: '128px'
      }}>
        <div style={{
          color: 'white',
          maxWidth: '600px'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '12px'
          }}>{product.name}</h2>
          <p style={{
            fontSize: '20px',
            marginBottom: '24px',
            opacity: 0.9
          }}>{product.description}</p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <span style={{
              fontSize: '48px',
              fontWeight: 'bold'
            }}>${product.price}</span>
            <button style={{
              backgroundColor: 'white',
              color: '#9333ea',
              padding: '16px 32px',
              borderRadius: '9999px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: 'fit-content',
              fontSize: '18px',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
            >
              <ShoppingCart size={24} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div style={{
        position: 'absolute',
        right: '24px',
        bottom: '160px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        zIndex: 20
      }}>
        <button style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          transition: 'transform 0.3s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            width: '56px',
            height: '56px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px'
          }}>
            <Heart size={28} fill="white" />
          </div>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>Like</span>
        </button>
        
        <button style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          transition: 'transform 0.3s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            width: '56px',
            height: '56px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px'
          }}>
            <Share2 size={28} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>Share</span>
        </button>
      </div>
    </div>
  );
};

const products = [
  { id: 1, name: "Wireless Headphones", description: "Premium sound quality with noise cancellation", price: 149.99, emoji: "🎧" },
  { id: 2, name: "Smart Watch", description: "Track your fitness and stay connected", price: 299.99, emoji: "⌚" },
  { id: 3, name: "Laptop Stand", description: "Ergonomic aluminum stand for better posture", price: 49.99, emoji: "💻" },
  { id: 4, name: "Coffee Maker", description: "Brew the perfect cup every morning", price: 89.99, emoji: "☕" },
  { id: 5, name: "Desk Lamp", description: "LED lamp with adjustable brightness", price: 39.99, emoji: "💡" },
  { id: 6, name: "Mechanical Keyboard", description: "Premium typing experience with RGB", price: 129.99, emoji: "⌨️" },
  { id: 7, name: "Wireless Mouse", description: "Ergonomic design with precision tracking", price: 59.99, emoji: "🖱️" },
  { id: 8, name: "USB Hub", description: "7-port hub with fast charging", price: 29.99, emoji: "🔌" },
  { id: 9, name: "Phone Stand", description: "Adjustable stand for any device", price: 19.99, emoji: "📱" },
  { id: 10, name: "Webcam", description: "4K video for professional calls", price: 119.99, emoji: "📷" },
  { id: 11, name: "Bluetooth Speaker", description: "Portable sound with deep bass", price: 79.99, emoji: "🔊" },
  { id: 12, name: "Power Bank", description: "20000mAh capacity for all devices", price: 44.99, emoji: "🔋" },
  { id: 13, name: "Cable Organizer", description: "Keep your desk tidy and organized", price: 14.99, emoji: "🧵" },
  { id: 14, name: "Monitor", description: "27-inch 4K display with HDR", price: 399.99, emoji: "🖥️" },
  { id: 15, name: "Backpack", description: "Tech backpack with laptop compartment", price: 69.99, emoji: "🎒" }
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedProducts, setLoadedProducts] = useState([products[0]]);
  const containerRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const scrollToIndex = (index) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < loadedProducts.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    } else if (loadedProducts.length < products.length) {
      const nextProduct = products[loadedProducts.length];
      setLoadedProducts([...loadedProducts, nextProduct]);
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setTimeout(() => scrollToIndex(newIndex), 50);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    }
    if (touchStart - touchEnd < -50) {
      handlePrevious();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, loadedProducts]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'black'
    }}>
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        style={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {loadedProducts.map((product, index) => (
          <div key={product.id} style={{ scrollSnapAlign: 'start' }}>
            <ProductCard product={product} isActive={index === currentIndex} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons - Centered Bottom */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        zIndex: 30
      }}>
        {currentIndex > 0 && (
          <button
            onClick={handlePrevious}
            style={{
              width: '56px',
              height: '56px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
          >
            <ChevronUp size={32} strokeWidth={3} />
          </button>
        )}
        
        {(currentIndex < loadedProducts.length - 1 || loadedProducts.length < products.length) && (
          <button
            onClick={handleNext}
            style={{
              width: '56px',
              height: '56px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              animation: 'bounce 1s infinite'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
          >
            <ChevronDown size={32} strokeWidth={3} />
          </button>
        )}
      </div>

      {/* Progress Indicator - Top Center */}
      <div style={{
        position: 'absolute',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        padding: '8px 16px',
        borderRadius: '9999px',
        zIndex: 30
      }}>
        {currentIndex + 1} / {products.length}
      </div>

      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </div>
  );
}