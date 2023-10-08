import React from 'react';
import './App.css';
import SnakeBoard from './SnakeBoard.js';

function App() {
  return (
    <div className="App">
    <div className='head-card'><h2 className='heading'>Classic Snake</h2>
    <p>Use arrow keys to move the snake</p>
    
    </div>
   
      <SnakeBoard/>
    </div>
  );
}

export default App;
