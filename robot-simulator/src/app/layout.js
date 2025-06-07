import Header from '../components/header';
import { DarkModeProvider } from '../components/DarkModeContext';
import './globals.css';

export const metadata = {
  title: 'Robot Simulator',
  description: 'Control a robot on a 5x5 grid',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DarkModeProvider>
          <Header />
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}