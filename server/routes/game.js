const router = require('express').Router()
const tokenMiddleware = require('../middleware/token')
const redis = require('../redis/config')

router.use(tokenMiddleware)


router.get('/players', async (req, res) => {
    try{
        const players = await redis.hgetall('players')
        const names = Object.values(players).map(value => JSON.parse(value).name)
        res.status(200).json({players: names})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
})

router.get('/connect', (req, res) => {
    
})

module.exports = router