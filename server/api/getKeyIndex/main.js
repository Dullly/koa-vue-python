// 异步请求
const SeoModel = require('../../modules/seo')

class getKeyIndex {
    /**
     * 根据关键词，查询百度竞价数据库
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
				KeyList = [ctx.request.body['KeyName']];
            }
            // 多查询
			else{
				KeyList = ctx.request.body['KeyList'];
            }
            
            result = await SeoModel.findBpsoKey(KeyList);
            return result;
        }
        else{
            return false;
        }
    }
}

module.exports = getKeyIndex