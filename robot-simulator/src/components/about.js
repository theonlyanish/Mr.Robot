'use client';

import { useDarkMode } from './DarkModeContext';

const About = () => {
  const { isDarkMode } = useDarkMode();
 
  const fontStyle = {
    fontFamily: 'GTUltra, Lato, Noto Sans, Noto Sans JP, Noto Sans KR, Noto Sans SC, Noto Sans TC, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji"',
    fontSize: '.9285714285714286rem',
    lineHeight: '1.5rem',
    fontWeight: 400,
    letterSpacing: '.025em',
    WebkitFontSmoothing: 'antialiased',
    color: isDarkMode ? '#e0e0e0' : '#333'
  };

  const mainStyle = {
    margin: '40px auto',
    fontSize: '18px',
    lineHeight: '1.6',
    maxWidth: '800px',
    color: isDarkMode ? '#e0e0e0' : '#2c3e50',
    transition: 'color 0.3s ease'
  };

  const headingStyle = {
    fontFamily: 'GTUltra, Lato, Noto Sans, Noto Sans JP, Noto Sans KR, Noto Sans SC, Noto Sans TC, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji"',
    fontSize: '2rem',
    fontWeight: 600,
    color: isDarkMode ? '#e0e0e0' : '#333',
    marginBottom: '20px'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: isDarkMode ? '#5dade2' : 'blue',
    transition: 'color 0.3s ease'
  };      

  return (
    <main style={mainStyle}>
      <h1 style={headingStyle}>About Me</h1>
      <p style={fontStyle}>Hello, I'm Anish Kapse. Welcome to my personal space on the web where I share my passion for technology and innovation.</p>
      <p style={fontStyle}>I am a software developer with a keen interest in front-end technologies and user experience design. I have experience in a range of programming languages and frameworks including JavaScript, TypeScript, React, and Node.js. My technical skills also extend to building responsive and accessible web applications that adhere to modern web standards.</p>
      <p style={fontStyle}>My recent projects include a sophisticated meeting scheduler application that integrates real-time availability with automated notifications and seamless video conferencing capabilities. Additionally, I developed a centralized system for inventory management and recruitment that leverages the power of React and Google Cloud Platform to deliver a high-performance web experience.</p>
      <p style={fontStyle}>Aside from my professional work, I'm also passionate about robotics and programming. This interest led me to create the Robot Simulator project, a fun and interactive way to demonstrate basic concepts of robot movement and control in a 2D space. This project is a reflection of my enthusiasm for merging creative problem solving with technical expertise.</p>
      <p style={fontStyle}>Furthermore, I have developed <a href="https://apps.apple.com/au/app/healthtonic-health-tracker/id6496689413" style={linkStyle}>HealthTonic</a>, an iOS application available on the App Store. This app is designed for detailed tracking of calories, steps, water intake, and weight, featuring personalized UI, barcode scanning, and integration with the Health app.</p>
      <p style={fontStyle}>Feel free to explore my projects and connect with me if you have any questions or suggestions. Visit my <a href="https://anishkapse.com/" style={linkStyle}>portfolio</a> or <a href="https://github.com/theonlyanish" style={linkStyle}>GitHub</a> to see more of my work or check out my coding snippets on <a href="https://codepen.io/akap0009" style={linkStyle}>CodePen</a>.</p>
    </main>
  );
};

export default About;
