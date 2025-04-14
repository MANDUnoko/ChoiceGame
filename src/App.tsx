// App.tsx
import { useState } from 'react'
import { useGame } from './context/GameContext'
import GameScreen from './containers/GameScreen'
import StartScreen from './containers/StartScreen'

function App() {
  const { state, dispatch } = useGame()

const handleStart = () => {
  dispatch({
    type: 'CHOOSE_OPTION',
    payload: {
      nextSceneId: 'intro',
      effects: { setConditionRandom: false },
    }
  })
}


  return (
    <>
      {state.currentSceneId === 'start' ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <GameScreen />
      )}
    </>
  )
}

export default App



