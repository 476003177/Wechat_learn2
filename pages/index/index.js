// pages/index/index.js
var bmap = require('../../libs/bmap-wx/bmap-wx.min.js');
var wxMarkerData = [];	//定位成功回调对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ak:"pmXnsrkVKvIY9EVug7RPYOoxUhT2pjS1",	//百度地图的ak
    region:["北京市","北京市","东城区"],
    now:{cond_code:"100"},//先预设一个值，避免报错图片读取错误
    location: ""
  },
  changeRegion:function(e){
    this.setData({
      region:e.detail.value
    }),
    this.getWeather();//更新天气
  },

  getWeather:function(){
    // 和风天气api接口文档：https://dev.heweather.com/docs/api/weather
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
        that.setData({
          now: res.data.HeWeather6[0].now,
        })
        // console.log(that.data.now)
      }
    })
  },

  getcity_fromlocat: function(){
    var that = this;
    // 异步转同步处理
    var p = new Promise(function(resolve, reject) {
      /* 获取定位地理位置 */
      // 新建bmap对象 
      var BMap = new bmap.BMapWX({ 
          ak: that.data.ak 
      }); 
      var fail = function(data) { 
          console.log(data);
          reject("调用百度api失败");
      }; 
      var success = function(data) { 
          //返回数据内，已经包含经纬度
          // console.log(data);
          //使用wxMarkerData获取数据
          wxMarkerData = data.wxMarkerData;  
          //获取城市数据
          var cityinfo = data.originalData.result.addressComponent;  
          
          //把所有数据放在初始化data内
          that.setData({ 
            region: [cityinfo["province"], cityinfo["city"], cityinfo["district"]]
          }); 
          resolve("调用百度api成功");
      } 
      // 发起regeocoding检索请求 
      BMap.regeocoding({ 
          fail: fail, 
          success: success
      });
    });
    return p
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取经纬度，需要获取用户授权，即在app.json中加入permission内容
    // var that = this
    // wx.getLocation({
    //   success:function(res){
    //     console.log(res.latitude, res.longitude)
    //     var locat = res.latitude.toString() + "," + res.longitude.toString()//将经纬度拼接成字符串，便于和风天气传参
    //     that.data.location = locat
    //   },
    // })

    // 页面一加载就调用百度地图api更新地址，并调用getWeather更新天气数据
    // 百度地图指南：https://lbs.baidu.com/index.php?title=wxjsapi/guide/helloworld
    this.getcity_fromlocat().then(this.getWeather);//同步处理，先执行完getcity_fromlocat再执行getWeather
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