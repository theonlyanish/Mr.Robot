import Header from '../components/header';

export const metadata = {
  title: 'Robot Simulator',
  description: 'Control a robot on a 5x5 grid',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}