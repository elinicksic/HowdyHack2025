"use client"
import { IconContext } from "react-icons";
import { useState, useEffect } from "react";
import Link from "next/link";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SideData";
import React from "react";
import ProgressBar from "./progressbar"

export default function PopUp() {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(sidebar);

  useEffect(() => {
    if (sidebar) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }, [sidebar]);

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className="nav-item">
                  <div className="cool-top">
                    <div className="title-icon-wrapper">
                      <span className="nav-title">{item.title}</span>
                      <div className="nav-icon">
                        {item.icon}
                      </div>
                    </div>
                    <ProgressBar progress={"30"} style_change={true}/>
                  </div>
                  
                  <div className="nav-card">
                    {item.categories && item.categories.length > 0 && (
                      <div>
                        {item.categories.map((item1, index1) => (
                          <div key={index1} className="nav-part-item">
                            <Link href={item1.path} onClick={showSidebar}>
                              <span className="nav-title-sub">{item1.title}</span>
                            </Link>
                            {(item1.progress_yes === "true") && (
                              <ProgressBar progress={item1.progress} style_change={false}/>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>

      <style jsx global>{`
        /* Floating Menu Button */
        .floating-menu-button {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1001;
          pointer-events: auto;
        }
          
        @media screen and (max-width: 1200px) {
          .nav-menu,
          .nav-menu.active,
          .floating-menu-button {
            display: none !important;
            pointer-events: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
          }
        }

        .cool-top{
            display: flex;
            align-items: center;
            justify-content: center;

            /* p-4 sm:p-6 */
            padding: 1rem; /* p-4 */

            /* space-x-3 sm:space-x-4 */
            /* We use padding right on the icon and padding left on the text for consistent spacing */
            /* A common way to handle space-x is margin, but here we'll use gap or margin to the right on the icon */

            /* bg-gray-800 */
            background-color: #1f2937;

            /* border-t-4 border-t-indigo-500 */
            border-top: 4px solid #6366f1;

            /* rounded-t-2xl rounded-b-lg */
            border-top-left-radius: 1rem;    /* rounded-t-2xl */
            border-top-right-radius: 1rem;   /* rounded-t-2xl */
            border-bottom-left-radius: 0.5rem; /* rounded-b-lg */
            border-bottom-right-radius: 0.5rem; /* rounded-b-lg */
        }
        .menu-toggle-btn {
          background: rgba(139, 123, 209, 0.25);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 16px;
          padding: 16px 20px;
          color: #ffffff;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-toggle-btn:hover {
          background: rgba(139, 123, 209, 0.35);
          transform: scale(1.05);
          box-shadow: 0 8px 32px 0 rgba(139, 123, 209, 0.4);
        }

        /* Overlay removed - background is now fully interactive */

        /* Floating Sidebar */
        .nav-menu {
          position: fixed;
          top: 50%;
          left: -450px;
          transform: translateY(-50%);
          z-index: 1000;
          transition: left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          padding: 30px;
          pointer-events: none;
        }

        .nav-menu.active {
          left: 20px;
          pointer-events: auto;
        }

        .nav-menu-items {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Floating Cards with Stagger Animation */
        .nav-item {
          opacity: 0;
          transform: translateX(-80px) scale(0.9);
          animation: slideInBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .nav-menu.active .nav-item:nth-child(1) { animation-delay: 0.05s; }
        .nav-menu.active .nav-item:nth-child(2) { animation-delay: 0.1s; }
        .nav-menu.active .nav-item:nth-child(3) { animation-delay: 0.15s; }
        .nav-menu.active .nav-item:nth-child(4) { animation-delay: 0.2s; }
        .nav-menu.active .nav-item:nth-child(5) { animation-delay: 0.25s; }
        .nav-menu.active .nav-item:nth-child(6) { animation-delay: 0.3s; }

        @keyframes slideInBounce {
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .nav-item a {
          text-decoration: none;
          display: block;
        }

        /* Modern Top Section with separation */
        .cool-top {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 20px 24px;
          background: linear-gradient(135deg, 
            rgba(30, 30, 45, 0.95) 0%, 
            rgba(40, 40, 60, 0.9) 100%);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-top: 2px solid rgba(139, 123, 209, 0.6);
          border-radius: 20px 20px 0 0;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          margin-bottom: 0;
        }

        .cool-top::before {
          content: '';
          position: absolute;
          top: 0;
          left: -50%;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(139, 123, 209, 0.1),
            transparent
          );
          animation: shimmerTop 3s infinite;
        }

        /* Add visible separator line */
        .cool-top::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(139, 123, 209, 0.4) 50%,
            transparent 100%
          );
        }

        @keyframes shimmerTop {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .title-icon-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* Glass Card with visible gap */
        .nav-card {
          background: linear-gradient(135deg,
            rgba(45, 45, 70, 0.7) 0%,
            rgba(35, 35, 55, 0.65) 100%);
          backdrop-filter: blur(30px) saturate(150%);
          -webkit-backdrop-filter: blur(30px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: none;
          border-radius: 0 0 20px 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 320px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
          margin-top: 3px;
        }

        .nav-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at top right,
            rgba(139, 123, 209, 0.15) 0%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .nav-card:hover::before {
          opacity: 1;
        }

        .nav-card:hover {
          transform: translateY(-4px);
          border-color: rgba(139, 123, 209, 0.3);
          box-shadow: 
            0 25px 70px rgba(0, 0, 0, 0.6),
            0 0 40px rgba(139, 123, 209, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .nav-card > div {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
        }
        
        .nav-part-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-part-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: linear-gradient(180deg, 
            rgba(139, 123, 209, 0.8) 0%, 
            rgba(99, 102, 241, 0.8) 100%);
          border-radius: 12px 0 0 12px;
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .nav-part-item:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(139, 123, 209, 0.3);
          transform: translateX(4px);
        }

        .nav-part-item:hover::before {
          transform: scaleY(1);
        }

        .nav-icon {
          color: #ffffff;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 4px 12px rgba(139, 123, 209, 0.5));
          transition: all 0.3s ease;
        }

        .cool-top:hover .nav-icon {
          transform: scale(1.1) rotate(5deg);
          filter: drop-shadow(0 6px 16px rgba(139, 123, 209, 0.7));
        }

        .nav-title {
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: 0.3px;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
          background: linear-gradient(135deg, #ffffff 0%, #e0e0ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-title-sub {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.05rem;
          font-weight: 500;
          letter-spacing: 0.3px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          transition: all 0.3s ease;
        }

        .nav-part-item:hover .nav-title-sub {
          color: rgba(255, 255, 255, 1);
          transform: translateX(2px);
        }

        /* Prevent body scroll */
        body.sidebar-open {
          overflow: hidden;
        }

        /* Responsive */
        @media screen and (max-width: 768px) {
          .nav-menu.active {
            left: 15px;
          }

          .nav-card {
            min-width: 280px;
            padding: 20px;
          }

          .nav-icon {
            font-size: 1.6rem;
          }

          .nav-title {
            font-size: 1.15rem;
          }

          .cool-top {
            padding: 16px 20px;
          }
        }

        @media screen and (max-width: 480px) {
          .nav-menu.active {
            left: 10px;
          }

          .nav-card {
            min-width: 240px;
            padding: 18px;
            gap: 12px;
          }

          .cool-top {
            padding: 14px 16px;
            gap: 10px;
          }

          .nav-title {
            font-size: 1.05rem;
          }

          .nav-title-sub {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
}
