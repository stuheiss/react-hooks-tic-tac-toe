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

// try refactor to useReducer
// try add running totals

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

function Board(props) {
  const [history, setHistory] = props.state.history
  const [stepNumber, setStepNumber] = props.state.stepNumber

  const current = history[stepNumber]
  const squares = current.squares.slice()

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />
  }

  function handleClick(i) {
    const newHistory = history.slice(0, stepNumber + 1)
    const newCurrent = newHistory[newHistory.length - 1]
    const newSquares = newCurrent.squares.slice()
    const player = getPlayer(newSquares)

    if (newSquares[i] || calculateWinner(newSquares)) {
      return null
    }

    newSquares[i] = player
    setHistory(newHistory.concat([{ squares: newSquares }]))
    setStepNumber(stepNumber + 1)
  }

  return (
    <div>
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
    history: useState([{ squares: new Array(9).fill(null) }]),
    stepNumber: useState(0)
  }

  const history = state.history[0]
  const stepNumber = state.stepNumber[0]
  const current = history[stepNumber]
  const squares = current.squares
  const player = getPlayer(squares)
  const winner = calculateWinner(squares)

  const status = winner
    ? 'Winner:' + winner
    : movesAvailable(squares) < 1
    ? 'Tie game'
    : 'Next player:' + player

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  function jumpTo(step) {
    const setStepNumber = state.stepNumber[1]
    setStepNumber(step)
  }

  function movesAvailable(squares) {
    return squares.reduce((acc, cur) => (cur === null ? acc + 1 : acc), 0)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board state={state} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function getPlayer(squares) {
  const movesMade = squares.reduce(
    (acc, cur) => (cur !== null ? acc + 1 : acc),
    0
  )
  return movesMade % 2 === 0 ? 'X' : 'O'
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
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))
