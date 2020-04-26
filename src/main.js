import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/assets/css/iconfont/iconfont.css';
// import '@/assets/css/iconfont/iconfont.js';
import '@/assets/css/main.css';
// import './mock/index'

import { Toast, Loading,Notify } from 'vant'
import 'vant/lib/index.css'
Vue.prototype.$toast = Toast
Vue.prototype.$notify = Notify
Vue.prototype.$loading = Loading

import axios from '@/server/index'
Vue.prototype.$http = ({ type,url,data,config })=>{
  return new Promise((resolve, reject) => {
    if( type == 'get' ) {
      axios.get(url, {params: data},config || '').then((res) => {
          if(res.data.code=='5002' || res.data.code=='5003'){
              window.localStorage.removeItem(token);
          }
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    } else if( type == 'post' ){
      axios.post(url, data, config || '' ).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    }
  })
};


// 一段时间内不允许重复调用的函数
Function.prototype.delay = function(timeout) {
  const t = this;
  return function() {
    if (!t.execed) {
      t.apply(this, Array.prototype.slice.call(arguments))
      t.execed = true
      setTimeout(function() {
        t.execed = false
      }, timeout || 3000)
    } else {
      return
    }
  }
}

let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

export default vm
