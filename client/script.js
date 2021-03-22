const socket = io('ws://localhost:8080/');


socket.on('message', message => {
    const el = document.createElement('li')
    el.innerHTML = message
    document.querySelector('#messager').appendChild(el)
})

document.querySelector('#btn-send').addEventListener('click',() => {
    const text = document.querySelector('#chat-box').value
    console.log(text);
    socket.emit('message',text)
})