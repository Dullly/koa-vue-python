// 异步请求
const $ajax = require('../Global/js/axios');

class getParticiple {
    /**
     * 获取分词
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async find(ctx) {
        let result;
        // 如果是KeyName，则为单查询
        // 如果是KeyList，则为批量查询
        // post的参数在request.body，get的参数在request.query
        
        if(ctx.request.body['KeyName'] || ctx.request.body['KeyList']){
            let KeyList;
            // 单查询，将keyName封装为数组
			if(ctx.request.body['KeyName']){
				KeyList = JSON.stringify([ctx.request.body['KeyName']]);
            }
            // 多查询
			else{
				KeyList = ctx.request.body['KeyList'];
            }
            // 调用python接口
            let params = {
                KeyList: KeyList
            }
            result = await $ajax.post("getParticiple",params);
            return result;
        }
        else{
            return false;
        }
    }
}

module.exports = getParticiple