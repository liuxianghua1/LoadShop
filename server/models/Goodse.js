const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },//名称
    spec: { type: String },//规格
    avatar: { type: String },//头像
    banner: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'GoodsCategory' }],//关联分类
    //评分
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        effect: { type: Number },
        utility: { type: Number },
    },
    // 产品使用出装
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    color: { type: String },
    feature: { type: String },
    scope: { type: String },
    // 搭档
    partners: [{
        goodse: { type: mongoose.SchemaTypes.ObjectId, ref: 'Goodse' },
        description: { type: String }
    }]


})

module.exports = mongoose.model('Goods', schema)