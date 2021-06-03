import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'
interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))
class httpRequest {
    baseOptions(params, method = "GET") {
        let { url, data } = params;
        const BASE_URL = getBaseUrl();
        let contentType = "application/x-www-form-urlencoded";
        contentType = params.contentType || contentType;
        return new Promise(resolve => {
            Taro.request({
                url: BASE_URL + url,
                data: data,
                method: method,
                header: {
                    'content-type': contentType,
                    'cookie': Taro.getStorageSync('cookie'),
                    'Authorization': Taro.getStorageSync('Authorization')
                },
                success: function(res){
                    resolve(res.data)
                },
                fail: function (msg) {
                    wx.showToast({title:'接口调用失败',icon:'none'})
                }
            });
        })
    }
    get(url, data = "") {
        let option = { url, data };
        return this.baseOptions(option);
    }
    post(url, data, contentType) {
        let params = { url, data, contentType };
        return this.baseOptions(params, "POST");
    }
    put(url, data = "") {
        let option = { url, data };
        return this.baseOptions(option, "PUT");
    }
    delete(url, data = "") {
        let option = { url, data };
        return this.baseOptions(option, "DELETE");
    }
}

export default new httpRequest()