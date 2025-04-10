import React, { createContext, useReducer, useContext, ReactNode } from 'react'

// 날씨 랜덤 함수
const randomWeather = () => {
    const weathers = ['맑음', '비', '흐림', '눈']
    return weathers[Math.floor(Math.random() * weathers.length)]
  }  

// 기분 상태 계산 함수
const calculateMoodStatus = (health: number, weather: string): string => {
    if (health <= 20) return '우울'
    if (weather === '맑음' && health >= 70) return '행복'
    if (weather === '비' && health <= 50) return '불안'
    return '평범'
  }

type GameState = {
  currentSceneId: string
  health: number
  moodStatus: string
  weather: string
  sceneCount: number
}

type GameAction = {
    type: 'CHOOSE_OPTION'
    payload: {
      nextSceneId: string
      effects: {
        health?: number
        moodStatus?: string // 기분도 직접 효과로 줌
      }
    }
  }
  

const initialHealth = 50
const initialWeather = randomWeather()

const initialState: GameState = {
    currentSceneId: 'intro',
    health: initialHealth,
    weather: initialWeather,
    sceneCount: 0,
    moodStatus: '평범',
  }
  

function reducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
      case 'CHOOSE_OPTION': {
        const newHealth = Math.max(
          0,
          state.health + (action.payload.effects.health ?? 0)
        )
  
        const newSceneCount = state.sceneCount + 1
        const shouldChangeWeather = newSceneCount % 5 === 0
        const newWeather = shouldChangeWeather ? randomWeather() : state.weather
  
        const newMood = action.payload.effects.moodStatus ?? state.moodStatus
  
        return {
          ...state,
          currentSceneId: action.payload.nextSceneId,
          health: newHealth,
          weather: newWeather,
          moodStatus: newMood,
          sceneCount: newSceneCount,
        }
      }
      default:
        return state
    }
  }

  const GameContext = createContext<{
  state: GameState
  dispatch: React.Dispatch<GameAction>
} | null>(null)

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) throw new Error('GameContext must be used within GameProvider')
  return context
}

  
