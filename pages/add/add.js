// pages/add/add.js
Page({
  data: {
    title: '',
    description: '',
    priority: 1, // 0-低，1-中，2-高
    priorityOptions: [
      { value: 0, label: '低', color: '#6b7280' },
      { value: 1, label: '中', color: '#2563eb' },
      { value: 2, label: '高', color: '#d97706' }
    ]
  },

  onInputTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },

  onInputDescription(e) {
    this.setData({
      description: e.detail.value
    })
  },

  onPriorityChange(e) {
    this.setData({
      priority: parseInt(e.currentTarget.dataset.priority)
    })
  },

  onSubmit() {
    const { title, description, priority } = this.data

    // 验证输入
    if (!title || title.trim() === '') {
      wx.showToast({
        title: '请输入愿望标题',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (!description || description.trim() === '') {
      wx.showToast({
        title: '请输入愿望描述',
        icon: 'none',
        duration: 2000
      })
      return
    }

    // 获取现有数据
    const checklist = wx.getStorageSync('lifeChecklist') || []
    const nextId = wx.getStorageSync('nextId') || 1

    // 创建新愿望
    const newItem = {
      id: nextId,
      title: title.trim(),
      description: description.trim(),
      priority: priority,
      status: 0,
      createTime: new Date().getTime()
    }

    // 保存数据
    checklist.push(newItem)
    wx.setStorageSync('lifeChecklist', checklist)
    wx.setStorageSync('nextId', nextId + 1)

    // 显示成功提示
    wx.showToast({
      title: '添加成功！',
      icon: 'success',
      duration: 1500
    })

    // 清空表单
    this.setData({
      title: '',
      description: '',
      priority: 1
    })

    // 延迟跳转回列表页
    setTimeout(() => {
      // 尝试使用switchTab，如果失败则使用navigateBack
      wx.switchTab({
        url: '/pages/index/index',
        fail() {
          wx.navigateBack()
        }
      })
    }, 1500)
  },

  onReset() {
    this.setData({
      title: '',
      description: '',
      priority: 1
    })
  }
})

