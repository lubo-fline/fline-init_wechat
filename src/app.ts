import Vue from 'vue'
import './app.less'
import 'taro-ui-vue/dist/style/index.scss'
import Taro from '@tarojs/taro'
import httpRequest from './utils/http.js'
import api from './utils/api.js'
Vue.prototype.$Taro = Taro
Vue.prototype.$http = httpRequest
Vue.prototype.$api = api
const App = {
	data() {
		return {
			options: {}
		}
	},
	onShow(options) {
		wx.setScreenBrightness({
			value: 1,    //屏幕亮度值，范围 0~1，0 最暗，1 最亮
		})
		wx.getSystemInfo({
			success(res) {
				const { model } = res
				if (model.indexOf('iPhone X') != -1 || model.indexOf('iPhone XS Max') != -1 || model.indexOf('iPhone XR') != -1 || model.indexOf('iPhone 11') != -1 || model.indexOf('iPhone 12') != -1) {
					wx.setStorageSync('isPhone', true);
				} else {
					wx.setStorageSync('isPhone', false);
				}
			}
		})
		this.isUpdate()
	},
	methods: {
		isUpdate() {
			if (wx.canIUse('getUpdateManager')) {//判断当前微信版本是否支持版本更新
				const updateManager = wx.getUpdateManager();
				updateManager.onCheckForUpdate(function (res) {
					if (res.hasUpdate) { // 请求完新版本信息的回调
						updateManager.onUpdateReady(function () {
							wx.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success: function (res) {
									if (res.confirm) {// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate()
									}
								}
							})
						});
						updateManager.onUpdateFailed(function () {
							wx.showModal({// 新的版本下载失败
								title: '已经有新版本了哟~',
								content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
							})
						})
					}
				})
			} else {
				wx.showModal({// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
			}
		}
	},
	render(h) {
		return h('block', this.$slots.default)
	}
}

export default App
