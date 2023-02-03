const jwt = require('jsonwebtoken')

const createAccessToken = (id) =>{
    return jwt.sign({userId: id}, process.env.ACCESS_JWT, {expiresIn: '10m'})
}
module.exports = {
    createAccessToken
}