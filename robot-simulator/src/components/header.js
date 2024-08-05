import Link from 'next/link';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#f0f0f0', padding: '20px 50px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
          My Website
        </Link>
        <nav>
          <Link href="/about" style={{ color: '#0070f3', fontSize: '18px', textDecoration: 'none', marginLeft: '20px' }}>
            About Me
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;