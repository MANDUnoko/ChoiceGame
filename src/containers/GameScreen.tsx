import scenes from '../data/scenes.json'
import { useGame } from '../context/GameContext'
import StatusBar from '../components/StatusBar'

export default function GameScreen() {
  const { state, dispatch } = useGame()

  const currentScene = scenes.find(scene => scene.sceneId === state.currentSceneId)

  // currentScene이 없을 때 에러 처리
  if (!currentScene) {
    return (
      <div className="p-4 max-w-xl mx-auto text-center">
        <StatusBar />
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

  // 건강 0 이하 → 엔딩 처리
  if (state.health <= 0) {
    return (
      <div className="p-4 max-w-xl mx-auto text-center">
        <StatusBar />
        <h1 className="text-3xl font-bold text-red-600 mb-4">게임 오버</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-200">
          건강이 모두 소진되었습니다. 안타까운 최후를 맞이했습니다.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
        >
          다시 시작하기
        </button>
      </div>
    )
  }

  // 정상 씬 렌더링
  const handleChoice = (
    nextSceneId: string,
    effects: { health?: number; moodStatus?: string }
  ) => {
    dispatch({
      type: 'CHOOSE_OPTION',
      payload: { nextSceneId, effects },
    })
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <StatusBar />
      <p className="text-lg mb-4">{currentScene.text}</p>
      <div className="space-y-2">
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
    </div>
  )
}



