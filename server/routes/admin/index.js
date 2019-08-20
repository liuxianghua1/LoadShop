module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })

    // 创建分类
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })


    // 根据id来更新一条数据
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 删除id来删除一条数据
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 查询分类数据 并且限制10条
    router.get('/', async (req, res) => {
        const queryOptions = {}
        // 如果模型是个分类
        if (req.Model.modelName === 'Category') {
            // 那就加个populate parent 给他查出来 否则不加
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })

    // 根据分类id查询出一条数据显示在页面
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)

    const multer = require('multer')
    // 静态托管
    const upload = multer({ dest: __dirname + '/../../uploads' })
    // 图片上传
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // 根据用户名找用户 校验密码 返回token
        const AdminUser = require('../../models/AdminUser')
        const user = await AdminUser.findOne({ username })
        if (!user) {
            //status:获取当前服务器的响应状态  200=>成功
            return res.status(422).send({
                message: '用户不存在'
            })
        }

    })
}