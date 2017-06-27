// candidate.js
import { get } from '../../utils/http.js'
import config from '../../utils/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    candidate_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_newest_candidate()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.get_newest_candidate(true)
  },

  get_newest_candidate: function (fresh = false) {
    fresh || wx.showLoading({ title: '正在拼老命加载' })
    this.fetch_candidate_list(candidates => {
      fresh || wx.hideLoading()
      let tmp = Object.keys(candidates).map(el => {
        candidates[el].id = el
        return candidates[el]
      })
      this.setData({ candidate_list: tmp.reverse() })
      fresh && wx.stopPullDownRefresh()
    })
  },

  fetch_candidate_list (cb) {
    let url = config.DB_URL + '/candidates.json'
    let params = { auth: config.AUTH_KEY }
    get(url, params).then(resp => cb(resp.data || {}))
  }
})