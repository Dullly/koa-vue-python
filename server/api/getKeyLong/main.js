// 异步请求
const SeoModel = require('../../modules/seo')

class getKeyLong {
    /**
     * 获取长尾词
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async find(ctx) {
        var result = [];

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
            
            // 查询百度竞价相关信息，拿到关键词数组信息
            let bpsoData = await SeoModel.findBpsoKey(KeyList,false);
            // 查询百度竞价相关信息，拿到关键词数组信息
            let seoData = await SeoModel.findSeoKey(KeyList);
            
            
            bpsoData.forEach(ele => {
                result.push(ele["KeyWords"]);
            });
            seoData.forEach(ele => {
                result = result.concat(JSON.parse(ele["KeyLong"]));
            });
            // 去重
            result = [...new Set(result)]

            return result;
        }
        else{
            return false;
        }
    }   
}

module.exports = getKeyLong