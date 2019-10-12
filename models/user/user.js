import mongoose from 'mongoose'
import userData from '../../initData/userData'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: Number,
    username: String,
    password: String
})


const User = mongoose.model('User', userSchema);
console.log('oooo')
let userFind = User.findOne((err, data) => {

    if (!data) {

        userData.forEach(item => {
            User.create(item)
        })
    }
})
console.log('kkkk====', userFind)

export default User