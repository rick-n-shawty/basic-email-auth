const {StatusCodes} = require('http-status-codes')
const handler = (err, req, res, next) =>{
    console.log('hi from error')
    if(err.code === 11000){
        return res.status(StatusCodes.BAD_REQUEST).json({msg: 'user with this email already exists...'})
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
}
module.exports = handler