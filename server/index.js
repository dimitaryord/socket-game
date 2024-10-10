const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const path = require('path')
const cors = require('cors')
require('dotenv').config()

const redis = require('./redis/config')
const app = express()

const server = http.createServer(app)
const socketConfig = require('./socket.io/index')
const io = new Server(server,{
  cors:{
    origin:'*'
  }
})

//app.use
app.use(express.json())
app.use(cors({}))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

const userRoute = require('./routes/user')
app.use('/user', userRoute)

const gameRoute = require('./routes/game')
app.use('/game', gameRoute)

//redis and socket.io
redis.on('connect', () => {
  console.log(`redis connected on port: ${process.env.REDIS_PORT}`)
})
socketConfig(io)

//start server
server.listen(process.env.EXPRESS_PORT,() => {
    console.log('server started http://localhost:' + process.env.EXPRESS_PORT)
})