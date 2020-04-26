import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import vm from "@/main"
import {
  getCookie,
  setCookie
} from '@/common/js/cookie';
import {
  getSessionStore
} from "@/common/js/storage.js";
import prefixAPI from "@/api/prefixAPI";
import {
  officialAccount,
  config
} from "@/api/officialAccount/";
import {
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
  getUrlKey
} from '@/common/js/mixin';
import axios from '@/server/index';


Vue.use(Router);

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

const routers = [];

function pushRouter(thisArray) {
  for (var j in thisArray) {
    routers.push(thisArray[j]);
  }
}

import OfficialAccountRouter from './officialAccount'

pushRouter(OfficialAccountRouter);
// console.log(routers)

const router = new Router({
  // mode: 'history',
  scrollBehavior: (to, from, savedPosition) => ({
    x: 0,
    y: 0
  }),
  routes: routers
});


function jump(url) {

  if (url.indexOf("?#") < 0) {
    window.location.href = url.replace("#", "?#");
  };
  // document.location.href = url;
}

const wxApi = {
  // appid: "wx2b40775628f07b69",
  appid: "wx9d7b423753706d74",
  urlencode: function (url) {
    url = (url + '').toString();
    return encodeURIComponent(url).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
  },
  author: function (redirect_uri) {
    // 跳转地址
    // redirect_uri = prefixAPI.hp ;
    redirect_uri = this.urlencode(redirect_uri);
    let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.appid + "&redirect_uri=" + redirect_uri + "&response_type=code" + "&scope=snsapi_userinfo" + "&state=STATE#wechat_redirect";
    jump(url)
  }
}


// 路由跳转之前
router.beforeEach((to, from, next) => {
  function check2() {
    if (window.location.href.indexOf("?#") < 0) {
      window.location.href = window.location.href.replace("#", "?#");
      next();
    } else {
      if (location.href.indexOf("pay_id") == -1) {
        next();
      } else {
        let id = getUrlKey('pay_id') + "";
        jump(window.location.origin + window.location.pathname + '#' + '/user/payMoney?id=' + id)
      }
    }
  }

  async function getToken(code) {
    let params = {
      code: code
    };
    axios.post(prefixAPI.api + '/api/login', params).then(function (data) {
      data = data.data;
      if (data.code == '0') {
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("loginData", JSON.stringify(data));
        let isUser = data.listRole[0].roleId;
        if (isUser == '0') window.localStorage.setItem('isUser', true);
        else window.localStorage.setItem('isUser', false);
        window.localStorage.setItem('userId', isUser);
        let href = window.localStorage.getItem('WXAuthorizeUrl');
        if (href) {
          localStorage.removeItem("WXAuthorizeUrl");
          jump(href)
        } else {
          check2();
        }
      } else {
        console.log("data.msg", data.msg);
      }
    }).catch(function (error) {
      console.log(error);
    });
  }


  // 有token直接放行
  if (localStorage.getItem('token')) {
    check2();
  } else {
    if (getUrlKey('code')) {
      // 根据url code 发请求获取token
      getToken(getUrlKey('code'))
    } else {
      let href = window.location.origin + window.location.pathname + '#' + to.fullPath;
      window.localStorage.setItem('WXAuthorizeUrl', href); // 保存跳转地址
      wxApi.author(window.location.origin + window.location.pathname)
    }
  }
  /*
   next();
   */


  // 更新页面title
});



// 路由跳转之前
/*router.beforeEach((to, from, next) => {
  let user = JSON.parse(getSessionStore('user'));
  if (user && user.id) {
    next()
  } else {
    let loginData = JSON.parse(sessionStorage.getItem('loginData'));
    let token = loginData && loginData.token;
    /!*if (!token && to.path != '/login') {
      next('/login');
    } else {*!/
      next();
    // }
  }
  // 更新页面title
  window.document.title = to.meta.title ? `${to.meta.title}` : ''
});*/


export default router;
