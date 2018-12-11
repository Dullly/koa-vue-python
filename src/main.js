import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import routes from './router.js'

// global.css
import './global.scss'

// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.use(VueRouter)


// axios 配置
axios.defaults.timeout = 3000// 请求超时，适当修改
// axios.defaults.baseURL = '/api'
Vue.prototype.$ajax = axios


const router = new VueRouter(routes)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
