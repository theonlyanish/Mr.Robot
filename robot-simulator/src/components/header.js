'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useDarkMode } from './DarkModeContext';

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const headerStyle = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    padding: '20px 50px',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    borderBottom: isDarkMode ? '1px solid #333' : '1px solid #eee'
  };

  const linkStyle = {
    color: isDarkMode ? '#fff' : '#333',
    fontSize: '18px',
    textDecoration: 'none',
    marginLeft: '20px'
  };

  const logoLinkStyle = {
    textDecoration: 'none',
    color: isDarkMode ? '#fff' : '#333',
    fontSize: '24px',
    fontWeight: 'bold'
  };

  const toggleStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '20px',
    backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
    border: 'none',
    transition: 'all 0.3s ease'
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
        <Link href="/" style={logoLinkStyle}>
          <Image src="/bellroy.png" alt="Bellroy" width={100} height={40} />
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/about" style={linkStyle}>
            About Me
          </Link>
          <button onClick={toggleDarkMode} style={toggleStyle}>
            <span style={{ fontSize: '16px' }}>
              {isDarkMode ? '☀️' : '🌙'}
            </span>
            <span style={{ color: isDarkMode ? '#fff' : '#333', fontSize: '14px' }}>
              {isDarkMode ? 'Light' : 'Dark'}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;