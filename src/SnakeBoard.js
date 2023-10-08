import React, { useState, useEffect, useRef } from "react";


const SnakeBoard = () => {
  const width = 20;
  const height = 20;

  let initialRows = [];
  for (let i = 0; i < height; i++) {
    initialRows.push([]);
    for (let k = 0; k < width; k++) {
      initialRows[i].push("blank");
    }
  }

  const randomPosition = () => {
    const position = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
    return position;
  };

  const [rows, setRows] = useState(initialRows);
  const [snake, setSnake] = useState([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ]);
  const [direction, setDirection] = useState("right");
  const [food, setFood] = useState(randomPosition);
  const [gameOver, setGameOver] = useState(false);
  const [startGame,setStartGame]=useState(false)
 
//   const [notdirection,setNotDirection]=useState("left");
// console.log(direction);

const changeDirectionWithKeys = (e) => {
    var { keyCode } = e;
    switch (keyCode) {
      case 37: // Left
        if (direction === "right") {
          
        }else {
            setDirection("left")
        }
        break
      case 38: // Up
        if (direction !== "top") {
          setDirection("top");
        }
        break;
      case 39: // Right
        if (direction === "left") {
            break;
        }else {
            setDirection('right')
        }
        break;
      case 40: // Down
        if (direction !== "bottom") {
          setDirection("bottom");
        }
        break;
      default:
        break;
    }
  };
  

  document.addEventListener("keydown", changeDirectionWithKeys, false);

  const displaySnake = () => {
    // Create a new copy of the initialRows array
    const newRows = JSON.parse(JSON.stringify(initialRows));
    snake.forEach((cell) => {
      newRows[cell.x][cell.y] = "snake";
    });
    newRows[food.x][food.y] = "food";
    setRows(newRows);
  };

  const moveSnake = () => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = snake[0];

    // Calculate the next head position based on the current direction
    switch (direction) {
      case "right":
        newSnake.unshift({ x: head.x, y: (head.y + 1) % width });
        break;
      case "left":
        newSnake.unshift({ x: head.x, y: (head.y - 1 + width) % width });
        break;
      case "top":
        newSnake.unshift({ x: (head.x - 1 + height) % height, y: head.y });
        break;
      case "bottom":
        newSnake.unshift({ x: (head.x + 1) % height, y: head.y });
        break;
        default: 
        newSnake.unshift({ x: head.x, y: (head.y + 1) % width });
        break;
    }

    // Check for wall collision
    // if (
    //   newSnake[0].x < 0 ||
    //   newSnake[0].x >= height ||
    //   newSnake[0].y < 0 ||
    //   newSnake[0].y >= width
    // ) {
    //   setGameOver(true);
    //   return;
    // }

    // Check for body collision
    for (let i = 1; i < newSnake.length; i++) {
      if (newSnake[i].x === newSnake[0].x && newSnake[i].y === newSnake[0].y) {
        setGameOver(true);
        return;
      }
    }

    if (head.x === food.x && head.y === food.y) {
      setFood(randomPosition);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    displaySnake();
  };

  useInterval(moveSnake, 1000 / 10);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const displayRows = rows.map((row, rowIndex) => (
    <li key={rowIndex}>
      {row.map((e, colIndex) => {
        switch (e) {
          case "blank":
            return (
              <div key={colIndex} className="img-can">
            
                
              </div>
            );
          case "snake":
           
          
            return (
              <div key={colIndex} className={`img-can snake`}>
           
              
              </div>
            );
          case "food":
            return (
              <div key={colIndex} className="img-can food">
       
              </div>
            );
        }
      })}
    </li>
  ));

  const resetGame = () => {
    // Reset all game state variables to their initial values
    setRows(initialRows);
    setSnake([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ]);
    setDirection("right");
    setFood(randomPosition());
    setGameOver(false);
  };

  const playAgain = () => {
    resetGame();
    setStartGame(true);
  };

  

  return (
    <>
 
   
     {
      startGame ?  <div>
      {gameOver ? (
       <>
         <div className="game-over">Game Over</div> 
        
       </>
        
      ) : (
        <ul className="board-container">{displayRows}</ul>
      )}
    </div> :""
     }

      <div><button onClick={()=>playAgain()} className="btn" >
        
    {gameOver===true && "play Again" }
    {startGame===true && gameOver===false && "Restart" }
    {startGame===false && "Start Game" }
    
        
        
        
        </button></div>
    </>
   
  );
};

export default SnakeBoard;
