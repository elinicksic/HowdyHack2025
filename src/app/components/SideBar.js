"use client"
import { IconContext } from "react-icons";
import { useState, useEffect } from "react";
import Link from "next/link";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SideData";
import React from "react";

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

  var count = -1;

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        {/* Floating Menu Button */}
        {/* <div className="floating-menu-button">
          <button onClick={showSidebar} className="menu-toggle-btn">
            <FaIcons.FaBars />
          </button>
        </div> */}

        {/* Overlay - removed to allow background interaction */}

        {/* Floating Sidebar Items */}
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            {SidebarData.map((item, index) => {
              count = count + 1;

              if(count %3 == 0){
              return (
                <li key={index} className="nav-item">
                  <Link href={item.path} onClick={showSidebar}>
                    
                    <div className="nav-card">
                      <div className="nav-icon">
                        {item.icon}
                      </div>
                      <span className="nav-title">{item.title}</span>
                    </div>
                  </Link>
                </li>
              );}else{
                return(
                <li key={index} className="nav-item">
                  <Link href={item.path} onClick={showSidebar}>
                    
                    <div className="nav-card-min">
                      <div className="nav-icon">
                        {item.icon}
                      </div>
                      <span className="nav-title">{item.title}</span>
                    </div>
                  </Link>
                </li>);
              }
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
          left: -400px;
          transform: translateY(-50%);
          z-index: 1000;
          transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 40px 30px;
          pointer-events: none;
        }

        .nav-menu.active {
          left: 30px;
          pointer-events: auto;
        }

        .nav-menu-items {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Floating Cards */
        .nav-item {
          opacity: 0;
          transform: translateX(-50px);
          animation: slideIn 0.5s ease forwards;
        }

        .nav-menu.active .nav-item:nth-child(1) { animation-delay: 0.1s; }
        .nav-menu.active .nav-item:nth-child(2) { animation-delay: 0.15s; }
        .nav-menu.active .nav-item:nth-child(3) { animation-delay: 0.2s; }
        .nav-menu.active .nav-item:nth-child(4) { animation-delay: 0.25s; }
        .nav-menu.active .nav-item:nth-child(5) { animation-delay: 0.3s; }
        .nav-menu.active .nav-item:nth-child(6) { animation-delay: 0.35s; }

        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .nav-item a {
          text-decoration: none;
          display: block;
        }

        .nav-card {
          background: rgba(76, 70, 117, 0.4);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          padding: 24px 32px;
          display: flex;
          align-items: center;
          gap: 20px;
          min-width: 280px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.3);
          position: relative;
          overflow: hidden;
        }
        .nav-card-min{
          background: rgba(76, 70, 117, 0.4);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          padding: 5px 15px;
          display: flex;
          align-items: center;
          gap: 20px;
          min-width: 100px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.3);
          position: relative;
          overflow: hidden;
        }

        .nav-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(139, 123, 209, 0.1) 0%,
            rgba(99, 102, 241, 0.05) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .nav-card:hover {
          background: rgba(76, 70, 117, 0.6);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateX(10px) scale(1.03);
          box-shadow: 0 12px 40px 0 rgba(139, 123, 209, 0.5);
        }

        .nav-card:hover::before {
          opacity: 1;
        }

        .nav-icon {
          color: #ffffff;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
          transition: transform 0.3s ease;
        }

        .nav-card:hover .nav-icon {
          transform: scale(1.1) rotate(-5deg);
        }

        .nav-title {
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        /* Prevent body scroll */
        body.sidebar-open {
          overflow: hidden;
        }

        /* Responsive */
        @media screen and (max-width: 768px) {
          .nav-menu.active {
            left: 20px;
          }

          .nav-card {
            min-width: 240px;
            padding: 20px 24px;
          }

          .nav-icon {
            font-size: 1.5rem;
          }

          .nav-title {
            font-size: 1.1rem;
          }
        }

        @media screen and (max-width: 480px) {
          .floating-menu-button {
            top: 15px;
            left: 15px;
          }

          .menu-toggle-btn {
            padding: 14px 18px;
            font-size: 1.3rem;
          }

          .nav-menu.active {
            left: 15px;
          }

          .nav-card {
            min-width: 200px;
            padding: 18px 20px;
            gap: 16px;
          }
        }
      `}</style>
    </>
  );
}