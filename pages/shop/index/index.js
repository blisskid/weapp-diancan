/**

 *
 * @link http://shop129578844.taobao.com
 * @author Dream网络
 */

var Bmob = require('../../../utils/bmob.js');
var that;
Page({
	onLoad: function () {
		that = this;
	},
	checkout: function () {
		var user = Bmob.User.current();
		console.log(user);
		var openId = Bmob.User.current().get('authData').weapp.openid;
		// console.log(openId);
		//传参数金额，名称，描述,openid
	    Bmob.Pay.wechatPay(0.01, '名称1', '描述', openId).then(function (resp) {
	      console.log('resp');
	      console.log(resp);

	      that.setData({
	        loading: true,
	        dataInfo: resp
	      })

	      //服务端返回成功
	      var timeStamp = resp.timestamp,
	        nonceStr = resp.noncestr,
	        packages = resp.package,
	        orderId = resp.out_trade_no,//订单号，如需保存请建表保存。
	        sign = resp.sign;

	      //打印订单号
	      console.log(orderId);

	      //发起支付
	      wx.requestPayment({
	        'timeStamp': timeStamp,
	        'nonceStr': nonceStr,
	        'package': packages,
	        'signType': 'MD5',
	        'paySign': sign,
	        'success': function (res) {
	          //付款成功,这里可以写你的业务代码
	          console.log(res);
	        },
	        'fail': function (res) {
	          //付款失败
	          console.log('付款失败');
	          console.log(res);
	        }
	      })

	    }, function (err) {
	      console.log('服务端返回失败');
	      console.log(err.message);
	      // common.showTip(err.message, 'loading',{},6000);
	      console.log(err);
	    });
	}
})