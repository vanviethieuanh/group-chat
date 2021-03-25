const { v4: uuidv4 } = require('uuid')
const _ = require('lodash')
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const app = express()
const rooms = []

app.use(cors())

const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: '*',
})

const GetRoom = function () {
    return _.flatMap(rooms, (r) => {
        return {
            id: r.id,
            icon: r.passcode ? 'mdi-lock' : 'mdi-lock-open',
        }
    })
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    let currentRoomId = undefined
    let userNickname = undefined
    console.log(`${socket.id} connected`)

    const JoinRoomWithNickname = (roomId, nickname) => {
        socket.join(roomId)
        userNickname = nickname
    }

    socket.on('allRoom', () => {
        socket.emit('allRoom', GetRoom())
    })

    socket.on('create-room', (passcode, nickname) => {
        if (socket.rooms.size == 2) {
            socket.emit('create-room', currentRoomId)
            return
        }
        if (!nickname) return
        userNickname = nickname

        let room = {}

        room.id = uuidv4()
        currentRoomId = room.id

        if (/\d{6}/g.test(passcode)) room.passcode = passcode

        rooms.push(room)

        socket.join(room.id)
        socket.emit('create-room', room.id)
        io.emit('allRoom', GetRoom())
    })

    socket.on('join-room', (roomId, passcode, nickname) => {
        room = rooms.find((e) => e.id == roomId)

        if (!room) {
            socket.emit('Room not found')
            return
        }
        if (!room.passcode) {
            JoinRoomWithNickname(room.id, nickname)
            return
        }
        if (room.passcode == passcode) {
            JoinRoomWithNickname(room.id, nickname)
            return
        }

        socket.emit('Wrong passcode!')
    })

    socket.on('message', (message) => {
        if (socket.rooms.size <= 1) return
        socket.broadcast
            .to(currentRoomId)
            .emit('message', { user: userNickname, message: message })
    })

    socket.on('disconnect', () => {
        io.to(currentRoomId).emit(`${userNickname} left the room`)
    })
})

http.listen(PORT, () => {
    console.log(`🚀 listening on http://localhost:${PORT}/`)
})
