import React from 'react'

export default function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <div className="max-w-md w-full p-4 flex flex-col items-center text-center">
        <img src="/images/title.png" alt="타이틀" className="w-72 mb-8" />
        <img src="/images/START.png" alt="메인 이미지" className="w-48 mb-8" />
        <img
          src="/images/button.png"
          alt="시작 버튼"
          className="w-40 cursor-pointer hover:scale-105 transition"
          onClick={onStart}
        />
      </div>
    </div>
  )
}



