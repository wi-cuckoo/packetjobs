const store = (key, val) => {
   wx.setStorage({
      key: key,
      data: val
   })
}

const fetch = (key) => {
   return wx.getStorageSync(key)
}

const c_keys = {
   jobs: 'jobs',
   applys: 'applys'
}

export { store, fetch, c_keys }