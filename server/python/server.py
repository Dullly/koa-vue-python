from sanic import Sanic
from sanic.response import json

import getNews


app = Sanic()

@app.route('/getNews')
async def getNews(request):
    print(request)
    print(os.getcwd())
    print(request.args)
    # print(getNews.search(["王者荣耀"],10))
    return json({'hello': 'world'})

@app.route('/getParticle')
async def getParticle(request):
    return json({'hello': '1111'})



if __name__ == "__main__":
    print(getNews.search(["王者荣耀"],10))
    # app.run(host="0.0.0.0", port=3002)

