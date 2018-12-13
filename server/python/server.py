from sanic import Sanic
from getNews import bpGetNews
from getQa import bpGetQa


app = Sanic(__name__)

# 新闻接口
app.blueprint(bpGetNews)
# 问答接口
app.blueprint(bpGetQa)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3002, debug=True)

