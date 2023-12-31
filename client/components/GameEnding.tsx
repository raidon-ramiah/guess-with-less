import { useState, FormEvent } from 'react'
import * as models from '../../models/prompts'
import * as api from '../apis/prompts'
import Leaderboard from './Leaderboard'

export function GameEnding({
  gameState,
  setGameState,
  initialGameState,
}: models.GameStateProps) {
  const [username, setUsername] = useState('????')
  const correct = gameState.guessInfo.filter(
    (guess) => guess.wasCorrect === true,
  )
  const correctLength = correct.length

  const totalGuesses = gameState.guessInfo.length

  const percent = Math.floor((correctLength * 100) / totalGuesses)


  function handleReset() {
    setGameState(initialGameState as models.GameState)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // e.preventDefault()
    api.addToLeaderboard({
      username,
      correct: correctLength,
      totalGuesses,
      mode: gameState.mode,
      gameId: gameState.gameId || undefined,
    })
    setGameState({ ...gameState })
  }

  return (
    <>
      {/* <ul>
        {gameState.guessInfo.map((guess, i) => (
          <li key={i}>
            You {guess.wasCorrect || 'in'}correctly guessed {guess.guess} on
            stage {guess.stage} of image {guess.round}
          </li>
        ))}
      </ul> */}
      <p>
        You guessed {gameState.guessInfo.length} times, to get {correct.length}{' '}
        correct guesses.
        <br /> So you were correct for an average of 1 in{' '}
        {(gameState.guessInfo.length / correct.length).toLocaleString()}{' '}
        guesses.<br></br>
        You got {percent}{'%'} Right

      </p>
      <button onClick={handleReset} className="cybr-btn">
        Reset
        <span aria-hidden>_</span>
        <span aria-hidden className="cybr-btn__glitch">
          _\-?-_*
        </span>
        <span aria-hidden className="cybr-btn__tag">
          #{+1}
          {+4}
        </span>
      </button>

      <form onSubmit={handleSubmit} id="gameEnding">
        <p style={{ maxWidth: '300px' }}>Save this game to the leaderboard!</p>
        <input
          className="textInput"
          type="text"
          maxLength={4}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="cybr-btn">
          Save
          <span aria-hidden>_</span>
          <span aria-hidden className="cybr-btn__glitch">
            _\-?-_*
          </span>
          <span aria-hidden className="cybr-btn__tag">
            #{+1}
            {+4}
          </span>
        </button>
      </form>
      <Leaderboard gameMode={gameState.mode} gameId={gameState?.gameId} />
    </>
  )
}
