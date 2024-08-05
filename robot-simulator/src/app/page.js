'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Header from '../components/header';
import About from '../components/about';

const GRID_SIZE = 5;
const DIRECTIONS = ['North', 'East', 'South', 'West'];

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(0);

  const moveForward = () => {
    setPosition(prev => {
      switch (DIRECTIONS[direction]) {
        case 'North': return { ...prev, y: Math.max(0, prev.y - 1) };
        case 'East': return { ...prev, x: Math.min(GRID_SIZE - 1, prev.x + 1) };
        case 'South': return { ...prev, y: Math.min(GRID_SIZE - 1, prev.y + 1) };
        case 'West': return { ...prev, x: Math.max(0, prev.x - 1) };
        default: return prev;
      }
    });
  };

  const rotate = (clockwise) => {
    setDirection(prev => (prev + (clockwise ? 1 : 3)) % 4);
  };

  return (
    <div className={styles.container}>
  
      <h1>Robot Control Simulator</h1>
      <div className={styles.grid}>
        {[...Array(GRID_SIZE)].map((_, y) => (
          [...Array(GRID_SIZE)].map((_, x) => (
            <div key={`${x}-${y}`} className={styles.cell}>
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
      <div className={styles.status}>
        Position: ({position.x}, {position.y}) | Direction: {DIRECTIONS[direction]}
      </div>

    </div>
  );
}

