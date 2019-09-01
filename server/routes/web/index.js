module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Category = mongoose.model('Category')
    const ArticleCategory = mongoose.model('ArticleCategory')
    const GoodsCategory = mongoose.model('GoodsCategory')
    const Goods = mongoose.model('Goods')

    const Article = mongoose.model('Article')
    const Message = mongoose.model('Message')
    const Hero = mongoose.model('Hero')
    const Ad = mongoose.model('Ad')


    // 创建用户
    router.post('/message_add', async (req, res) => {
        body = req.body
        console.log(body)
        new Message(body).save (function (err, data) {
            if (err) {
                console.log(err)
            }
        })
    })

    // 新闻列表接口
    router.get('/news/list', async (req, res) => {
        const demo = await ArticleCategory.find()
        const cats = await ArticleCategory.aggregate([
            {
            $match: {
                // cat: demo._id
                cat: ''
              }
            },
            
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            // {
            //     $project: {
            //       newsList: {
            //         _id: ,
            //         body: 0
            //       }
            //     }
            //   },
            {
                $addFields: {
                    newsList: { $slice: ['$newsList', 5] },
                },
            },
        ])
        const hotNews = ['5d6650c71eb74c4224d1c7bb', '5d665d419cefd11b24f48858', '5d665d909cefd11b24f4885d', '5d671f3c38448a1fd44a641f']
        const subCats = demo.map(v => v) //新闻 公告 活动 赛事
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).populate('categories').sort({ '_id': -1 }).limit(5).lean()
        }
            , {
                name: '新闻',
                newsList: await Article.find().where({
                    categories: { $in: hotNews[0] }
                }).populate('categories').sort({ '_id': -1 }).limit(5).lean()
            }, {
                name: '公告',
                newsList: await Article.find().where({
                    categories: { $in: hotNews[1] }
                }).populate('categories').sort({ '_id': -1 }).limit(5).lean()
            }, {
                name: '活动',
                newsList: await Article.find().where({
                    categories: { $in: hotNews[2] }
                }).populate('categories').sort({ '_id': -1 }).limit(5).lean()
            }, {
                name: '赛事',
                newsList: await Article.find().where({
                    categories: { $in: hotNews[3] }
                }).populate('categories').sort({ '_id': -1 }).limit(5).lean()
            }

        )
        cats.map(cat => {
            cat.newsList.map(news => {
                news.CategoryName = (cat.name === '热门') ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        res.send(cats)
    })



    // 全部新闻接口

    router.get('/news/count', async (req, res) => {
        const demo = await ArticleCategory.find()
        const cats = await ArticleCategory.aggregate([
            {
            $match: {
                cat: demo._id,
              }
            },
            
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                $addFields: {
                    newsList: '$newsList',
                },
            },
        ])
        const hotNews = ['5d6650c71eb74c4224d1c7bb', '5d665d419cefd11b24f48858', '5d665d909cefd11b24f4885d', '5d671f3c38448a1fd44a641f']
        const subCats = demo.map(v => v) //新闻 公告 活动 赛事
        cats.unshift({
            name: '全部',
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).populate('categories').sort({ '_id': -1 }).lean()
        })
        cats.map(cat => {
            cat.newsList.map(news => {
                news.CategoryName = (cat.name === '全部') ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        res.send(cats)
    })


    // 英雄列表接口
    router.get('/heroes/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '英雄分类'
        })
        const cats = await Category.aggregate([
            { $match: { parent: parent._id } },
            {
                $lookup: {
                    from: 'heroes',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'heroList'
                }
            }
        ])

        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            heroList: await Hero.find().where({
                categories: { $in: subCats }
            }).limit(10).lean()
        })

        res.send(cats)
    })

    // 产品列表接口
    router.get('/goodses/list', async (req, res) => {
        const goods = await GoodsCategory.find()
        const cats = await GoodsCategory.aggregate([
            { $match: { goods: goods._id } },
            {
                $lookup: {
                    from: 'goods',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'goodsList'
                }
            }
        ])

        const subCats = goods.map(v => v._id)
        cats.unshift({
            name: '热门',
            goodsList: await Goods.find().where({
                categories: { $in: subCats }
            }).limit(10).lean()
        })

        res.send(cats)
    })

    // 产品列表接口
    router.get('/goodses/count', async (req, res) => {
        const goods = await GoodsCategory.find()
        const cats = await GoodsCategory.aggregate([
            { $match: { goods: goods._id } },
            {
                $lookup: {
                    from: 'goods',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'goodsList'
                }
            }
        ])

        const subCats = goods.map(v => v._id)
        cats.unshift({
            name: '全部',
            goodsList: await Goods.find().where({
                categories: { $in: subCats }
            }).limit(10).lean()
        })

        res.send(cats)
    })

    // 文章详情接口
    router.get('/articles/:id', async (req, res) => {
        const data = await Article.findById(req.params.id).lean()
        data.related = await Article.find().populate('categories').where({
            categories: { $in: data.categories }
        }).limit(4)
        res.send(data)
    })

    // 英雄详情接口
    router.get('/heroes/:id', async (req, res) => {
        const data = await Hero.findById(req.params.id).populate('categories items1 items2 partners.hero').lean()
        res.send(data)
    })

    // 产品详情接口
    router.get('/goodses/:id', async (req, res) => {
        const data = await Goods.findById(req.params.id).populate('categories items1 partners._id').lean()
        res.send(data)
    })

    // 轮播图接口
    router.get('/swiper/list', async (req, res) => {
        const data = await Ad.find({
            name: '首页幻灯片'
        })
        res.send(data)
    })

    app.use('/web/api', router)
}