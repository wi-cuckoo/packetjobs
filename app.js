//app.js
import { put } from './utils/http.js'
import config from './utils/config.js'
import {
  store,
  c_keys
} from './utils/cache.js'
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    wx.checkSession({
      fail: this.login
    })
  },
  login () {
    let callback = this.upload_user_info
    wx.login({
      success: resp => callback(resp)
    })
  },
  upload_user_info (login_res) {
    let upload = user_info => {
      let post_data = {
        avatar: user_info.avatarUrl,
        name: user_info.nickName,
        gender: user_info.gender,
        js_code: login_res.code,
        openid: 'fuck the wx'
      }
      let url = config.DB_URL +
        `/users/${post_data.name}.json?auth=${config.AUTH_KEY}`
      put(url, post_data).then( console.log )
    }
    wx.getUserInfo({
      success: resp => {
        let user = resp.userInfo
        store(c_keys.user, user)
        upload(user)
      }
    })
  }
})