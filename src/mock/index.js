import Mock from 'mockjs'

const home = require('./home.js')
const search = require('./search.js')
const dispatch = require('./dispatch.js')
// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})
// 登录
Mock.mock('/addrmanager/addr/login/login.json', 'post',home.loginInfo)
// 获取验证码
Mock.mock('/addrmanager/addr/login/getYzm.json','post', home.getYzm);

// 获取行业分类，宽带供应商分类,商机搜索
Mock.mock('/addrmanager/addrcollect/tAddr/dict/list.json', 'post', search.reqOpportunity);

// 分送地址信息
Mock.mock('/addrmanager/addrcollect/tAddr/org.json', 'post',dispatch.dispatchAddr);
export default Mock;