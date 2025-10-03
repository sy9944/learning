'use client'

import { useEffect, useState, use } from 'react'
import { useSocket } from '@/hooks/useSocket'
import NumberSelector from './NumberSelector'

function RoomPageContent({ roomId }: { roomId: string }) {
  const socket = useSocket(roomId)

  const [message, setMessage] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [peerReady, setPeerReady] = useState(false)

  useEffect(() => {
    if (!socket) return

    const onMessage = (msg: string) => setMessage(msg)
    const onPeerReady = () => setPeerReady(true)
    const onBothReady = () => setPeerReady(true)

    socket.on('message', onMessage)
    socket.on('peerReady', onPeerReady)
    socket.on('bothReady', onBothReady)

    return () => {
      socket.off('message', onMessage)
      socket.off('peerReady', onPeerReady)
      socket.off('bothReady', onBothReady)
    }
  }, [socket])

  const bothReady = isReady && peerReady

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Room: {roomId}</h1>
      <p className="text-white-700 mb-4">このページは {roomId} のルームです。</p>

      <div className="mb-6">
        <NumberSelector
          disabled={isReady || bothReady}
          onConfirm={(digits) => {
            if (!socket) return
            setIsReady(true)
            socket.emit('playerReady', { roomId, digits })
          }}
        />
      </div>

      <p className="text-white-500">
        {bothReady
          ? '✅ 両者選択完了'
          : isReady
          ? '⏳ 相手の準備を待っています…'
          : peerReady
          ? '👀 相手は準備完了。あなたの選択を待っています…'
          : message
          ? `📡 メッセージ: ${message}`
          : 'サーバーからのメッセージを待っています...'}
      </p>
    </main>
  )
}

export default function RoomPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params)
  return <RoomPageContent roomId={roomId} />
}