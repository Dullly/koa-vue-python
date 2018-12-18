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
        if(ctx.request.body['KeyName']){
            let KeyName = ctx.request.body['KeyName'];
            // 单查询
            result = await SeoModel.SfindSeoKey(KeyName);
            return result;
        }
        // 如果是KeyList，则为批量查询
        else if(ctx.request.body['KeyList']){
            let KeyList = ctx.request.body['KeyList'];
            KeyList = JSON.parse(KeyList);
            // 多查询
            result = await SeoModel.MfindSeoKey(KeyList);
            return result;
        }
        else{
            return false;
        }
    }
}

module.exports = getKeyIndex