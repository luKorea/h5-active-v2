export function getCode(appid) {
  let appId = appid; //填写公众号APPID
  let local = window.location.href; //当前地址
  //没有授权的code
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
    local
  )}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`; //跳转授权链接
  // eslint-disable-next-line no-undef
  scope = snsapi_base; //这句是静默授权的意思
  // if (code == null || code === "") {
  //
  // } else {
  //   //获取到授权的code
  //   // doSomething
  // }
}
