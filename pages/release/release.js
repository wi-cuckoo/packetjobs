// apply.js
import { post } from '../../utils/http.js'
import config from '../../utils/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    invalid: false,
    new_job: {
      name: '',
      city: '',
      company: '',
      salary: '',
      desc: ''
    },
    desc_len: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (route) {
    
  },

  /**
   * 页面相关事件处理函数--
   */
  release: function () {
    let is_valid = this.validate_form()
    if (!is_valid) {
      this.setData({ invalid: !is_valid })
      setTimeout(() => {
        this.setData({ invalid: false })
      }, 2000)
      return
    }
    let jump_annimotion = () => {
      wx.showToast({ title: '职位发布成功' })
      setTimeout(() => {
        wx.navigateBack({})
      }, 1000)
    }
    wx.showLoading({ title: '正在发布，稍等' })
    let data = this.data.new_job
    data.time = new Date().getTime()
    let url = config.DB_URL + '/jobs.json?auth=' + config.AUTH_KEY
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
    if (field === 'desc') {
      this.setData({ desc_len: value.length })
    }
    this.data.new_job[field] = value
  },

  validate_form: function () {
    let {name,
      city,
      company,
      salary,
      desc
    } = this.data.new_job
    return name && city && company && salary && desc
  }
})