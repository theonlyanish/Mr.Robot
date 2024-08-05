import Header from '../components/header';

const Home = () => {
  return (
    <div>
      <Header />
      <main style={{ margin: '40px', fontSize: '18px', lineHeight: '1.6' }}>
        <h1>Welcome to My Website</h1>
        <p>This is the homepage of my personal website. You can find more about me by navigating to the About Me section.</p>
      </main>
    </div>
  );
};

export default Home;
