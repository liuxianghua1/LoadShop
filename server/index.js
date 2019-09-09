const express = require('express')

const app = express()

// 在当前express实例设置一个变量
app.set('secret', 'c65ev4r7b68n79m0')

app.use(require('cors')())
app.use(express.json())

app.use('/admin/', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)

require('./routes/admin')(app)

require('./routes/web/index')(app)

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000/#/');
})