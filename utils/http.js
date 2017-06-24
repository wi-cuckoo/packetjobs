const request = (url, {
   data = {},
   method = 'GET',
   success = (data) => {},
   fail = (err) => {wx.showToast({ title: '网络错误' })}
} = {}) => {
   wx.request({
      url: url,
      data: data,
      method: method,
      header: { 'content-type': 'application/json' },
      success: (res) => { success(res) },
      fail: fail
   })
}

const get = (url, params = {}) => {
   return new Promise((resolve, reject) => {
      request(url, {
         data: params,
         success: (data) => resolve(data)
      })
   })
}

const post = (url, data = {}) => {
   return new Promise((resolve, reject) => {
      request(url, {
         data: data,
         method: 'POST',
         success: (data) => resolve(data)
      })
   })
}

const put = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    request(url, {
      data: data,
      method: 'PUT',
      success: (data) => resolve(data)
    })
  })
}

export { get, post, put}