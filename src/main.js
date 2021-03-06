import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
import {postRequest} from "./utils/api";
import {postKeyValueRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import BaiduMap from 'vue-baidu-map'

// use
Vue.use(mavonEditor)
Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.$http = axios
// axios.defaults.baseURL = 'http://153g21o285.51mypc.cn:16795/'
axios.defaults.baseURL = 'http://192.168.3.2:8082/'
axios.interceptors.request.use(config => {
    config.headers.Authentication = window.sessionStorage.getItem('token');
    return config
})
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('tree-table', TreeTable)
Vue.filter('dataFormat', function (originval) {
    const dt = new Date(originval);
    const y = dt.getFullYear();
    const m = (dt.getMonth() + 1 + '').padStart(2, '0');
    const d = (dt.getDay() + '').padStart(2, '0');
    const hh = (dt.getHours() + '').padStart(2, '0');
    const mm = (dt.getMinutes() + '').padStart(2, '0');
    const ss = (dt.getSeconds() + '').padStart(2, '0');
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ":" + ss;
})
Vue.use(BaiduMap, {
    /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
    ak: '9UQ6RzFBixcUaRUhhh7WT7pIKHHG1Ckq'
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
