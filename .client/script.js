const socket = io('ws://localhost:8080/');

let currentRoomId = undefined

socket.on('message', (user, message) => {
    const el = document.createElement('li')
    el.innerHTML = `${user}: ${message}`
    document.querySelector('#messager').appendChild(el)
})

socket.on('create-room', (roomId) =>{
    currentRoomId = roomId
    console.log(`Room created with id: ${roomId}`);
})

document.querySelector('#btn-send').addEventListener('click',() => {
    const text = document.querySelector('#chat-box').value
    socket.emit('message',text)
})

document.querySelector('#btn-create-room').addEventListener('click',() => {
    const passcode = document.querySelector('.create-room .passcode').value
    const nickname = document.querySelector('.create-room .nickname').value
    socket.emit('create-room',passcode, nickname)
})