// 异步请求
const SeoModel = require('../../modules/seo')

class getKeyLong {
    /**
     * 获取长尾词
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async find(ctx) {
        var result;

        // 如果是KeyName，则为单查询
        if(ctx.request.query['KeyName']){
            // 逻辑暂时没写
            return false;
        }
        // 如果是KeyList，则为批量查询
        else if(ctx.request.query['KeyList']){
            let KeyList = ctx.request.query['KeyList'];
            KeyList = JSON.parse(KeyList);
            
            // 查询百度竞价相关信息，拿到关键词数组信息
            let bpsoData = await SeoModel.MfindBpsoKey(KeyList,false);
            // 查询百度竞价相关信息，拿到关键词数组信息
            let seoData = await SeoModel.MfindSeoKey(KeyList);
            
            // 取长尾词
            let keyWords = [];
            bpsoData.forEach(ele => {
                keyWords.push(ele["KeyWords"]);
            });
            seoData.forEach(ele => {
                keyWords = keyWords.concat(JSON.parse(ele["KeyLong"]));
            });
            // 去重
            keyWords = [...new Set(keyWords)]

            return keyWords;
        }
        else{
            return false;
        }
    }   
}

module.exports = getKeyLong