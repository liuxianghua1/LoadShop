const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        // 默认不散列
        select: false,
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    },
    avatar: { type: String, default:'http://localhost:3000/uploads/timg.jpg' },
    phone: { type: Number},


}, {
        timestamps: true
    })

module.exports = mongoose.model('AdminUser', schema)