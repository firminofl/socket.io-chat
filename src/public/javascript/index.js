const socket = io('http://localhost:3000')

socket.on('previousMessage', function(messages) {
    for (message of messages) {
        renderMessage(message)
    }
})

socket.on('receivedMessage', function(message) {
    renderMessage(message)
})

$('#chat').submit(function(event) {
    event.preventDefault()

    const author = $('input[name=username]').val()
    const message = $('input[name=message]').val()

    if (author.length && message.length) {
        const messageObj = {
            author,
            message
        }

        renderMessage(messageObj)

        socket.emit('sendMessage', messageObj)
    }
})

function renderMessage(message) {
    $('.messages').append(`<div class="message"><strong> ${message.author} </strong>: ${message.message} </div>`)
}