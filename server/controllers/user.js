const redis = require('../redis/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid')

async function Register(req, res) {
    try{
        const { email, username, password } = req.body
      
        const findResult = await redis.hget('users', email)
        if(findResult)
            return res.status(409).json({error: 'User already exists.'})
        
        const id = uuid()
        const hashedPassword = await bcrypt.hash(password, 10)
      
        await redis.hset('users', email, JSON.stringify({
            id,
            username, 
            password: hashedPassword
        }))
      
        const token = jwt.sign({id}, process.env.JWT_SECRET_KEY)
        res.status(200).json({message: 'User registered.', username, token})
    }
    catch(error){
         return res.status(400).json({error: error.message})
    }
}

async function Login(req, res) {
    try{
      const { email, password } = req.body
  
      const result = await redis.hget('users', email)
      if(!result)
        return res.status(401).json({error: 'Email incorrect.'})
  
      const resultObject = JSON.parse(result)
      const {id, username, password: hashedPassword} = resultObject
  
      const passwordMatch = await bcrypt.compare(password, hashedPassword)
      if(!passwordMatch)
        return res.status(401).json({error: 'Password incorrect.'})
  
      const token = jwt.sign({id}, process.env.JWT_SECRET_KEY)
      return res.status(200).json({message: 'User logged in.', username, token})
  
    }
    catch(error){
      return res.status(400).json({error: error.message})
    }
}

module.exports = {
    Register,
    Login
}