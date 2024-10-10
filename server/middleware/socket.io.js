const jwt = require('jsonwebtoken')


module.exports = async (socket, next) => {
    try{
      const auth = socket.handshake.auth

      const {token, username} = auth.user
      const res = jwt.verify(token, process.env.JWT_SECRET_KEY)
  
      socket.user = {
        name: username,
        id: res.id
      }

      socket.window = auth.canvas
  
      next()
    }
    catch(error){
      throw new Error(error)
    }
}