const express = require('express')

const app = express()

// 在当前express实例设置一个变量
app.set('secret', 'c65ev4r7b68n79m0')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)

require('./routes/admin')(app)

require('./routes/web/index')(app)

app.listen(3000, () => {
    console.log('http://loaclhost:3000');
})