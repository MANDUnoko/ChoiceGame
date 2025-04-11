import scenes from '../data/scenes.json'
import { useGame, getDynamicText } from '../context/GameContext'

export default function GameScreen() {
  const { state, dispatch } = useGame()
  const currentScene = scenes.find(scene => scene.sceneId === state.currentSceneId)

  if (!currentScene) {
    return (
      <div className="p-4 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-2">오류: 씬을 찾을 수 없습니다</h1>
        <p>sceneId: <code>{state.currentSceneId}</code></p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
        >
          다시 시작
        </button>
      </div>
    )
  }

  const handleChoice = (
    nextSceneId: string,
    effects?: any // 수정: 타입 제한 해제
  ) => {
    dispatch({
      type: 'CHOOSE_OPTION',
      payload: { nextSceneId, effects },
    })
  }

  return (
    <div className="max-w-md w-full mx-auto p-4">
      {/* 텍스트 출력 */}
      <p className="text-lg mb-6 text-gray-800 dark:text-gray-200 leading-relaxed">
        {getDynamicText(state.currentSceneId, currentScene.text, state.condition)}
      </p>

      {/* 선택지 출력 */}
      {currentScene.choices.length > 0 && (
        <div className="space-y-3">
          {currentScene.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice.nextScene, choice.effects)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

