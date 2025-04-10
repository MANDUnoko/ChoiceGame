import { useGame } from '../context/GameContext'

export default function StatusBar() {
  const { state } = useGame()

  return (
    <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded mb-4">
      <div>건강: <span className="font-bold">{state.health}</span></div>
      <div>기분: <span className="font-bold">{state.moodStatus}</span></div>
      <div>날씨: <span className="font-bold">{state.weather}</span></div>
    </div>
  )
}


// ProgressBar로 대체하거나 색상 조건부 스타일링도 가능
