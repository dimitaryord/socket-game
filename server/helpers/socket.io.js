const redis = require('../redis/config')

let currentPosition = 0

const setupPosition = async (socket) => {
    let position = {x: socket.window.width - 10, y: socket.window.height - 10}
    console.log(position)

    if(currentPosition === 0){
        position = {x: 10, y: 10}
        currentPosition++
    }
    else if(currentPosition === 1) currentPosition = 0

    await redis.hset('players', socket.id, JSON.stringify({...socket.user, position}))

}

const setupInputs = async (socket) => {
    const inputs = { 'w': false,'s': false,'a': false,'d': false, }
    await redis.hset('players-inputs', socket.id, JSON.stringify(inputs))
}

const sendDataToClients = async (io) => {
    const players = await redis.hgetall('players')

    const positions = {}
    Object.entries(players).map(([key, value]) => positions[key] = JSON.parse(value).position)

    io.emit('new-player', positions)
}

const setupPlayer = async (io, socket) => {
    await setupPosition(socket)
    await setupInputs(socket)

    await sendDataToClients(io)
}

const deletePlayer = async (socket) => {
    await redis.hdel('players', socket.id)
    await redis.hdel('players-inputs', socket.id)
}

module.exports = {
    setupPlayer,
    deletePlayer
}