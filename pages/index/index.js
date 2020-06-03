// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:["广东省","佛山市","顺德区"],
    now:{cond_code:"100"}//先预设一个值，避免报错图片读取错误
  },
  changeRegion:function(e){
    this.setData({
      region:e.detail.value
    }),
    this.getWeather();//更新天气
  },
  getWeather:function(){
    var that=this;//this不可以直接在微信api函数内部使用
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data: {
        //自动填补url为"https://free-api.heweather.net/s6/weather/now?location=that.data.region[1]&key=d02f0bf029e24d8a9fca718ac469a62c"
        location:that.data.region[1],
        key:"d02f0bf029e24d8a9fca718ac469a62c"
      },
      success:function(res){
        console.log(res.data);//如果执行getWeather成功就返回到控制台
        that.setData({ now: res.data.HeWeather6[0].now})
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取经纬度，需要获取用户授权，即在app.json中加入permission内容
    wx.getLocation({
      success:function(res){
        console.log(res.latitude, res.longitude)
      },
    })
    this.getWeather();//页面一加载就调用getWeather
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})