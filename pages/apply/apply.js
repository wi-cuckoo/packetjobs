// apply.js
import { post } from '../../utils/http.js'
import config from '../../utils/config.js'
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
    invalid: false,
    candidate: {
      name: '',
      age: null,
      phone: '',
      university: '',
      intro: ''
    },
    intro_len: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (route) {
    let cache_job = fetch(c_keys.jobs)
    let seek_job = cache_job.find(el => el.id == route.id)
    wx.setNavigationBarTitle({ title: '申请职位' })
    this.setData({ job: seek_job })
  },

  /**
   * 页面相关事件处理函数--
   */
  apply: function () {
    let is_valid = this.validate_form()
    if (!is_valid) {
      this.setData({invalid: !is_valid})
      setTimeout( () => {
        this.setData({invalid: false})
      }, 2000)
      return
    }
    let jump_annimotion = () => {
      wx.showToast({ title: '申请提交成功' })
      setTimeout(() => {
        wx.navigateBack({})
      }, 1000)
    }
    wx.showLoading({ title: '正在提交，稍等' })
    let data = this.data.candidate
    data.job = this.data.job.name
    let url = config.DB_URL + '/candidates.json?auth=' + config.AUTH_KEY
    post(url, data).then(resp => {
      wx.hideLoading()
      jump_annimotion()
    })
    
  },

  bind_form_input: function (e) {
    let {detail, target} = e
    let field = target.dataset.field
    let value = detail.value
    // this.data.candidate.name = value
    if (field === 'intro') {
      this.setData({ intro_len: value.length })
    }
    this.data.candidate[field] = value
  },

  validate_form: function () {
    let {name,
          age,
          phone,
          university,
          intro
        } = this.data.candidate
    return name && age && phone && university && intro
  }
})