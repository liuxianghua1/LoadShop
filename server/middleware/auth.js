module.exports = options => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')

    return async (req, res, next) => {
        // split分割空格 然后pop提取最后一个
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')
        // 解密 上面定义的token 然后解密到的就是数据库的用户id 然后下面在对应
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登录')
        // 挂载到req
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登录')

        await next()
    }
}