const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    number:Number,
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }
});

const user = mongoose.model('user', userSchema);

module.exports = user;