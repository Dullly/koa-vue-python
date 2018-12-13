from sanic import Sanic
from getNews import bpGetNews



app = Sanic(__name__)
app.blueprint(bpGetNews)

# @app.route('/getParticle')
# async def getParticle(request):
#     return json({'hello': '1111'})



if __name__ == "__main__":
    # print(app.bpGetNews.search(["王者荣耀"],10))
    app.run(host="0.0.0.0", port=3002, debug=True)

