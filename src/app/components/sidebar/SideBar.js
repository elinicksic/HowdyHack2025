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
            return (
                
                <li key={index} className="nav-item">
                        <div className="cool-top">
                            <span className="nav-title">{item.title}</span>
                            <div className="nav-icon">
                                    {item.icon}
                            </div>
                            <ProgressBar progress={"30"} style_change={true}/>
                        </div>
                        
                        <div className="nav-card">
                            
                            {/* Use a DIV instead of UL to wrap the inner links */}
                            {item.categories && item.categories.length > 0 && (
                                <div>
                                    {item.categories.map((item1, index1) => (
                                        <div key={index1} className="nav-part-item"> {/* Use DIV or SPAN instead of LI */}
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
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          min-width: 280px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .nav-card > div {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }
        
        .nav-part-item {
          display: flex;
          flex-direction: column;
          gap: 12px;
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

        .nav-icon {
          color: #ffffff;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
          transition: transform 0.3s ease;
        }

        .nav-title {
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        .nav-title-sub {
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