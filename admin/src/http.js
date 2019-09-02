import axios from 'axios'
import Vue from 'vue';
import router from './router';
const http = axios.create({
    // 动态端口 不写死
    baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    
    // baseURL: 'http://localhost:3000/admin/api'
})


http.interceptors.request.use(function (config) {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 服务端返回错误 有message 就弹出
http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            // 弹窗的内容 在status中的message定义
            message: err.response.data.message
        })
        if (err.response.status === 401) {
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

export default http 