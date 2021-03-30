const { v4: uuidv4 } = require('uuid')
const _ = require('lodash')
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const app = express()
const rooms = {}

app.use(express.static('dist'))
app.use(cors())

console.log('dist')

const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: '*',
})

const GetRoom = function () {
    return Object.values(rooms).map((r) => {
        return {
            id: r.id,
            isLock: r.passcode ? true : false,
        }
    })
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/templates/index.html')
})

io.on('connection', (socket) => {
    let currentRoom = undefined
    let userNickname = undefined

    const JoinRoomWithNickname = (room, nickname) => {
        room.users.add(nickname)

        socket.join(room.id)
        io.in(room.id).emit('join-room-success', {
            nickname: nickname,
        })

        currentRoom = room
        userNickname = nickname
    }

    socket.on('allRoom', () => {
        socket.emit('allRoom', GetRoom())
    })

    socket.on('create-room', (passcode, nickname) => {
        if (socket.rooms.size == 2) {
            socket.emit('create-room', currentRoom.id)
            return
        }
        if (!nickname) return

        let room = {}

        room.id = uuidv4()
        room.passcode = /\d{4}/g.test(passcode) ? passcode : null
        room.users = new Set()
        room.users.add(nickname)

        userNickname = nickname
        currentRoom = room

        rooms[room.id] = room

        socket.join(room.id)
        socket.emit('create-room', room.id)
        io.emit('allRoom', GetRoom())
    })

    socket.on('join-room', (roomId, passcode, nickname) => {
        room = rooms[roomId]

        if (!room) return
        if (room.users.has(nickname)) {
            socket.emit('join-room-error', 'Nickname has been used!')
            return
        }
        if (!room.passcode) {
            JoinRoomWithNickname(room, nickname)
            return
        }
        if (room.passcode != passcode) {
            socket.emit('join-room-error', 'Wrong passcode!')
            return
        }

        JoinRoomWithNickname(room, nickname)
    })

    socket.on('leave-room', () => {
        if (currentRoom) {
            socket.leave(currentRoom.id)

            currentRoom.users.delete(userNickname)
            if (currentRoom.users.size == 0) {
                delete rooms[currentRoom.id]
                io.emit('allRoom', GetRoom())
            }

            io.to(currentRoom.id).emit('leaf-room', userNickname)
        }
    })

    socket.on('is-lock', (id) => {
        const found = rooms[id]

        if (found) {
            socket.emit('is-lock', found.passcode ? true : false)
            return
        }
        socket.emit('is-lock', null)
    })

    socket.on('message', (message) => {
        if (socket.rooms.size <= 1) return
        socket.broadcast
            .to(currentRoom.id)
            .emit('message', { user: userNickname, message: message })
    })

    socket.on('disconnect', () => {
        if (currentRoom) {
            currentRoom.users.delete(userNickname)
            if (currentRoom.users.size == 0) {
                delete rooms[currentRoom.id]
                io.emit('allRoom', GetRoom())
            }

            io.to(currentRoom.id).emit('leaf-room', userNickname)
        }
    })
})

http.listen(PORT, () => {
    console.log(`🚀 listening on http://localhost:${PORT}/`)
})
