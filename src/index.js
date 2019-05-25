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

// try refactor player to use bool instead of 'X'
// try refactor to combine both useState into a custom hook
// try refactor to useReducer
// try to implement useHistory for time travel
// try to implement time travel (see docs, example ttt, final results codepen)

function Square({ value, onClick }) {
  // destructure props.number
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

function Board(props) {
  const [squares, setSquares] = props.state.squares
  const [player, setPlayer] = props.state.player
  const [winner, setWinner] = props.state.winner
  const [movesleft, setMovesleft] = props.state.movesleft

  const status = 'Next player: ' + player
  const winnerMsg = winner ? 'Winner: ' + winner : ''
  const gameoverMsg = movesleft < 1 ? 'Tie game' : ''

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />
  }

  function handleClick(i) {
    if (squares[i] || winner) {
      return null
    }
    const newSquares = squares.slice()
    newSquares[i] = player
    setSquares(newSquares)
    setPlayer(player === 'X' ? 'O' : 'X')
    setWinner(calculateWinner(newSquares))
    setMovesleft(movesLeft(newSquares))
  }

  return (
    <div>
      <div className="status">{gameoverMsg}</div>
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
  const state = {
    squares: useState(new Array(9).fill(null)),
    player: useState('X'),
    winner: useState(null),
    movesleft: useState(9),
}

  return (
    <div className="game">
      <div className="game-board">
        <Board state={state}/>
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

function movesLeft(squares) {
  return squares.reduce((acc, cur) => cur == null ? acc + 1 : acc, 0)
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
