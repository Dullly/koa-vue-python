// 后台路由配置
const Router = require('koa-router')
const router = new Router()

const getKeyIndex = require('./api/getKeyIndex')
const getKeyLong = require('./api/getKeyLong')
const getNews = require('./api/getNews')
const getParticiple = require('./api/getParticiple')


// 指数查询
router.get('/api/seo/getKeyIndex', getKeyIndex.findKeyIndex)
// 长尾词查询
router.get('/api/seo/getKeyLong', getKeyLong.findKeyLong)
// 分词查询
router.get('/api/seo/getParticiple', getParticiple.findParticiple)
router.get('/api/seo/getNews', getNews.findNews)

module.exports = router