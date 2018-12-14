// 后台路由配置
const Router = require('koa-router')
const router = new Router()

const getKeyIndex = require('./api/getKeyIndex')
const getKeyLong = require('./api/getKeyLong')
// const getNews = require('./api/getNews')
const getParticiple = require('./api/getParticiple')

const getNews = require('./api/getNews/index')
const getQa = require('./api/getQa/index')


// 指数查询
router.get('/api/getKeyIndex', getKeyIndex.findKeyIndex)
// 长尾词查询
router.get('/api/getKeyLong', getKeyLong.findKeyLong)
// 分词查询
router.get('/api/getParticiple', getParticiple.findParticiple)
// 新闻接口
router.get('/api/getNews', getNews.find)
router.get('/api/getQa', getQa.find)

module.exports = router