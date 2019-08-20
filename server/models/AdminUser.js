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

})

module.exports = mongoose.model('AdminUser', schema)