const SeoModel = require('../../modules/seo')

class getBpso {
    /**
     * 根据关键词，查询百度竞价数据库
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async find(ctx) {
        let result;

        // 如果是KeyName，则为单查询
        if(ctx.request.query['KeyName']){
            let KeyName = ctx.request.query['KeyName'];
            // 单查询
            result = await SeoModel.SfindBpsoKey(KeyName);
            return result;
        }
        // 如果是KeyList，则为批量查询
        else if(ctx.request.query['KeyList']){
            let KeyList = ctx.request.query['KeyList'];
            KeyList = JSON.parse(KeyList);
            // 多查询
            result = await SeoModel.MfindBpsoKey(KeyList);
            return result;
        }
        else{
            return false;
        }
    }
}

module.exports = getBpso