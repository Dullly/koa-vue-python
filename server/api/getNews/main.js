// 异步请求
const $ajax = require('../Global/js/axios');

class getNews {
    /**
     * 获取分词
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async find(ctx) {
        let result,
            num = ctx.request.query['num']?ctx.request.query['num']:20;

        // 如果是KeyName，则为单查询
        // 如果是KeyList，则为批量查询
        if(ctx.request.query['KeyName'] || ctx.request.query['KeyList']){
            let KeyList;
            // 单查询，将keyName封装为数组
			if(ctx.request.query['KeyName']){
				KeyList = JSON.stringify([ctx.request.query['KeyName']]);
            }
            // 多查询
			else{
				KeyList = ctx.request.query['KeyList'];
            }
            // 调用python接口
            let params = {
                KeyList: KeyList,
                num: num
            }
            result = await $ajax.get("getNews",params);
            return result;
        }
        else{
            return false;
        }
    }
}

module.exports = getNews