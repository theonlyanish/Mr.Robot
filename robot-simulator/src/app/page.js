'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import Header from '../components/header';
import About from '../components/about';
import { useDarkMode } from '../components/DarkModeContext';

const GRID_SIZE = 5;
const DIRECTIONS = ['North', 'East', 'South', 'West'];

const ROBOT_TYPES = {
  STANDARD: {
    name: 'Standard Robot',
    emoji: '🤖',
    moveDistance: 1,
    canMoveDiagonally: false,
    energyLimit: null,
    description: 'Basic robot with standard movement'
  },
  FAST: {
    name: 'Fast Robot',
    emoji: '🚀',
    moveDistance: 2,
    canMoveDiagonally: false,
    energyLimit: null,
    description: 'Moves 2 spaces at once'
  },
  DIAGONAL: {
    name: 'Diagonal Robot',
    emoji: '💎',
    moveDistance: 1,
    canMoveDiagonally: true,
    energyLimit: null,
    description: 'Can move diagonally'
  },
  LIMITED: {
    name: 'Energy Robot',
    emoji: '🔋',
    moveDistance: 1,
    canMoveDiagonally: false,
    energyLimit: 10,
    description: 'Limited to 10 moves before recharging'
  }
};

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
  const [currentRobotType, setCurrentRobotType] = useState('STANDARD');
  const [energy, setEnergy] = useState(10);
  const [commandQueue, setCommandQueue] = useState('');
  const [obstacles, setObstacles] = useState([
    { x: 2, y: 2, type: 'obstacle' },
    { x: 4, y: 4, type: 'goal' },
  ]);
  const [goalCollected, setGoalCollected] = useState(false);

  const currentRobot = ROBOT_TYPES[currentRobotType];

  useEffect(() => {
    // Reset energy when robot type changes
    if (currentRobot.energyLimit) {
      setEnergy(currentRobot.energyLimit);
    }
  }, [currentRobotType]);

  const canMove = () => {
    if (currentRobot.energyLimit && energy <= 0) {
      return false;
    }
    return true;
  };

  const consumeEnergy = () => {
    if (currentRobot.energyLimit) {
      setEnergy(prev => Math.max(0, prev - 1));
    }
  };

  const rechargeRobot = () => {
    if (currentRobot.energyLimit) {
      setEnergy(currentRobot.energyLimit);
    }
  };

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
        case 'q':
          if (currentRobot.canMoveDiagonally) {
            moveDiagonal('NW');
          }
          break;
        case 'e':
          if (currentRobot.canMoveDiagonally) {
            moveDiagonal('NE');
          }
          break;
        case 'z':
        case 'x':
          if (currentRobot.canMoveDiagonally) {
            moveDiagonal('SW');
          }
          break;
        case 'c':
          if (currentRobot.canMoveDiagonally) {
            moveDiagonal('SE');
          }
          break;
        case 'r':
          if (currentRobot.energyLimit && energy === 0) {
            rechargeRobot();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [direction, obstacles]); // Include dependencies for the functions used

  const moveForward = () => {
    if (!canMove()) return;

    setPosition(prev => {
      let newPos = { ...prev };
      const distance = currentRobot.moveDistance;
      
      switch (DIRECTIONS[direction]) {
        case 'North': newPos = { ...prev, y: Math.max(0, prev.y - distance) }; break;
        case 'East': newPos = { ...prev, x: Math.min(GRID_SIZE - 1, prev.x + distance) }; break;
        case 'South': newPos = { ...prev, y: Math.min(GRID_SIZE - 1, prev.y + distance) }; break;
        case 'West': newPos = { ...prev, x: Math.max(0, prev.x - distance) }; break;
      }

      // Check for obstacles
      const obstacle = obstacles.find(o => o.x === newPos.x && o.y === newPos.y && o.type === 'obstacle');
      if (obstacle) return prev;

      // Check for goal
      const goal = obstacles.find(o => o.x === newPos.x && o.y === newPos.y && o.type === 'goal');
      if (goal) {
        setGoalCollected(true);
        const currentObstacles = obstacles.filter(o => o.type === 'obstacle');
        const newObstaclePos = generateNewPosition(currentObstacles, newPos);
        const newGoalPos = generateNewPosition([...currentObstacles, { ...newObstaclePos, type: 'obstacle' }], newPos);
        
        setObstacles([
          { ...newObstaclePos, type: 'obstacle' },
          { ...newGoalPos, type: 'goal' }
        ]);

        setTimeout(() => setGoalCollected(false), 1500);
      }

      consumeEnergy();
      return newPos;
    });
  };

  const moveDiagonal = (direction) => {
    if (!canMove() || !currentRobot.canMoveDiagonally) return;

    setPosition(prev => {
      let newPos = { ...prev };
      
      switch (direction) {
        case 'NW': newPos = { x: Math.max(0, prev.x - 1), y: Math.max(0, prev.y - 1) }; break;
        case 'NE': newPos = { x: Math.min(GRID_SIZE - 1, prev.x + 1), y: Math.max(0, prev.y - 1) }; break;
        case 'SW': newPos = { x: Math.max(0, prev.x - 1), y: Math.min(GRID_SIZE - 1, prev.y + 1) }; break;
        case 'SE': newPos = { x: Math.min(GRID_SIZE - 1, prev.x + 1), y: Math.min(GRID_SIZE - 1, prev.y + 1) }; break;
      }

      // Check for obstacles
      const obstacle = obstacles.find(o => o.x === newPos.x && o.y === newPos.y && o.type === 'obstacle');
      if (obstacle) return prev;

      // Check for goal
      const goal = obstacles.find(o => o.x === newPos.x && o.y === newPos.y && o.type === 'goal');
      if (goal) {
        setGoalCollected(true);
        const currentObstacles = obstacles.filter(o => o.type === 'obstacle');
        const newObstaclePos = generateNewPosition(currentObstacles, newPos);
        const newGoalPos = generateNewPosition([...currentObstacles, { ...newObstaclePos, type: 'obstacle' }], newPos);
        
        setObstacles([
          { ...newObstaclePos, type: 'obstacle' },
          { ...newGoalPos, type: 'goal' }
        ]);

        setTimeout(() => setGoalCollected(false), 1500);
      }

      consumeEnergy();
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
          if (!canMove()) {
            setCommandQueue('');
            return;
          }
          
          setPosition(prev => {
            let newPos = { ...prev };
            const distance = currentRobot.moveDistance;
            
            switch (DIRECTIONS[currentDirection]) {
              case 'North': newPos = { ...prev, y: Math.max(0, prev.y - distance) }; break;
              case 'East': newPos = { ...prev, x: Math.min(GRID_SIZE - 1, prev.x + distance) }; break;
              case 'South': newPos = { ...prev, y: Math.min(GRID_SIZE - 1, prev.y + distance) }; break;
              case 'West': newPos = { ...prev, x: Math.max(0, prev.x - distance) }; break;
            }

            // Check for obstacles
            const obstacle = obstacles.find(o => o.x === newPos.x && o.y === newPos.y && o.type === 'obstacle');
            if (obstacle) return prev;

            // Check for goal
            const goal = obstacles.find(o => o.x === newPos.x && o.y === newPos.y && o.type === 'goal');
            if (goal) {
              setGoalCollected(true);
              const currentObstacles = obstacles.filter(o => o.type === 'obstacle');
              const newObstaclePos = generateNewPosition(currentObstacles, newPos);
              const newGoalPos = generateNewPosition([...currentObstacles, { ...newObstaclePos, type: 'obstacle' }], newPos);
              
              setObstacles([
                { ...newObstaclePos, type: 'obstacle' },
                { ...newGoalPos, type: 'goal' }
              ]);

              setTimeout(() => setGoalCollected(false), 1500);
            }

            consumeEnergy();
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
        case 'NW':
        case 'NE':
        case 'SW':
        case 'SE':
          if (!canMove() || !currentRobot.canMoveDiagonally) {
            setCommandQueue('');
            return;
          }
          
          setPosition(prev => {
            let newPos = { ...prev };
            
            switch (command) {
              case 'NW': newPos = { x: Math.max(0, prev.x - 1), y: Math.max(0, prev.y - 1) }; break;
              case 'NE': newPos = { x: Math.min(GRID_SIZE - 1, prev.x + 1), y: Math.max(0, prev.y - 1) }; break;
              case 'SW': newPos = { x: Math.max(0, prev.x - 1), y: Math.min(GRID_SIZE - 1, prev.y + 1) }; break;
              case 'SE': newPos = { x: Math.min(GRID_SIZE - 1, prev.x + 1), y: Math.min(GRID_SIZE - 1, prev.y + 1) }; break;
            }

            const obstacle = obstacles.find(o => o.x === newPos.x && o.y === newPos.y && o.type === 'obstacle');
            if (obstacle) return prev;

            const goal = obstacles.find(o => o.x === newPos.x && o.y === newPos.y && o.type === 'goal');
            if (goal) {
              setGoalCollected(true);
              const currentObstacles = obstacles.filter(o => o.type === 'obstacle');
              const newObstaclePos = generateNewPosition(currentObstacles, newPos);
              const newGoalPos = generateNewPosition([...currentObstacles, { ...newObstaclePos, type: 'obstacle' }], newPos);
              
              setObstacles([
                { ...newObstaclePos, type: 'obstacle' },
                { ...newGoalPos, type: 'goal' }
              ]);

              setTimeout(() => setGoalCollected(false), 1500);
            }

            consumeEnergy();
            return newPos;
          });
          break;
        case 'RECHARGE':
          if (currentRobot.energyLimit) {
            setEnergy(currentRobot.energyLimit);
          }
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
      
      <div className={styles.robotSelector}>
        <label>Robot Type: </label>
        <select 
          value={currentRobotType} 
          onChange={(e) => { e.stopPropagation(); setCurrentRobotType(e.target.value); }}
          onClick={(e) => e.stopPropagation()}
          className={styles.robotSelect}
        >
          {Object.entries(ROBOT_TYPES).map(([key, robot]) => (
            <option key={key} value={key}>
              {robot.emoji} {robot.name}
            </option>
          ))}
        </select>
        <div className={styles.robotDescription}>{currentRobot.description}</div>
      </div>

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
                <div className={`${styles.robot} ${styles[DIRECTIONS[direction].toLowerCase()]}`}>
                  {currentRobot.emoji}
                </div>
              )}
            </div>
          ))
        ))}
      </div>
      <div className={styles.controls}>
        <button 
          onClick={(e) => { e.stopPropagation(); moveForward(); }}
          disabled={!canMove()}
        >
          Move Forward {currentRobot.moveDistance > 1 ? `(${currentRobot.moveDistance} spaces)` : ''}
        </button>
        <button onClick={(e) => { e.stopPropagation(); rotate(true); }}>Rotate Clockwise</button>
        <button onClick={(e) => { e.stopPropagation(); rotate(false); }}>Rotate Counter-Clockwise</button>
        {currentRobot.canMoveDiagonally && (
          <>
            <button onClick={(e) => { e.stopPropagation(); moveDiagonal('NW'); }} disabled={!canMove()}>↖ NW</button>
            <button onClick={(e) => { e.stopPropagation(); moveDiagonal('NE'); }} disabled={!canMove()}>↗ NE</button>
            <button onClick={(e) => { e.stopPropagation(); moveDiagonal('SW'); }} disabled={!canMove()}>↙ SW</button>
            <button onClick={(e) => { e.stopPropagation(); moveDiagonal('SE'); }} disabled={!canMove()}>↘ SE</button>
          </>
        )}
        {currentRobot.energyLimit && energy === 0 && (
          <button onClick={(e) => { e.stopPropagation(); rechargeRobot(); }} className={styles.rechargeButton}>
            🔋 Recharge
          </button>
        )}
      </div>
      <div className={styles.commandQueue}>
        <input
          type="text"
          value={commandQueue}
          onChange={(e) => setCommandQueue(e.target.value)}
          placeholder={`Enter commands (e.g., MOVE, LEFT, MOVE, RIGHT${currentRobot.canMoveDiagonally ? ', NW, SE' : ''}${currentRobot.energyLimit ? ', RECHARGE' : ''})`}
          className={styles.commandInput}
          onClick={(e) => e.stopPropagation()}
        />
        <button className={styles.executeButton} onClick={(e) => { e.stopPropagation(); executeCommands(); }}>Execute Commands</button>
      </div>
      <div className={styles.status}>
        Position: ({position.x}, {position.y}) | Direction: {DIRECTIONS[direction]}
        {currentRobot.energyLimit && (
          <span className={styles.energy}> | Energy: {energy}/{currentRobot.energyLimit}</span>
        )}
        {goalCollected && <span className={styles.success}> | Goal collected! 🎉</span>}
      </div>
      <div className={styles.keyboardHint}>
        Click here and use Arrow Keys or WASD to control the robot
        {currentRobot.canMoveDiagonally && <span><br/>Q/E for diagonal up, Z/X/C for diagonal down</span>}
        {currentRobot.energyLimit && energy === 0 && <span><br/>Press R to recharge</span>}
      </div>
    </div>
  );
}

