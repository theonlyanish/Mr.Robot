# Robot Control Simulator

A simple web-based robot simulation game that demonstrates concepts of robot movement, control, and navigation in a 2D grid environment. This interactive application showcases advanced frontend development skills using Next.js and React.


## Project Overview

The Robot Simulator is an interactive web application that combines entertainment with educational value, demonstrating:
- Advanced state management in React
- Interactive grid-based game mechanics
- Multiple robot types with unique behaviors
- Command programming and execution
- Responsive design with dark/light mode support
- Real-time user interaction through keyboard and mouse controls

## Features

### 🤖 Four Unique Robot Types

1. **Standard Robot** 
   - Basic movement: 1 space per move
   - Four-directional movement (North, East, South, West)
   - Perfect for learning basic navigation

2. **Fast Robot** 
   - Enhanced movement: 2 spaces per move
   - Covers distance quickly but requires careful planning
   - Ideal for open grid navigation

3. **Diagonal Robot** 
   - Advanced movement: Can move diagonally
   - Eight-directional movement capability
   - Offers creative pathfinding solutions

4. **Energy Robot** 
   - Resource management: Limited to 10 moves
   - Recharge capability when energy depletes
   - Adds strategic planning element

### 🎮 Multiple Control Methods

- **Button Controls**: Click-to-move interface
- **Keyboard Controls**: WASD and arrow key navigation
- **Command Programming**: Execute sequences of commands like `MOVE, RIGHT, MOVE, LEFT`

### 🎯 Game Mechanics

- **5×5 Interactive Grid**: Navigate through dynamic environments
- **Obstacle Avoidance**: Strategic pathfinding around barriers (🚧)
- **Goal Collection**: Collect stars (⭐) to trigger grid reshuffling
- **Dynamic Layouts**: New obstacles and goals appear after each collection
- **Real-time Feedback**: Live position and status tracking

### 🎨 User Experience Features

- **Dark/Light Mode Toggle**: Seamless theme switching
- **Responsive Design**: Optimized for various screen sizes
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Visual Feedback**: Animated robot movement and goal collection
- **Status Display**: Real-time position, direction, and energy tracking

## Technical Stack

- **Framework**: Next.js 14.2.5
- **Runtime**: React 18
- **Language**: JavaScript (ES6+)
- **Styling**: CSS Modules with custom properties
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Development**: ESLint for code quality

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/theonlyanish/Mr.Robot.git
   ```

2. **Navigate to the robot simulator**
   ```bash
   cd robot-simulator
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to start playing!

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint code analysis

## How to Play

1. **Choose Your Robot**: Select from four unique robot types in the dropdown menu
2. **Control Your Robot**: Use buttons, keyboard, or command programming
3. **Navigate the Grid**: Move around the 5×5 grid avoiding obstacles
4. **Collect Stars**: Reach the star (⭐) to trigger a new level layout
5. **Master Strategy**: Each robot type requires different approaches

### Keyboard Controls

- `W` or `↑` - Move forward
- `A` or `←` - Turn left  
- `D` or `→` - Turn right
- `S` or `↓` - Turn around
- `Q/E` - Diagonal up (Diagonal Robot only)
- `Z/X/C` - Diagonal down (Diagonal Robot only)
- `R` - Recharge (Energy Robot when depleted)

### Command Programming

Execute complex maneuvers by typing command sequences:
```
MOVE, RIGHT, MOVE, LEFT, MOVE
NW, SE, NE, SW (diagonal movements)
MOVE, MOVE, RECHARGE, MOVE (energy management)
```

## Architecture Highlights

### State Management
- **Position Tracking**: Real-time robot position and direction
- **Energy System**: Resource management for energy-limited robots
- **Dynamic Obstacles**: Procedural generation of obstacles and goals
- **Command Queue**: Sequential command execution system

### Component Structure
- **Modular Design**: Separated concerns with dedicated components
- **Context API**: Dark mode state management across components
- **Custom Hooks**: Reusable logic for robot control and game state

### Performance Optimizations
- **Event Delegation**: Efficient keyboard event handling
- **State Batching**: Optimized React state updates
- **CSS Modules**: Scoped styling for component isolation

## Project Structure

```
── robot-simulator/
│   ├── src/
│   │   ├── app/
│   │   │   ├── about/          # About page
│   │   │   ├── rules/          # Game rules page
│   │   │   ├── globals.css     # Global styles
│   │   │   ├── layout.js       # App layout
│   │   │   └── page.js         # Main game page
│   │   └── components/
│   │       ├── about.js        # About component
│   │       ├── DarkModeContext.js # Theme context
│   │       ├── GameRules.js    # Rules component
│   │       └── header.js       # Navigation header
│   ├── public/                 # Static assets
│   ├── package.json           # Dependencies
│   └── README.md              # Project documentation
└── README.md                  # This file
```

## Contributing

This project demonstrates modern React development patterns and is open for educational exploration. Feel free to:

- Explore the codebase to understand React patterns
- Suggest improvements or new robot types
- Report bugs or usability issues
- Contribute to documentation

## License

This project is created for demonstration and educational purposes.

---
