import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/categories/create',
          component: CategoryEdit
        },
        {
          path: '/categories/edit/:id',
          component: CategoryEdit,
          props: true
        },
        {
          path: '/categories/list',
          component: CategoryList
        },
      ]
    },

  ]
})
