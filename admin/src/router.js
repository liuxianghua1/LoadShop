import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'

import ArticleCategoryEdit from './views/ArticleCategoryEdit.vue'
import ArticleCategoryList from './views/ArticleCategoryList.vue'

import GoodsCategoryEdit from './views/GoodsCategoryEdit.vue'
import GoodsCategoryList from './views/GoodsCategoryList.vue'

import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'

import GoodsEdit from './views/GoodsEdit.vue'
import GoodsList from './views/GoodsList.vue'

import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'

import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'

import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'
import AdminUserUpdate from './views/AdminUserUpdate.vue'

import MessageList from './views/MessageList.vue'




Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [

        { path: '/article_categories/create', component: ArticleCategoryEdit },
        { path: '/article_categories/edit/:id', component: ArticleCategoryEdit, props: true },
        { path: '/article_categories/list', component: ArticleCategoryList },

        { path: '/goods_categories/create', component: GoodsCategoryEdit },
        { path: '/goods_categories/edit/:id', component: GoodsCategoryEdit, props: true },
        { path: '/goods_categories/list', component: GoodsCategoryList },


        { path: '/items/create', component: ItemEdit },
        { path: '/items/edit/:id', component: ItemEdit, props: true },
        { path: '/items/list', component: ItemList },

        { path: '/goodses/create', component: GoodsEdit },
        { path: '/goodses/edit/:id', component: GoodsEdit, props: true },
        { path: '/goodses/list', component: GoodsList },

        { path: '/articles/create', component: ArticleEdit },
        { path: '/articles/edit/:id', component: ArticleEdit, props: true },
        { path: '/articles/list', component: ArticleList },

        { path: '/ads/create', component: AdEdit },
        { path: '/ads/edit/:id', component: AdEdit, props: true },
        { path: '/ads/list', component: AdList },

        { path: '/admin_users/create', component: AdminUserEdit },
        { path: '/admin_users/update/:id', component: AdminUserUpdate, props: true },
        { path: '/admin_users/list', component: AdminUserList },

        { path: '/message/list', component: MessageList },

      ]
    },

  ]
})
// 路由限制 if 判断 不是isPublic：true 也没有token 则跳转
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
  // if (!to.meta.isPublic && !sessionStorage.token) {
    return next('/login')
  }
  next()
})
export default router