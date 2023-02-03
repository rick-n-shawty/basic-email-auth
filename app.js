require('dotenv').config()
const express = require('express')
const app = express()
const connect = require('./DB/connect')
const port = process.env.PORT || 5000
const router = require('./routes/routes')
const handler = require('./errors/handler')
const notFound = require('./errors/notFound')
const helmet = require('helmet')
const rateLim = require('express-rate-limit')
const xss = require('xss-clean')
const cors = require('cors')


app.use(cors({
    origin: '*'
}))
app.use(helmet())
app.use(rateLim({
    windowMs: 15 *1000 * 60,
    max: 20
}))
app.use(xss())

app.use(express.json())
app.use('/', router)
app.use(handler)
app.use(notFound)


const start = async() =>{
    try{
        await connect(process.env.MONGO_URI)
        app.listen(port, () => console.log(`server is up on port ${port}...`))
    }catch(err){
        console.log(err)
    }
}
start()