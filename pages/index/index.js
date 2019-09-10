const url = require('../../api.js');
const md5 = require('../../utils/md5.js');
Page({
  data: {
    langList: [
      {
        text: '中文',
        code: 'zh'
      },
      {
        text: '英语',
        code: 'en'
      },
      {
        text: '法语',
        code: 'fra'
      },
      {
        text: '日语',
        code: 'jp'
      },
      {
        text: '韩语',
        code: 'kor'
      }

    ],
    columns: ['中文', '英语', '法语', '日语', '韩语'],
    fromLang: {
      text: '中文',
      code: 'zh'
    },
    toLang: {
      text: '英语',
      code: 'en'
    },
    origin: '',
    result: '',
  },
  //事件处理函数
  bindFromPickerChange: function(e) {
    let index = e.detail.value;
    this.setData({ fromLang: { text: this.data.langList[index].text, code: this.data.langList[index].code } });
  },
  bindToPickerChange: function(e) {
    let index = e.detail.value;
    this.setData({ toLang: { text: this.data.langList[index].text, code: this.data.langList[index].code } });
  },
  toggleLang: function() {
    const fromLang = this.data.fromLang;
    const toLang = this.data.toLang;
    this.setData({
      fromLang: toLang,
      toLang: fromLang
    })
  },
  reset: function() {
    this.setData({
      origin: '',
      result: '',
    });

  },
  changeOrigin: function(event) {
    let that = this;
    var inputOrigin = event.detail.value;
    that.setData({
      origin: inputOrigin
    })
  },
  confirm: function() {
    let that = this;
    if (that.data.origin != '') {
      const query = this.data.origin;
      const appid = '20190906000332391';
      const salt = (new Date).getTime();
      const key = 'KXC32wPdQ0SOip1h81XY';
      let sign = md5(appid + query + salt + key);
      my.request({
        url: url,
        dataType: 'jsonp',
        data: {
          from: that.data.fromLang.code,
          to: that.data.toLang.code,
          appid: appid,
          salt: salt,
          sign: sign,
          q: query
        },
        success: function(res) {
          let data = JSON.parse(res.data);
          that.setData({
            result: data.trans_result
          });
        }
      })
    } else {
      my.showToast({
        type: 'none',
        content: '请先输入内容',
        duration: 1000
      });
    }

  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
