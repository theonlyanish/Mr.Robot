import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header style={{ 
      backgroundColor: '#ffffff', 
      padding: '20px 50px', 
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Link href="/" style={{ 
          textDecoration: 'none', 
          color: '#333', 
          fontSize: '24px', 
          fontWeight: 'bold' 
        }}>
          <Image src="/bellroy.png" alt="Bellroy" width={100} height={40} />
        </Link>
        <nav>
          <Link href="/about" style={{ 
            color: '#333', 
            fontSize: '18px', 
            textDecoration: 'none', 
            marginLeft: '20px' 
          }}>
            About Me
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;