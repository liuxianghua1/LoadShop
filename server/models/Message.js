const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    phone: { type: Number },
    content: { type: String }
}, {
    timestamps: true
})

module.exports = mongoose.model('Message', schema)