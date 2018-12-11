// 后台路由配置
const Router = require('koa-router')
const router = new Router()
const SeoController = require('./api/seo')


// 获取文章详情接口（路由）
router.get('/api/seo/', SeoController.findSeo)

module.exports = router