//index.js
import { get } from '../../utils/http.js'
import { 
   store,
   fetch,
   c_keys
} from '../../utils/cache.js'
//获取应用实例

var app = getApp()
Page({
  data: {
    motto: 'Find What Jobs You Like',
    userInfo: {},
    job_list: []
  },
  onLoad: function () {
    console.log('onLoad')
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
  methods: {
     fetch_job_list(cb) {
         let url = 'https://wejobs-777f6.firebaseio.com/jobs.json'
         get(url).then(resp => cb(resp.data))
     }
  }
})
