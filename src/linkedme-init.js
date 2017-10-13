// import $ from 'zepto'
// import 'bc-zepto-touch'

let linkedme_key = "1a5f1dd4e88218c23185dcc659f4ddcf";
let initData = {};
initData.type = "test"; //表示现在使用线上模式,如果填写"test", 表示测试模式.

let lkme = {
  init: function () {
    linkedme.init(linkedme_key, initData, function (err, response) {
      if (err) {
        // 初始化失败，返回错误对象err
        console.log(err);
      } else {
        // 初始化成功，可以不做处理
        console.log("初始化成功");
      }
    });

  },
  depth:
    function (value1, value2, value3, value4) {
      //深度链接

      var data = {};
      data.type = "test"; //表示现在使用线上模式,如果填写"test", 表示测试模式.【可选】
      data.feature = "功能名称"; // 自定义深度链接功能，多个名称用逗号分隔，【可选】
      data.stage = "阶段名称"; // 自定义深度链接阶段，多个名称用逗号分隔，【可选】
      data.channel = "渠道名称"; // 自定义深度链接渠道，多个名称用逗号分隔，【可选】
      data.tags = "标签名称"; // 自定义深度链接标签，多个名称用逗号分隔，【可选】
      data.ios_custom_url = ""; // 自定义iOS平台下App的下载地址，如果是AppStore的下载地址可以不用填写，【可选】
      data.ios_direct_open = ""; //未安装情况下，设置为true为直接打开ios_custom_url，默认为false【可选】
      data.android_custom_url = ""; // 自定义安卓平台下App的下载地址，【可选】
      data.android_direct_open = ""; //设置为true，所有情况下跳转android_custom_url，默认为false【可选】
// 下面是自定义深度链接参数，用户点击深度链接打开app之后，params的参数会通过LinkedME服务器透传给app，由app根据参数进行相关跳转
// 例如：详情页面的参数，写入到params中，这样在唤起app并获取参数后app根据参数跳转到详情页面
//       var value1 = 1;
//       var value2 = 2;
//       console.log(value1)
//       console.log(value2)
//       var value1 = 6010;
//       var value2 = 129061;
//       var value3 = 1;
//       var value4 = 4;
      data.params = '{"period":"' + value1 +
        '","link_id":"' + value2 +
        '","is_display":"' + value3 +
        '","content_type":"' + value4 + '"}'; //注意单引号和双引号的位置
      console.log(data.params);

      let responseLink = null;
      linkedme.link(
        data,
        function (err, response) {
          if (err) {
            // 生成深度链接失败，返回错误对象err
            console.log(err);
            responseLink = null;
          } else {
            // 生成深度链接成功，深度链接可以通过data.url得到
            if (response.url) {
              console.log(response.url);
              responseLink = response.url;
              $("#newspaper-subscibe").data("link", response.url)
            }
          }
        },
        false
      );
      return responseLink
    }

};
export default lkme