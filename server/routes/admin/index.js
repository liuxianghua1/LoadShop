module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
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

    // 根据id来删除一条数据
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
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    // 根据分类id查询出一条数据显示在页面
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')

    const resourceMiddleware = require('../../middleware/resource')

    app.use('/admin/api/rest/:resource', resourceMiddleware(), authMiddleware() , router)

    const multer = require('multer')
    // 静态托管
    const upload = multer({ dest: __dirname + '/../../uploads' })
    // 图片上传
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login' , async (req, res) => {
        const { username, password } = req.body
        // 根据用户名找用户
        // select取出加密密码
        const user = await AdminUser.findOne({ username }).select('+password')
        assert(user, 422, '用户不存在')

        // 校验密码
        // bcryptjs的一个方法 明文密码和数据库密码比对
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')

        // 返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })

    // 错误处理 捕获异常
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}