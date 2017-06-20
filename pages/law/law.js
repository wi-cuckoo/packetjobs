//law.js
import laws from './law_text.js'

Page({
   data: {
      law_list: []
   },
   onLoad: function () {
      this.setData({law_list: laws})
   },
   kindToggle: function (e) {
      console.log('tapped')
      let id = e.currentTarget.id, list = this.data.law_list;
      for (let i = 0, len = list.length; i < len; ++i) {
         if (list[i].id == id) {
            list[i].open = !list[i].open
         } else {
            list[i].open = false
         }
      }
      this.setData({
         law_list: list
      })
   }
})
