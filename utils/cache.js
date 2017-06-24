const store = (key, val) => {
   wx.setStorage({
      key: key,
      data: val
   })
}

const fetch = (key) => {
   return wx.getStorageSync(key) || null
}

const c_keys = {
   jobs: 'jobs',
   applys: 'applys',
   user: 'user',
   role: 'role'
}

export { store, fetch, c_keys }