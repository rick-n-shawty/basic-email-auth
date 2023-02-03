const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.Compare = async function(password){
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}
const User = mongoose.model('users', UserSchema)
module.exports = User