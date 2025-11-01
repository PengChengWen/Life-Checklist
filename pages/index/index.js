// pages/index/index.js
Page({
  data: {
    checklist: [],
    filterStatus: -1, // -1-全部，0-未完成，1-已完成
    empty: false,
    totalCount: 0,
    completedCount: 0,
    pendingCount: 0
  },

  onLoad() {
    this.loadChecklist()
  },

  onShow() {
    // 每次显示页面时重新加载数据
    this.loadChecklist()
  },

  loadChecklist() {
    const checklist = wx.getStorageSync('lifeChecklist') || []
    const filteredList = this.filterChecklist(checklist, this.data.filterStatus)
    
    // 格式化时间
    const formattedList = filteredList.map(item => {
      return {
        ...item,
        createTimeStr: this.formatTime(item.createTime)
      }
    })
    
    // 计算统计数据
    const totalCount = checklist.length
    const completedCount = checklist.filter(item => item.status === 1).length
    const pendingCount = checklist.filter(item => item.status === 0).length
    
    this.setData({
      checklist: formattedList,
      empty: formattedList.length === 0,
      totalCount,
      completedCount,
      pendingCount
    })
  },

  formatTime(timestamp) {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    
    const minute = 60 * 1000
    const hour = 60 * minute
    const day = 24 * hour
    const month = 30 * day
    const year = 365 * day
    
    if (diff < minute) {
      return '刚刚'
    } else if (diff < hour) {
      return Math.floor(diff / minute) + '分钟前'
    } else if (diff < day) {
      return Math.floor(diff / hour) + '小时前'
    } else if (diff < month) {
      return Math.floor(diff / day) + '天前'
    } else if (diff < year) {
      return Math.floor(diff / month) + '个月前'
    } else {
      return Math.floor(diff / year) + '年前'
    }
  },

  filterChecklist(list, status) {
    if (status === -1) {
      return list.sort((a, b) => {
        // 按优先级和创建时间排序
        if (a.status !== b.status) {
          return a.status - b.status // 未完成的在前
        }
        if (a.priority !== b.priority) {
          return b.priority - a.priority // 优先级高的在前
        }
        return b.createTime - a.createTime // 新的在前
      })
    }
    return list.filter(item => item.status === status)
      .sort((a, b) => {
        if (a.priority !== b.priority) {
          return b.priority - a.priority
        }
        return b.createTime - a.createTime
      })
  },

  onFilterChange(e) {
    const status = parseInt(e.currentTarget.dataset.status)
    const checklist = wx.getStorageSync('lifeChecklist') || []
    const filteredList = this.filterChecklist(checklist, status)
    
    // 格式化时间
    const formattedList = filteredList.map(item => {
      return {
        ...item,
        createTimeStr: this.formatTime(item.createTime)
      }
    })
    
    this.setData({
      filterStatus: status,
      checklist: formattedList,
      empty: formattedList.length === 0
    })
  },

  toggleStatus(e) {
    const id = e.currentTarget.dataset.id
    const checklist = wx.getStorageSync('lifeChecklist') || []
    const index = checklist.findIndex(item => item.id === id)
    
    if (index !== -1) {
      checklist[index].status = checklist[index].status === 0 ? 1 : 0
      if (checklist[index].status === 1) {
        checklist[index].completeTime = new Date().getTime()
      }
      wx.setStorageSync('lifeChecklist', checklist)
      this.loadChecklist()
      
      // 显示提示
      wx.showToast({
        title: checklist[index].status === 1 ? '已完成！' : '已取消完成',
        icon: 'success',
        duration: 1500
      })
    }
  },

  deleteItem(e) {
    const id = e.currentTarget.dataset.id
    const that = this
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个愿望吗？',
      success(res) {
        if (res.confirm) {
          const checklist = wx.getStorageSync('lifeChecklist') || []
          const newChecklist = checklist.filter(item => item.id !== id)
          wx.setStorageSync('lifeChecklist', newChecklist)
          that.loadChecklist()
          
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1500
          })
        }
      }
    })
  },

  goToAdd() {
    wx.navigateTo({
      url: '/pages/add/add'
    })
  },

  onShareAppMessage() {
    return {
      title: '人生清单 - 记录你这一生想要去做的事情',
      path: '/pages/index/index'
    }
  }
})

