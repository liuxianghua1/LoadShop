import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Article from './views/Article.vue'
import Goods from './views/Goods.vue'
import NewsCount from './views/NewsCount.vue'
import GoodsCount from './views/GoodsCount.vue'
import Culture from './views/Home/Culture.vue'
import About from './views/Home/About.vue'
import Agency from './views/Home/Agency.vue'
import Oem from './views/Home/Oem.vue'
import Message from './views/Home/Message.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        { path: '/', name: 'home', component: Home, meta: { title : '领军者官网-鲁班大师' }},
        { path: '/articles/:id', name: 'article', component: Article, props: true },
        { path: '/NewsCount', name: 'newscount', component: NewsCount, meta: { title : '新闻列表-领军者官网-鲁班大师' }},
        { path: '/GoodsCount', name: 'goodscount', component: GoodsCount, meta: { title : '产品列表-领军者官网-鲁班大师' }},
        { path: '/Culture', name: 'culture', component: Culture, meta: { title : '企业文化-领军者官网-鲁班大师' }},
        { path: '/About', name: 'about', component: About, meta: { title : '关于我们-领军者官网-鲁班大师' }},

        { path: '/Agency', name: 'agency', component: Agency, meta: { title : '经销代理-领军者官网-鲁班大师' }},
        { path: '/Oem', name: 'oem', component: Oem, meta: { title : '代工合作-领军者官网-鲁班大师' }},
        { path: '/Message', name: 'message', component: Message, meta: { title : '网站留言-领军者官网-鲁班大师' }},
      ]
    },
    { path: '/goodses/:id', name: 'goods', component: Goods, props: true },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
