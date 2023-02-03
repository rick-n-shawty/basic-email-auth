const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connect = (uri) =>{
    return mongoose.connect(uri)
}

module.exports = connect