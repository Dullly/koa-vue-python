const SeoModel = require('../../modules/seo')
//node调用pyhon
const PythonShell = require('../../python/index')

const axios = require('axios');

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
			if(ctx.request.query['KeyName']){
				KeyList = JSON.stringify([ctx.request.query['KeyName']]);
			}
			else{
				KeyList = ctx.request.query['KeyList'];
			}
            result = await axios.get('http://0.0.0.0:3002/getQa',{
                params:{
                    KeyList: KeyList,
                    num: num
                }
            })
            result = result.data
            return new Promise((resolve) => {
                resolve(result)
            })
        }
        else{
            return false;
        }
    }
}

module.exports = getNews