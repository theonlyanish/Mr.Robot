'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useDarkMode } from './DarkModeContext';

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [hoveredItem, setHoveredItem] = useState(null);

  const baseFont = 'GTUltra, Lato, Noto Sans, Noto Sans JP, Noto Sans KR, Noto Sans SC, Noto Sans TC, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji"';

  const headerStyle = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    padding: '20px 50px',
    fontFamily: baseFont,
    borderBottom: isDarkMode ? '1px solid #333' : '1px solid #eee'
  };

  const navItemStyle = {
    color: isDarkMode ? '#fff' : '#333',
    fontSize: '16px',
    fontFamily: baseFont,
    fontWeight: 400,
    textDecoration: 'none',
    marginLeft: '24px',
    padding: '16px 12px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const logoLinkStyle = {
    textDecoration: 'none',
    color: isDarkMode ? '#fff' : '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: baseFont
  };

  const getNavItemStyle = (itemName) => ({
    ...navItemStyle,
    backgroundColor: hoveredItem === itemName ? (isDarkMode ? '#333' : '#f5f5f5') : 'transparent'
  });

  const toggleButtonStyle = {
    ...getNavItemStyle('toggle'),
    border: 'none',
    cursor: 'pointer'
  };

  return (
    <header style={headerStyle}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
          <Link href="/" style={logoLinkStyle}>
            <Image 
              src="/robot.svg" 
              alt="RoboGrid" 
              width={85} 
              height={45}
              style={{
                filter: isDarkMode ? 'brightness(0) invert(1)' : 'none'
              }}
            />
          </Link>
          <Link href="/" style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: isDarkMode ? '#fff' : '#333',
            fontFamily: baseFont,
            textDecoration: 'none'
          }}>
            RoboGrid
          </Link>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={toggleDarkMode} 
            style={toggleButtonStyle}
            onMouseEnter={() => setHoveredItem('toggle')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span style={{ fontSize: '16px' }}>
              {isDarkMode ? '☀️' : '🌙'}
            </span>
            <span>
              {isDarkMode ? 'Light' : 'Dark'}
            </span>
          </button>
          <Link 
            href="/rules" 
            style={getNavItemStyle('rules')}
            onMouseEnter={() => setHoveredItem('rules')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Game Rules
          </Link>
          <Link 
            href="/about" 
            style={getNavItemStyle('about')}
            onMouseEnter={() => setHoveredItem('about')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            About Me
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;