// 异步请求
const $ajax = require('../Global/js/axios');

class getPageData {
    /**
     * 获取分词
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async find(ctx) {
        let result,
            url = ctx.request.query['url'];
            
        // post的参数在request.body，get的参数在request.query
        if(url){
            // 调用python接口
            let params = {
                url: url,
            }
            result = await $ajax.get("getPageData",params);
            return result;
        }
        else{
            return false;
        }
    }
}

module.exports = getPageData