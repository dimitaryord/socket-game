const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    try{
        const token = req.header('x-auth-token')
        if(!token)
            return res.status(401).json({error: 'No token, authorization denied.'})
    
        const result = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.id = result.id
        next()
    }
    catch(error){
        res.status(401).json({error: error.message})
    }
}