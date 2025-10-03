'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function HomePage() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [roomId, setRoomId] = useState<string | null>(null)

  const handleOpenModal = () => {
    const newRoomId = uuidv4().slice(0, 6)
    setRoomId(newRoomId)
    setIsModalOpen(true)
  }

  const handleCopyToClipboard = async () => {
    if (!roomId) return
    const url = `${window.location.origin}/room/${roomId}`
    await navigator.clipboard.writeText(url)
    alert('URLをコピーしました！')
  }

  const handleStartGame = () => {
    if (roomId) {
      router.push(`/room/${roomId}`)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Guess4</h1>
      <button
        onClick={handleOpenModal}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        部屋を作成する
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
              aria-label="モーダルを閉じる"
            >
              ×
            </button>
            <h2 className="text-black font-bold mb-4">部屋が作成されました！</h2>
            <p className="mb-4 text-gray-700 break-all">
              {`${window.location.origin}/room/${roomId}`}
            </p>
            <button
              onClick={handleCopyToClipboard}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded mr-2"
            >
              URLをコピー
            </button>
            <button
              onClick={handleStartGame}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
            >
              対戦開始
            </button>
          </div>
        </div>
      )}
    </main>
  )
}