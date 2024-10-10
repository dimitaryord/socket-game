const redis = require('../redis/config')

const extractPlayersInputs = async () => {
    const players = await redis.hgetall('players-inputs')

    const obj = {}
    Object.entries(players).map(([key, value]) => obj[key] = JSON.parse(value))
    return obj
}

const extractPlayers = async () => {
    const players = await redis.hgetall('players')

    const obj = {}
    Object.entries(players).map(([key, value]) => obj[key] = JSON.parse(value))
    return obj
}

module.exports = {
    extractPlayers,
    extractPlayersInputs,
}