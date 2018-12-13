## 此处防止python脚本

#### py脚本有两种调用方式
1. 通过child_process——子进程的方式调用
+ 引入python/index.js
+ 使用python3 XXX.py -p params -p params的方式调用传值
+ 结果通过stdout——shell输出框的值进行返回

```python

def search(args):
	params = getArgs.getArgs(args)
	longKeyList = json.loads(params[0])
	limitNum = int(params[1])

		
	print(json.dumps(NEWS,ensure_ascii=False))
	# 缓冲区，用于多线程调用返回
    # sys.stdout.flush()

search(sys.argv)
```

`优点：`
+ 方便，快速
+ 不用另起python服务

`缺点：`
+ 每次调用都是重新运行一个python文件，对于NLP或其他需要预载入的接口来说，耗时长

2. 通过服务器间数据交换调用
+ 启动服务：python3 server/python/server.py

`优点：`
+ 省时间，中间层处理的很好
`缺点：`
+ 引入了sanic第三方python服务
+ 蓝图等写法需要熟悉时间