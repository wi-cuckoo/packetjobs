// apply.js
import {
   store,
   fetch,
   c_keys
} from '../../utils/cache.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      job: {},
      agree: false,
      invalid: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (route) {
     let cache_job = fetch(c_keys.jobs)
     let seek_job = cache_job.find( el => el.id == route.id)
     wx.setNavigationBarTitle({title: '申请职位'})
     this.setData({ job: seek_job })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--
   */
  apply: function () {
     wx.showLoading({ title: '正在提交，稍等' })

     setTimeout(() => {
        wx.hideLoading()
        wx.showToast({ title: '申请提交成功' })
        wx.navigateBack({})
     }, 2000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})