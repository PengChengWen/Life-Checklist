// app.js
App({
  onLaunch() {
    // 初始化默认数据
    this.initDefaultData()
  },

  initDefaultData() {
    const defaultData = [
      {
        id: 1,
        title: "环游世界",
        description: "去至少30个国家旅行，体验不同的文化和风景",
        createTime: new Date().getTime(),
        status: 0, // 0-未完成，1-已完成
        priority: 2 // 0-低，1-中，2-高
      },
      {
        id: 2,
        title: "学会一门外语",
        description: "流利掌握英语，能够无障碍交流",
        createTime: new Date().getTime(),
        status: 0,
        priority: 1
      },
      {
        id: 3,
        title: "写一本书",
        description: "出版一本属于自己的书籍，分享人生感悟",
        createTime: new Date().getTime(),
        status: 0,
        priority: 2
      },
      {
        id: 4,
        title: "学会一门乐器",
        description: "学会弹吉他，能够演奏喜欢的歌曲",
        createTime: new Date().getTime(),
        status: 0,
        priority: 1
      },
      {
        id: 5,
        title: "完成一次马拉松",
        description: "参加并完成全程马拉松，挑战自己的极限",
        createTime: new Date().getTime(),
        status: 0,
        priority: 1
      },
      {
        id: 6,
        title: "学习一门新技能",
        description: "掌握编程或设计等新技能，提升自我",
        createTime: new Date().getTime(),
        status: 0,
        priority: 2
      },
      {
        id: 7,
        title: "与家人共度美好时光",
        description: "每年至少安排一次家庭旅行，创造美好回忆",
        createTime: new Date().getTime(),
        status: 0,
        priority: 2
      },
      {
        id: 8,
        title: "做一次志愿者",
        description: "参与公益活动，帮助需要帮助的人",
        createTime: new Date().getTime(),
        status: 0,
        priority: 1
      }
    ]

    // 检查是否已有数据
    const existingData = wx.getStorageSync('lifeChecklist')
    if (!existingData || existingData.length === 0) {
      wx.setStorageSync('lifeChecklist', defaultData)
      wx.setStorageSync('nextId', defaultData.length + 1)
    } else {
      // 如果有数据但没有nextId，设置它
      const nextId = wx.getStorageSync('nextId')
      if (!nextId) {
        const maxId = Math.max(...existingData.map(item => item.id))
        wx.setStorageSync('nextId', maxId + 1)
      }
    }
  }
})

