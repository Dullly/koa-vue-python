const SeoModel = require('../../modules/seo')
//node调用pyhon
const PythonShell = require('../../python/index')

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
        if(ctx.request.query['KeyName']){
            let KeyName = JSON.stringify([ctx.request.query['KeyName']]);

            result = await PythonShell.PythonShell("getNews.py",[KeyName,num])
            result = result.replace(/\n[\s| | ]*\r/g,'\n');
            console.log("----------------------")
            console.log(result)

            return result;
        }
        // 如果是KeyList，则为批量查询
        else if(ctx.request.query['KeyList']){
            let KeyList = ctx.request.query['KeyList'];

            result = PythonShell.PythonShell("getNews.py",[KeyList,num])
            // console.log(news)

            return result;
        }
        else{
            return false;
        }
    }
}

module.exports = getNews