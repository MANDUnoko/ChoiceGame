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
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <div className="max-w-md w-full p-4 flex flex-col items-center text-center">
        
        {/* 이미지 출력 */}
        {currentScene.image && (
          <img
            src={`/${currentScene.image}`}
            alt="scene illustration"
            className="mb-4"
            style={{
              width: currentScene.imageSize?.width
                ? `${currentScene.imageSize.width}px`
                : 'auto',
              height: currentScene.imageSize?.height
                ? `${currentScene.imageSize.height}px`
                : 'auto',
            }}
          />
        )}
  
        {/* 텍스트 출력 */}
        <p className="text-lg mb-6 text-gray-800 leading-relaxed">
          {getDynamicText(state.currentSceneId, currentScene.text, state.condition)}
        </p>
  
        {/* 선택지 출력 */}
        <div className="flex flex-col items-center space-y-4 mt-6">
          {currentScene.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice.nextScene, choice.effects)}
              className="w-full py-2 bg-gray-100 text-black rounded hover:bg-gray-200 transition"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}  
