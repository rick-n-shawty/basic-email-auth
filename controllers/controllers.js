const User = require('../DB/User')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const {createAccessToken} = require('../middleware/tokens')
const {StatusCodes} = require('http-status-codes')
const signup = async(req, res, next) =>{
    const {email, password} = req.body
    try{
        const user = await User.create({email, password})
        const token = jwt.sign({userId: user._id}, process.env.MAIN_JWT)
        const url = `http://localhost:5000/verify_token/${token}`
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        
        const msg = {
            to: email,
            subject: 'Confirmation',
            text: `click this ${url}`
        }
        transporter.sendMail(msg, (err, data) =>{
            if(err){
                console.log(err)
            }
            console.log(data)
        })
        res.status(200).json({msg: 'email has been sent'})
    }catch(err){
        next(err)
    }
}

const login = async(req, res, next) =>{
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user.isVerified) return res.status(StatusCodes.FORBIDDEN).json({msg: 'please confirm your email first'})
        const isMatch = user.Compare(password)
        if(!isMatch) return res.status(StatusCodes.BAD_REQUEST).json({msg: 'wrong password'})
        const accessToken = createAccessToken(user._id)
        res.status(StatusCodes.OK).json({msg: 'u logged in', accessToken})
    }catch(err){
        next(err)
    }
}

const verifyLink = async (req, res) =>{
    const token = req.params.token
    try{
        let payload = undefined
        jwt.verify(token, process.env.MAIN_JWT, (err, decoded) =>{
            if(err){
                next(err)
            }
            // console.log(decoded)
            payload = decoded
        })
        const user = await User.findByIdAndUpdate(payload.userId, {isVerified: true})
        res.status(StatusCodes.OK).json({msg: 'you are good to go'})
    }catch(err){
        next(err)  
    }
}

const data = async (req, res) =>{
    const {userId} = req
    res.send(`your id is ${userId}, which is very secret`)
}

module.exports = {
    verifyLink,
    signup,
    login,
    data
}