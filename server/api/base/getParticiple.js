const SeoModel = require('../../modules/seo')
//node调用pyhon
const PythonShell = require('../../python/index')

class getParticiple {
    /**
     * 获取分词
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async find(ctx) {
        let result;

        // 如果是KeyName，则为单查询
        if(ctx.request.query['KeyName']){
            let KeyName = ctx.request.query['KeyName'];
            let num = ctx.request.query['num']?ctx.request.query['num']:20;

            let news = PythonShell.PythonShell("getNews.py",[KeyName,num])
            // console.log(news)

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

module.exports = getParticiple