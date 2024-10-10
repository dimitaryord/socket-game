const socketMiddleware = require('../middleware/socket.io')
const redis = require('../redis/config')
const helpers = require('../helpers/index')

const SERVER_TICKS = 60
const SPEED = 4

const update = async (io) => {
    const inputs = await helpers.extractPlayersInputs()

    const players = await helpers.extractPlayers()
    const entries = Object.entries(players)

    entries.forEach(async ([playerId, player]) => {
        const input = inputs[playerId]

        if(!input) return

        if(input.w) player.position.y -= SPEED
        if(input.s) player.position.y += SPEED
        if(input.a) player.position.x -= SPEED
        if(input.d) player.position.x += SPEED

        const move = Object.values(input).filter(value => value).length > 0

        if(move){
            await redis.hset('players', playerId, JSON.stringify(player))
            io.emit('player-moved', playerId, player.position)
        } 
    })
}

const socketConfig = (io) => {

    io.use(socketMiddleware)
      
    io.on('connection', async (socket) => {
        console.log('user connected')

        await helpers.setupPlayer(io, socket)

        setInterval(() => update(io), 1000 / SERVER_TICKS)

        socket.on('player-move', async (inputs) => {
            await redis.hset('players-inputs', socket.id, JSON.stringify(inputs))
        })
      
        socket.on('disconnect', async () => {
            await helpers.deletePlayer(socket)
            console.log('user disconnected')
        })
    })
}

module.exports = socketConfig