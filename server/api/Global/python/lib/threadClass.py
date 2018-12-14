import threading,time
import traceback

# MyThread.py线程类
class MyThread(threading.Thread):
    def __init__(self, func, args=()):
        super(MyThread, self).__init__()
        self.func = func
        self.args = args
 
    def run(self):
        self.result = self.func(*self.args)
 
    def getResult(self):
        threading.Thread.join(self) # 等待线程执行完毕
        try:
            return self.result
        except Exception as e:
            return traceback.format_exc()