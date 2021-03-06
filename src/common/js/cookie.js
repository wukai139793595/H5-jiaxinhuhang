/**
 * 存储 cookie
 * @param {*} name 
 * @param {*} value 
 */
export const setCookie = function (name, value) {
  document.cookie = name + "="+ escape (value) + ";path=/";
}
  
// 获取 cookie
export const getCookie = function (name) {
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if (arr=document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}

// 删除 cookie
export const delCookie = function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!=null) {
    document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
  }
}