import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export const useSocket = (roomId: string): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socketIo = io('http://localhost:3001')

    socketIo.emit('join', roomId)
    setSocket(socketIo)

    return () => {
      socketIo.disconnect()
    }
  }, [roomId])

  return socket
}