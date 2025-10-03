const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

// 追加: ルームごとの準備状態
const rooms = new Map() // roomId -> Set<socketId>

io.on('connection', (socket) => {
  console.log('🟢 Connected:', socket.id)
  let joinedRoomId = null

  socket.on('join', (roomId) => {
    joinedRoomId = roomId
    socket.join(roomId)
    console.log(`➡️ ${socket.id} joined room: ${roomId}`)

    if (!rooms.has(roomId)) rooms.set(roomId, new Set())
    io.to(roomId).emit('message', `${socket.id} がルームに参加しました`)
  })

  // 追加: 数字選択完了
  socket.on('playerReady', ({ roomId, digits }) => {
    console.log(`[playerReady] from=${socket.id} room=${roomId} digits=${digits}`)

    // 相手へ「準備完了」を通知
    socket.to(roomId).emit('peerReady')

    // 準備記録
    const readySet = rooms.get(roomId) ?? new Set()
    readySet.add(socket.id)
    rooms.set(roomId, readySet)

    // 両者準備完了
    if (readySet.size >= 2) {
      io.to(roomId).emit('bothReady')
    }
  })

  socket.on('disconnect', () => {
    if (joinedRoomId && rooms.has(joinedRoomId)) {
      rooms.get(joinedRoomId).delete(socket.id)
    }
    console.log('🔴 Disconnected:', socket.id)
  })
})

const PORT = 3001
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})