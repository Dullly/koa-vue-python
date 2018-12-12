const SeoModel = require('../modules/seo')
//node调用pyhon
const PythonShell = require('../python/index')


class seoController {
    /**
     * 按关键词获取数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async findByKeyName(ctx,isArray=false) {
        let KeyName = ctx.request.query['KeyName'];

        if (KeyName) {
            try {
                // 查询
                if(isArray){
                    let data = await SeoModel.MfindSeoKey(KeyName);
                }else{
                    let data = await SeoModel.SfindSeoKey(KeyName);
                }
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                result: KeyName,
                msg: '其他错误'
            }
        }
    }
    /**
     * 获取指数等信息
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async MfindKeyIndex(ctx) {
        let KeyLists = ctx.request.query['KeyLists'];
        // 获取到关键词数组
        KeyLists = JSON.parse(KeyLists);
        // 如果关键词存在并且为数组
        if (KeyLists && Object.prototype.toString.call(KeyLists) === "[object Array]") {
            try {
                // 查询百度竞价相关信息，拿到关键词数组信息
                // let bpsoData = await SeoModel.MfindBpsoKey(KeyLists);
                // 查询百度竞价相关信息，拿到关键词数组信息
                // let seoData = await SeoModel.MfindSeoKey(KeyLists);
                
                var getNewsParams = {
                    "keylist":["绝地求生","绝地求生超级助手","绝地求生视频","pc版绝地求生","绝地求生吧","绝地求生刺激战场下载","绝地求生最欠揍的名字","绝地求生下载","绝地求生刺激战场","绝地求生全军出击","绝地求生国服","绝地求生 刺激战场","绝地求生直播","虎扑绝地求生"],
                    "num": 5
                }
                getNewsParams = JSON.stringify(getNewsParams)
                console.log(getNewsParams)
                console.log(Object.prototype.toString.call(getNewsParams))
                PythonShell.PythonShell("getNews.py",getNewsParams)


                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data: "1"
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '其他错误'
            }
        }
    }
}

module.exports = seoController