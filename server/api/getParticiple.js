const GetParticiple = require('./base/getParticiple')

class getParticiple {
    /**
     * 按关键词获取数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async findParticiple(ctx) {
        try {
            let result = await GetParticiple.find(ctx)
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

module.exports = getParticiple