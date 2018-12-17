from sanic import Sanic
from api.getNews.index import bpGetNews
from api.getQa.index import bpGetQa
from api.getParticiple.index import bpGetParticiple
from api.getPageData.index import bpGetPageData


app = Sanic(__name__)

# 新闻接口
app.blueprint(bpGetNews)
# 问答接口
app.blueprint(bpGetQa)
# 分词接口
app.blueprint(bpGetParticiple)
# 获取主页接口
app.blueprint(bpGetPageData)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3002, debug=True)