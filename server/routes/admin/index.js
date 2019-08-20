module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
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
    router.get('/', async (req, res, next) => {
        // split分割空格 然后pop提取最后一个
        const token = String(req.headers.authorization || '').split(' ').pop()
        // 解密 上面定义的token 然后解密到的就是数据库的用户id 然后下面在对应
        const { id } = jwt.verify(token, app.get('secret'))
        // 挂载到req
        req.user = await AdminUser.findById(id)
        await next()
    }, async (req, res) => {
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
        // 根据用户名找用户
        // select取出加密密码
        const user = await AdminUser.findOne({ username }).select('+password')
        if (!user) {
            //status:获取当前服务器的响应状态  200=>成功
            return res.status(422).send({
                message: '用户不存在'
            })
        }

        // 校验密码
        // bcryptjs的一个方法 明文密码和数据库密码比对
        const isValid = require('bcryptjs').compareSync(password, user.password)
        if (!isValid) {
            return res.status(422).send({
                message: '密码错误'
            })
        }

        // 返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })
}