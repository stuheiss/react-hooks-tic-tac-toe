import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
// import * as serviceWorker from './serviceWorker'

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

function Square({ value, onClick }) {
  // destructure props.number
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

function Board() {
  const [squares, setSquares] = useState(new Array(9).fill(null))
  // try refactor to use bool instead of 'X'
  const [player, setPlayer] = useState('X')
  const [winner, setWinner] = useState(null)
  // try refactor to combine both useState into a custom hook
  // try refactor to useReducer
  // try to implement useHistory for time travel
  // try to implement time travel (see docs, example ttt, final results codepen)

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />
  }

  const status = 'Next player: ' + player
  const winnerMsg = winner ? 'Winner: ' + winner : ''

  function handleClick(i) {
    if (squares[i] || winner) {
      return null
    }
    const newSquares = squares.slice()
    newSquares[i] = player
    setSquares(newSquares)
    setPlayer(player === 'X' ? 'O' : 'X')
    setWinner(calculateWinner(newSquares))
  }

  return (
    <div>
      <div className="status">{winnerMsg}</div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))
