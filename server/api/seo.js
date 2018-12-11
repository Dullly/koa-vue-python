const SeoModel = require('../modules/seo')

class seoController {
    /**
     * 获取文章详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async findByKeyName(ctx) {
        let KeyName = ctx.request.query['KeyName'];

        if (KeyName) {
            try {
                // 查询
                let data = await SeoModel.findByKeyName(KeyName);
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
     * 获取文章详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async MfindKeyIndex(ctx) {
        let KeyLists = ctx.request.query['KeyLists'];
        KeyLists = JSON.parse(KeyLists);
        if (KeyLists) {
            try {
                // 查询
                let data = await SeoModel.MfindBpsoKey(KeyLists);
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
                msg: '其他错误'
            }
        }
    }
}

module.exports = seoController