// 后台路由配置
const Router = require('koa-router')
const router = new Router()


/*
 * get请求
 */
// 新闻接口
const getNews = require('./api/getNews/index')
router.get('/api/getNews', getNews.find)

// Qa接口
const getQa = require('./api/getQa/index')
router.get('/api/getQa', getQa.find)

// 指数查询
const getKeyIndex = require('./api/getKeyIndex/index')
router.get('/api/getKeyIndex', getKeyIndex.find)

// 长尾词查询
const getKeyLong = require('./api/getKeyLong/index')
router.get('/api/getKeyLong', getKeyLong.find)

// 获取页面信息
const getPageData = require('./api/getPageData/index')
router.get('/api/getPageData', getPageData.find)

/*
 * post请求
 */
// 分词查询
// 因为文本转以后字符数据会很长，get请求有长度限制，这里请求使用Post
const getParticiple = require('./api/getParticiple/index')
router.post('/api/getParticiple', getParticiple.find)

module.exports = router