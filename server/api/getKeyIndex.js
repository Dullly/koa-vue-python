const getBpso = require('./base/getBpso')

class getKeyIndex {
    /**
     * 按关键词获取数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async findKeyIndex(ctx) {
        try {
            let result = await getBpso.find(ctx)
            if(result){
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: 'success',
                    result: result,
                }
            }
            else{
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询错误',
                }
            }
            
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                err: err.message,
                msg: '其他错误',
            }
        }
    }
}

module.exports = getKeyIndex