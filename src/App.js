import './App.css';
import { useState } from 'react';

function Square({ imageSrc, onSquareClick}) {
  return (
    <img className="square" src={imageSrc} onClick={onSquareClick} alt="img" />
  );
}

function Board({ squares, size, onPlay }) {
  function handleClick(i) {
    let movable = false;
    let direction = 0;
    //1:UP 2:R 3:D 4:L
    if (i < size*size-size) {
      if (squares[i+size] == 0) {
        movable = true;
        direction = 3;
      }
    }
    if (i >= size) {
      if (squares[i-size] == 0) {
        movable = true;
        direction = 1;
      }
    }
    if (i % size != 0) {
      if (squares[i-1] == 0) {
        movable = true;
        direction = 4;
      }
    }
    if (i % size != size-1) {
      if (squares[i+1] == 0) {
        movable = true;
        direction = 2;
      }
    }
    if (!movable) {
      return;
    }
    if (calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    switch (direction) {
      case 1:
        nextSquares[i-size] = nextSquares[i];
        nextSquares[i] = 0;
        break;
      case 2:
        nextSquares[i+1] = nextSquares[i];
        nextSquares[i] = 0;
        break;
      case 3:
        nextSquares[i+size] = nextSquares[i];
        nextSquares[i] = 0;
          break;
      case 4:
        nextSquares[i-1] = nextSquares[i];
        nextSquares[i] = 0;
          break;
      default:
        break;
    }
    if (calculateWinner(nextSquares)) {
      nextSquares[size*size-1] = size*size;
    }
    onPlay(nextSquares);
  }

  return (
    <>
      <Square imageSrc={"images/numbers/"+squares[0]+".png"} onSquareClick={() => handleClick(0)} />
      <Square imageSrc={"images/numbers/"+squares[1]+".png"} onSquareClick={() => handleClick(1)} />
      <Square imageSrc={"images/numbers/"+squares[2]+".png"} onSquareClick={() => handleClick(2)} />
      <br></br>
      <Square imageSrc={"images/numbers/"+squares[3]+".png"} onSquareClick={() => handleClick(3)} />
      <Square imageSrc={"images/numbers/"+squares[4]+".png"} onSquareClick={() => handleClick(4)} />
      <Square imageSrc={"images/numbers/"+squares[5]+".png"} onSquareClick={() => handleClick(5)} />
      <br></br>
      <Square imageSrc={"images/numbers/"+squares[6]+".png"} onSquareClick={() => handleClick(6)} />
      <Square imageSrc={"images/numbers/"+squares[7]+".png"} onSquareClick={() => handleClick(7)} />
      <Square imageSrc={"images/numbers/"+squares[8]+".png"} onSquareClick={() => handleClick(8)} />
    </>
  );
}

export default function Game() {
  const size = 3;
  const boardData = Array(size*size).fill(null);
  for (let i = 0; i < size*size; i++) {
    boardData[i] = i+1;
  }
  boardData[size*size-1] = 0;
  const [squares, setSquares] = useState(shuffle(boardData, size));

  function handlePlay(nextSquares) {
    setSquares(nextSquares);
  }

  function retry() {
    setSquares(boardData, size);
  }
  console.log(squares);
  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board  squares={squares} size={size} onPlay={handlePlay}/>
        </div>
      </div>
      <div className="game">
        <div className="game-info">
          <button className="retry" onClick={() => retry()}><img src="images/retry.png" alt="retry"/></button>
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  for (let i = 0; i < squares.length-1; i++) {
    if (squares[i] != i+1) {
      return null;
    }
  }
  return 1;
}

function shuffle(squares, size) {
  var inversionCount = 0;
  for (let i = squares.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    if (i != j) {
      [squares[i], squares[j]] = [squares[j], squares[i]];
      inversionCount++;
    }
    
  }
  for (let i = 0; i < squares.length-1; i++) {
    if (squares[i] == 0) {
      squares[i] = squares[size*size-1];
      squares[size*size-1] = 0;
      inversionCount++;
    }
  }
  if (inversionCount % 2 != 0) {
    squares = shuffle(squares, size);
  }
  
  return squares;
}
