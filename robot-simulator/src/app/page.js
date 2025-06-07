'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import Header from '../components/header';
import About from '../components/about';
import { useDarkMode } from '../components/DarkModeContext';

const GRID_SIZE = 5;
const DIRECTIONS = ['North', 'East', 'South', 'West'];

const generateNewPosition = (currentObstacles, robotPos) => {
  let newPos;
  do {
    newPos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  } while (
    currentObstacles.some(o => o.x === newPos.x && o.y === newPos.y) ||
    (newPos.x === robotPos.x && newPos.y === robotPos.y)
  );
  return newPos;
};

export default function Home() {
  const { isDarkMode } = useDarkMode();
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(0);
  const [commandQueue, setCommandQueue] = useState('');
  const [obstacles, setObstacles] = useState([
    { x: 2, y: 2, type: 'obstacle' },
    { x: 4, y: 4, type: 'goal' },
  ]);
  const [goalCollected, setGoalCollected] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Only handle keyboard events if the container is focused
      if (document.activeElement !== containerRef.current) return;

      event.preventDefault();
      
      switch (event.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          moveForward();
          break;
        case 'arrowleft':
        case 'a':
          rotate(false); // Turn left
          break;
        case 'arrowright':
        case 'd':
          rotate(true); // Turn right
          break;
        case 'arrowdown':
        case 's':
          // Turn around (180 degrees)
          rotate(true);
          setTimeout(() => rotate(true), 100);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [direction, obstacles]); // Include dependencies for the functions used

  const moveForward = () => {
    setPosition(prev => {
      let newPos = { ...prev };
      switch (DIRECTIONS[direction]) {
        case 'North': newPos = { ...prev, y: Math.max(0, prev.y - 1) }; break;
        case 'East': newPos = { ...prev, x: Math.min(GRID_SIZE - 1, prev.x + 1) }; break;
        case 'South': newPos = { ...prev, y: Math.min(GRID_SIZE - 1, prev.y + 1) }; break;
        case 'West': newPos = { ...prev, x: Math.max(0, prev.x - 1) }; break;
      }

      // Check for obstacles
      const obstacle = obstacles.find(o => o.x === newPos.x && o.y === newPos.y && o.type === 'obstacle');
      if (obstacle) return prev;

      // Check for goal
      const goal = obstacles.find(o => o.x === newPos.x && o.y === newPos.y && o.type === 'goal');
      if (goal) {
        setGoalCollected(true);
        // Generate new obstacle and goal positions
        const currentObstacles = obstacles.filter(o => o.type === 'obstacle');
        const newObstaclePos = generateNewPosition(currentObstacles, newPos);
        const newGoalPos = generateNewPosition([...currentObstacles, { ...newObstaclePos, type: 'obstacle' }], newPos);
        
        setObstacles([
          { ...newObstaclePos, type: 'obstacle' },
          { ...newGoalPos, type: 'goal' }
        ]);

        setTimeout(() => setGoalCollected(false), 1500);
      }

      return newPos;
    });
  };

  const rotate = (clockwise) => {
    setDirection(prev => (prev + (clockwise ? 1 : 3)) % 4);
  };

  const executeCommands = () => {
    const commands = commandQueue.toUpperCase().split(',').map(cmd => cmd.trim());
    let index = 0;
    let currentDirection = direction; // Track direction locally

    const executeNextCommand = () => {
      if (index >= commands.length) {
        setCommandQueue('');
        return;
      }

      const command = commands[index];
      switch (command) {
        case 'MOVE': 
          // Use current direction for movement calculation
          setPosition(prev => {
            let newPos = { ...prev };
            switch (DIRECTIONS[currentDirection]) {
              case 'North': newPos = { ...prev, y: Math.max(0, prev.y - 1) }; break;
              case 'East': newPos = { ...prev, x: Math.min(GRID_SIZE - 1, prev.x + 1) }; break;
              case 'South': newPos = { ...prev, y: Math.min(GRID_SIZE - 1, prev.y + 1) }; break;
              case 'West': newPos = { ...prev, x: Math.max(0, prev.x - 1) }; break;
            }

            // Check for obstacles
            const obstacle = obstacles.find(o => o.x === newPos.x && o.y === newPos.y && o.type === 'obstacle');
            if (obstacle) return prev;

            // Check for goal
            const goal = obstacles.find(o => o.x === newPos.x && o.y === newPos.y && o.type === 'goal');
            if (goal) {
              setGoalCollected(true);
              // Generate new obstacle and goal positions
              const currentObstacles = obstacles.filter(o => o.type === 'obstacle');
              const newObstaclePos = generateNewPosition(currentObstacles, newPos);
              const newGoalPos = generateNewPosition([...currentObstacles, { ...newObstaclePos, type: 'obstacle' }], newPos);
              
              setObstacles([
                { ...newObstaclePos, type: 'obstacle' },
                { ...newGoalPos, type: 'goal' }
              ]);

              setTimeout(() => setGoalCollected(false), 1500);
            }

            return newPos;
          });
          break;
        case 'LEFT': 
          currentDirection = (currentDirection + 3) % 4;
          setDirection(currentDirection);
          break;
        case 'RIGHT': 
          currentDirection = (currentDirection + 1) % 4;
          setDirection(currentDirection);
          break;
      }

      index++;
      setTimeout(executeNextCommand, 500);
    };

    executeNextCommand();
  };

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}
      tabIndex={0}
      onClick={() => containerRef.current?.focus()}
    >
      <h1>Robot Control Simulator</h1>
      <div className={styles.grid}>
        {[...Array(GRID_SIZE)].map((_, y) => (
          [...Array(GRID_SIZE)].map((_, x) => (
            <div key={`${x}-${y}`} className={styles.cell}>
              {obstacles.map((obstacle, i) => 
                obstacle.x === x && obstacle.y === y && !goalCollected && (
                  <div key={i} className={styles[obstacle.type]}>
                    {obstacle.type === 'obstacle' ? '🚧' : '⭐'}
                  </div>
                )
              )}
              {x === position.x && y === position.y && (
                <div className={`${styles.robot} ${styles[DIRECTIONS[direction].toLowerCase()]}`}>🤖</div>
              )}
            </div>
          ))
        ))}
      </div>
      <div className={styles.controls}>
        <button onClick={moveForward}>Move Forward</button>
        <button onClick={() => rotate(true)}>Rotate Clockwise</button>
        <button onClick={() => rotate(false)}>Rotate Counter-Clockwise</button>
      </div>
      <div className={styles.commandQueue}>
        <input
          type="text"
          value={commandQueue}
          onChange={(e) => setCommandQueue(e.target.value)}
          placeholder="Enter commands (e.g., MOVE, LEFT, MOVE, RIGHT)"
          className={styles.commandInput}
        />
        <button className={styles.executeButton} onClick={executeCommands}>Execute Commands</button>
      </div>
      <div className={styles.status}>
        Position: ({position.x}, {position.y}) | Direction: {DIRECTIONS[direction]}
        {goalCollected && <span className={styles.success}> | Goal collected! 🎉</span>}
      </div>
      <div className={styles.keyboardHint}>
        Click here and use Arrow Keys or WASD to control the robot
      </div>
    </div>
  );
}

