//index.js
import { get } from '../../utils/http.js'
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
    let timer = setInterval( () => {
      let user = fetch(c_keys.user)
      if (user !== null) {
        clearInterval(timer)
        this.set_admin(user.nickName)
      }
    }, 20)
    this.get_newest_job()
  },
  onPullDownRefresh: function () {
     this.get_newest_job(true)
  },
  get_newest_job: function (fresh = false) {
     this.methods.fetch_job_list(jobs => {
        let tmp = Object.keys(jobs).map(el => jobs[el])
        this.setData({ job_list: tmp })
        store(c_keys.jobs, tmp)
        fresh && wx.stopPullDownRefresh()
     })
  },
  apply_job: function (event) {
     let {job} = event.currentTarget.dataset
     wx.navigateTo({
        url: `/pages/apply/apply?id=${job.id}`
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
         let params = {auth: config.AUTH_KEY}
         get(url, params).then(resp => cb(resp.data))
     },

     is_admin (name, cb) {
       let url = config.DB_URL + `/roles/${name}.json`
       let params = { auth: config.AUTH_KEY }
       get(url, params).then( resp => {
         cb(resp.data === 'admin')
       })
     }
  }
})
