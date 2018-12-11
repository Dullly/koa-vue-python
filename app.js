const Koa = require('koa')
const logger = require('koa-logger')
const compress = require('koa-compress')
const historyApiFallback = require('koa2-history-api-fallback')
const bodyParser = require('koa-bodyparser')
const router = require('./server/routes')
const app = new Koa()
const cors = require('koa-cors')
app.use(cors()) //使用cors

app.use(logger())
app.use(bodyParser())
app.use(historyApiFallback())

// Gzip
const options = { threshold: 2048 };
app.use(compress(options));

app
  .use(router.routes())
  .use(router.allowedMethods())

app.on("error", async (err,ctx)=>{//捕获异常记录错误日志
	console.log(new Date(),":",err);
});

app.listen(3001, async () => {
	console.log('Koa is listening in 3001')
})

module.exports = app