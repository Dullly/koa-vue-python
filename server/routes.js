// 后台路由配置
const Router = require('koa-router')
const router = new Router()

// const getKeyIndex = require('./api/getKeyIndex')
// const getKeyLong = require('./api/getKeyLong')
// const getNews = require('./api/getNews')
// const getParticiple = require('./api/getParticiple')

const getNews = require('./api/getNews/index')
const getQa = require('./api/getQa/index')
const getParticiple = require('./api/getParticiple/index')
const getKeyIndex = require('./api/getKeyIndex/index')
const getKeyLong = require('./api/getKeyLong/index')


// 指数查询
// router.get('/api/getKeyIndex', getKeyIndex.findKeyIndex)
// 长尾词查询
// router.get('/api/getKeyLong', getKeyLong.findKeyLong)
// router.get('/api/getParticiple', getParticiple.findParticiple)

// 新闻接口
router.get('/api/getNews', getNews.find)
// Qa接口
router.get('/api/getQa', getQa.find)
// 指数查询
router.get('/api/getKeyIndex', getKeyIndex.find)
// 长尾词查询
router.get('/api/getKeyLong', getKeyLong.find)



// 分词查询
// 因为文本转以后字符数据会很长，get请求有长度限制，这里请求使用Post
router.post('/api/getParticiple', getParticiple.find)

module.exports = router