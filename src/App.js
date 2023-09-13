import React, { useState } from 'react';
import './App.css';

const win = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

const checkForWinner = (gameState) => {
  if (gameState.length < 5) return 'No Winner Yet';
  let p0 = gameState.filter((item) => item.player === 0).map((item) => item.id);
  let px = gameState.filter((item) => item.player === 1).map((item) => item.id);

  const isSuperset = (set, subset) => {
    for (let elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  };

  const win0 = win.filter((item) => isSuperset(new Set(p0), new Set(item)));
  const winX = win.filter((item) => isSuperset(new Set(px), new Set(item)));

  if (win0.length > 0) return 'Player O ';
  else if (winX.length > 0) return 'Player X ';
  return 'No Winner Yet';
};

const Board = () => {
  const [player, setPlayer] = useState(1);
  const [gameState, setGameState] = useState([]);
  const status = `Winner is ${checkForWinner(gameState)}`;
  const playerTurn = `Next Player: ${player === 0 ? 'Player O' : 'Player X'}`;

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2);
    return player;
  };

  const renderSquare = (i) => {
    return <Square takeTurn={takeTurn} id={i} />;
  };

  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1 id="turn">{playerTurn}</h1>
        <h1>{status}</h1>
      </div>
    </div>
  );
};

const Square = ({ takeTurn, id }) => {
  const mark = ['O', 'X', '+'];
  const [filled, setFilled] = useState(false);
  const [tik, setTik] = useState(2);

  let squareClass = "square";
  if (tik === 0) {
    squareClass += " o-square";
  } else if (tik === 1) {
    squareClass += " x-square";
  } else {
    squareClass += " plus-square";
  }

  return (
    <button
      className={squareClass}
      onClick={() => {
        setTik(takeTurn(id));
        setFilled(true);
        console.log(`Square: ${id} filled by player: ${tik}`);
      }}
    >
      <h1>{mark[tik]}</h1>
    </button>
  );  
};

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};

export default Game;
