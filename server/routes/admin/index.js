module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')

    // 创建分类
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })

    
    // 根据id来更新一条数据
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    
    // 删除id来删除一条数据
    router.delete('/categories/:id', async (req, res) => {
        await Category.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 查询分类数据 并且限制10条
    router.get('/categories', async (req, res) => {
        const items = await Category.find().limit(10)
        res.send(items)
    })

    // 根据分类id查询出一条数据显示在页面
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api', router)
}