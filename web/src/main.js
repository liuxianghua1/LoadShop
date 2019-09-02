import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss';
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

import Card from './components/Card.vue';
Vue.component('m-card', Card)

import ListCard from './components/ListCard.vue';
Vue.component('m-list-card', ListCard)

import TopAd from './components/TopAd.vue';
Vue.component('Top-Ad', TopAd)

import Nav from './components/Nav.vue';
Vue.component('N-av', Nav)

//vant
import 'vant/lib/index.css';
import { Popup } from 'vant';
Vue.use(Popup);
import { Tab, Tabs, Toast } from 'vant';
Vue.use(Tab).use(Tabs).use(Toast);
import { Form, FormItem, Button, Input , InputNumber } from 'element-ui';
Vue.use(Form).use(FormItem).use(Button).use(Input).use(InputNumber);


import axios from 'axios'


Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  // baseURL: 'http://localhost:3000/web/api'
})

import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

// 根据路由设置标题
router.beforeEach((to, from, next) => {
  /*路由发生改变修改页面的title */
  if(to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')