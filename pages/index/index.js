//index.js
import { get, del } from '../../utils/http.js'
import config from '../../utils/config.js'
import {
  store,
  fetch,
  c_keys
} from '../../utils/cache.js'
// 获取应用实例
// const app = getApp()

Page({
  data: {
    motto: 'Find What Jobs You Like',
    admin: false,
    job_list: []
  },
  onLoad: function () {
    let loop_max = 10
    let timer = setInterval(() => {
      let user = fetch(c_keys.user)
      if (user !== null && --loop_max > 0) {
        clearInterval(timer)
        this.set_admin(user.nickName)
      }
    }, 200)
    this.get_newest_job()
  },
  onPullDownRefresh: function () {
    this.get_newest_job(true)
  },
  get_newest_job: function (fresh = false) {
    fresh || wx.showLoading({title: '正在拼老命加载'})
    this.methods.fetch_job_list(jobs => {
      fresh || wx.hideLoading()
      let tmp = Object.keys(jobs).map(el => {
        jobs[el].id = el
        return jobs[el]
      })
      this.setData({ job_list: tmp.reverse() })
      store(c_keys.jobs, tmp)
      fresh && wx.stopPullDownRefresh()
    })
  },
  apply_job: function (event) {
    if (this.longtap_lock){
      this.longtap_lock = false
      return
    }
    let {job} = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/apply/apply?id=${job.id}`
    })
  },
  delete_job: function (event) {
    if(!this.data.admin) return
    this.longtap_lock = true
    let { job } = event.currentTarget.dataset
    wx.showModal({
      title: '下架该岗位',
      content: '确认将会删除该岗位，请谨慎操作',
      success: res => {
        res.confirm && this.methods.remove_job(job.id).then(() => this.get_newest_job(true))
      }
    })
  },
  set_admin: function (name) {
    let role = fetch(c_keys.role)
    if (role !== null) {
      this.setData({ admin: role })
      return false;
    }
    this.methods.is_admin(name, result => {
      this.setData({ admin: result })
      store(c_keys.role, result)
    })
  },
  methods: {
    fetch_job_list(cb) {
      let url = config.DB_URL + '/jobs.json'
      let params = { auth: config.AUTH_KEY }
      get(url, params).then(resp => cb(resp.data || {}))
    },

    is_admin(name, cb) {
      let url = config.DB_URL + `/roles/${name}.json`
      let params = { auth: config.AUTH_KEY }
      get(url, params).then(resp => {
        cb(resp.data === 'admin')
      })
    },

    remove_job(id) {
      let url = config.DB_URL + `/jobs/${id}.json?auth=${config.AUTH_KEY}`
      return del(url)
    }
  },
  longtap_lock: false
})
