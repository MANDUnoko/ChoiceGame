import React, { createContext, useReducer, useContext, ReactNode } from 'react'

// 상태 타입 정의
export type ConditionType = 'hyperglycemia' | 'hypoglycemia' | 'cardiac_arrest' | null

interface GameState {
  currentSceneId: string
  condition: ConditionType
}

interface GameAction {
  type: 'CHOOSE_OPTION'
  payload: {
    nextSceneId: string
    effects?: {
      setConditionRandom?: boolean
    }
  }
}

const initialState: GameState = {
  currentSceneId: 'intro',
  condition: null
}

// 노인 상태 랜덤 결정
const randomCondition = (): ConditionType => {
  const conditions: ConditionType[] = ['hyperglycemia', 'hypoglycemia', 'cardiac_arrest']
  return conditions[Math.floor(Math.random() * conditions.length)]
}

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'CHOOSE_OPTION': {
      let nextCondition = state.condition

      if (action.payload.effects?.setConditionRandom) {
        nextCondition = randomCondition()
      }

      let actualNextScene = action.payload.nextSceneId

      // 조건 기반 분기 처리
      if (actualNextScene === 'conditional_sugar') {
        if (nextCondition === 'hypoglycemia') {
          actualNextScene = 'first_aid_3'
        } else {
          actualNextScene = 'death_misstep'
        }
      }

      if (actualNextScene === 'conditional_water') {
        if (nextCondition === 'hyperglycemia') {
          actualNextScene = 'first_aid_3'
        } else {
          actualNextScene = 'death_misstep'
        }
      }

      if (actualNextScene === 'conditional_aed') {
        if (nextCondition === 'cardiac_arrest') {
          actualNextScene = 'first_aid_2'
        } else {
          actualNextScene = 'death_misstep'
        }
      }

      if (actualNextScene === 'conditional_rest') {
        if (nextCondition === 'hyperglycemia') {
          actualNextScene = 'first_aid_2'
        } else {
          actualNextScene = 'death_misstep'
        }
      }

      return {
        currentSceneId: actualNextScene,
        condition: nextCondition
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
  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) throw new Error('GameContext must be used within GameProvider')
  return context
}

// 동적 텍스트 출력 함수 (상태에 따라 묘사 다르게)
export function getDynamicText(sceneId: string, baseText: string, condition: ConditionType): string {
  if (sceneId !== 'assess_status') return baseText

  switch (condition) {
    case 'hyperglycemia':
      return '노인은 숨이 거칠고 얼굴이 벌겋게 상기되어 있습니다. 어디선가 희미하게 단내가 납니다.'
    case 'hypoglycemia':
      return '노인의 몸이 떨리고 창백하며, 식은땀을 흘리고 있습니다. 의식이 희미해 보입니다.'
    case 'cardiac_arrest':
      return '노인은 숨을 쉬지 않고 맥박도 느껴지지 않습니다.'
    default:
      return baseText
  }
}




  
