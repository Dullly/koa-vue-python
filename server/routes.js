// 后台路由配置
const Router = require('koa-router')
const router = new Router()


/*
 *
 * POST请求,因为常常请求一大堆数据，get请求url长度有限制
 * 因为sanic与koa在底层responese返回不一致，所以python请求与node请求分开
 * 
 */
// 指数查询
const getKeyIndex = require('./api/getKeyIndex/index')
router.post('/api/getKeyIndex', getKeyIndex.find)

// 指数查询
const getKeyWeight = require('./api/getKeyWeight/index')
router.post('/api/getKeyWeight', getKeyWeight.find)

// 长尾词查询
const getKeyLong = require('./api/getKeyLong/index')
router.post('/api/getKeyLong', getKeyLong.find)



module.exports = router