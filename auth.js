const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const auth = (req, res, next) =>{
    const authhead = req.headers.authorization
    if(!authhead) return res.status(StatusCodes.UNAUTHORIZED).json({accessToken: ''})
    const token = authhead.split(' ')[1]
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_JWT)
        req.userId = decoded.userId
        next()
    }catch(err){
        console.log(err)
        res.status(500).json({msg: 'somthing went wrong'})
    }
}

module.exports = auth