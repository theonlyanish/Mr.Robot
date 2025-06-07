'use client';

import { useDarkMode } from './DarkModeContext';

const GameRules = () => {
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
    maxWidth: '800px',
    color: isDarkMode ? '#e0e0e0' : '#2c3e50',
    transition: 'color 0.3s ease'
  };

  const headingStyle = {
    ...fontStyle,
    fontSize: '1.5rem',
    fontWeight: 600,
    color: isDarkMode ? '#e0e0e0' : '#333',
    marginBottom: '1rem',
    marginTop: '2rem'
  };

  const subHeadingStyle = {
    ...fontStyle,
    fontSize: '1.1rem',
    fontWeight: 500,
    color: isDarkMode ? '#b0b0b0' : '#555',
    marginBottom: '0.75rem',
    marginTop: '1.5rem'
  };

  const paragraphStyle = {
    ...fontStyle,
    marginBottom: '1rem'
  };

  const listStyle = {
    ...fontStyle,
    marginBottom: '1rem',
    paddingLeft: '1.5rem'
  };

  const codeStyle = {
    backgroundColor: isDarkMode ? '#3a3a3a' : '#f5f5f5',
    color: isDarkMode ? '#e0e0e0' : '#333',
    padding: '2px 6px',
    borderRadius: '4px',
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    fontSize: '0.85rem',
    fontWeight: 500
  };

  const robotEmoji = {
    fontSize: '1.2rem',
    marginRight: '0.5rem'
  };

  const sectionStyle = {
    marginBottom: '2rem'
  };

  return (
    <main style={mainStyle}>
              <h1 style={{ ...headingStyle, fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
          RoboGrid Game Rules
        </h1>
      
      <div style={sectionStyle}>
        <h2 style={headingStyle}>How to Play</h2>
        <p style={paragraphStyle}>
          Welcome to the Robot Simulator! Your mission is simple: guide your robot around the grid to collect stars while avoiding obstacles. Each robot has unique abilities that change how you approach the challenge.
        </p>
        <p style={paragraphStyle}>
          The game takes place on a 5×5 grid where obstacles (🚧) block your path and stars (⭐) await collection. Every time you successfully collect a star, the grid reshuffles with new obstacles and goals, keeping the challenge fresh and engaging.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Meet Your Robots</h2>
        <p style={paragraphStyle}>
          Choose from four distinct robot types, each designed for different play styles and strategies:
        </p>

        <h3 style={subHeadingStyle}>
          <span style={robotEmoji}>🤖</span>Standard Robot
        </h3>
        <p style={paragraphStyle}>
          The reliable workhorse. Moves one space at a time in the four cardinal directions. Perfect for beginners learning the ropes or when you need precise, predictable movement.
        </p>

        <h3 style={subHeadingStyle}>
          <span style={robotEmoji}>🚀</span>Fast Robot
        </h3>
        <p style={paragraphStyle}>
          Built for speed! This robot covers two spaces with each move, making it excellent for quickly traversing the grid. Be careful around obstacles though – that extra speed requires more planning.
        </p>

        <h3 style={subHeadingStyle}>
          <span style={robotEmoji}>💎</span>Diagonal Robot
        </h3>
        <p style={paragraphStyle}>
          The most versatile navigator. Unlike other robots limited to four directions, this gem can move diagonally, giving you eight possible directions. It&apos;s perfect for finding creative paths around complex obstacle layouts.
        </p>

        <h3 style={subHeadingStyle}>
          <span style={robotEmoji}>🔋</span>Energy Robot
        </h3>
        <p style={paragraphStyle}>
          The strategic challenge. This robot operates on limited energy – just 10 moves before needing a recharge. It adds a layer of resource management that transforms simple navigation into careful planning.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Three Ways to Control</h2>

        <h3 style={subHeadingStyle}>Button Controls</h3>
        <p style={paragraphStyle}>
          Click the on-screen buttons for direct control. The interface adapts to your chosen robot – diagonal robots get extra directional buttons, while energy robots show a recharge option when needed.
        </p>

        <h3 style={subHeadingStyle}>Keyboard Controls</h3>
        <p style={paragraphStyle}>
          Click anywhere on the game area to activate keyboard mode, then use these controls:
        </p>
        <ul style={listStyle}>
          <li><code style={codeStyle}>W</code> or <code style={codeStyle}>↑</code> to move forward</li>
          <li><code style={codeStyle}>A</code> or <code style={codeStyle}>←</code> to turn left</li>
          <li><code style={codeStyle}>D</code> or <code style={codeStyle}>→</code> to turn right</li>
          <li><code style={codeStyle}>S</code> or <code style={codeStyle}>↓</code> to turn around</li>
        </ul>
        <p style={paragraphStyle}>
          Diagonal robots get bonus keys: <code style={codeStyle}>Q</code> and <code style={codeStyle}>E</code> for diagonal up movements, <code style={codeStyle}>Z</code>, <code style={codeStyle}>X</code>, and <code style={codeStyle}>C</code> for diagonal down movements.
        </p>

        <h3 style={subHeadingStyle}>Command Programming</h3>
        <p style={paragraphStyle}>
          The most powerful feature! Type a sequence of commands separated by commas to program your robot&apos;s entire journey. It&apos;s like writing a simple program:
        </p>
        <ul style={listStyle}>
          <li><code style={codeStyle}>MOVE, RIGHT, MOVE, LEFT, MOVE</code> – A basic navigation sequence</li>
          <li><code style={codeStyle}>NW, SE, NE, SW</code> – Diagonal dancing (diagonal robot only)</li>
          <li><code style={codeStyle}>MOVE, MOVE, RECHARGE, MOVE, MOVE</code> – Energy management (energy robot)</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Game Mechanics</h2>
        <p style={paragraphStyle}>
          <strong>Obstacles</strong> are immovable barriers. Any command that would send your robot into an obstacle is simply ignored – your robot stays put and waits for a valid command.
        </p>
        <p style={paragraphStyle}>
          <strong>Goals</strong> are collected automatically when your robot moves onto a star. The moment you collect one, the grid reshuffles with new challenges, ensuring endless variety.
        </p>
        <p style={paragraphStyle}>
          <strong>Energy management</strong> (for energy robots) adds strategic depth. Watch your energy counter and plan recharge points into longer command sequences. Running out of energy mid-sequence will halt execution.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Pro Tips</h2>
        <ul style={listStyle}>
          <li>Study the grid layout before making your first move – planning saves time</li>
          <li>Use command programming for complex maneuvers – it&apos;s faster than individual button clicks</li>
          <li>Diagonal robots can often find shorter paths by cutting corners</li>
          <li>Fast robots are great for open areas but need extra caution near obstacles</li>
          <li>Energy robots reward careful planning – map out your entire route including recharge stops</li>
          <li>Don&apos;t forget you can switch robot types anytime to tackle different challenges</li>
        </ul>
      </div>

      <p style={{ ...paragraphStyle, textAlign: 'center', marginTop: '3rem', fontStyle: 'italic', fontSize: '1rem' }}>
        Ready to start your robotic adventure? Choose your robot and begin exploring! 🚀
      </p>
    </main>
  );
};

export default GameRules;