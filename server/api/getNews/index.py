# -*- coding: UTF-8 -*-
# @Time		: 2018年11月28日
# @Author   : Corkyliu
# @Desc		: 此方法用于返回问答、新闻
# @Param	: longKeyList: Array 批量查询新闻； 

# 创建sanic蓝图
from sanic.response import json as sanjson
from sanic import Blueprint
# 导出引用关键词
bpGetNews = Blueprint('getNews')

import requests
import sys
import os
import json
from lxml import etree
import urllib3
urllib3.disable_warnings()

# 公共发送HTTP请求时的HEAD信息，用于伪装为浏览器
Global_Heads = {
	'Connection': 'Keep-Alive',
	'Accept': 'text/html, application/xhtml+xml, */*',
	'Accept-Language': 'en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3',
	'Accept-Encoding': 'gzip, deflate',
	'User-Agent': 'Mozilla/6.1 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko'
}

# 引入多线程脚本
from ..Global.python.lib import threadClass

def _MultiGetKey(keyList,limitNum):
	res = []
	for item in keyList:
		news = _SingleGetNews(item, limitNum)
		res = res + news
	return res
		
# 搜索热门新闻
def _SingleGetNews(key, limitNum):
	url = "http://news.baidu.com/ns?word="+ key + "&tn=newstitle&from=news&cl=2&rn=20&ct=0"
	res = requests.get(url, headers=Global_Heads, verify=False, timeout=10)
	res.encoding = 'utf-8'
	# 根节点
	root = etree.HTML(res.content)
	# 搜索正文
	wgt_list = root.xpath("//div[@id='content_left']//div[@class='result title']")
	newsList = []
	for index in range(len(wgt_list)):
		news = root.xpath(
			"//div[@id='content_left']//div[@id="+str(index+1)+"]/h3/a//text()")
		res = ''.join(news)
		newsList.append(_clean(res))

	# 截取
	newsList = newsList[0:limitNum]

	return newsList


def _clean(str):
	return str.replace('\\n', '').strip()

def _search(longKeyList,limitNum):
	NEWS = []
	# 多线程
	threadList = []
	thrs = []
	# 多线程无法开太多，为了速度只能分组处理
	tmpLongKeysStep = 3  # 每组3个关键词
	tmpLongKeys = [longKeyList[i:i+tmpLongKeysStep]for i in range(0, len(longKeyList), tmpLongKeysStep)]

	for index in range(len(tmpLongKeys)):
		th = threadClass.MyThread(_MultiGetKey, (tmpLongKeys[index],limitNum,))
		th.start()
		thrs.append(th)

	for index in range(len(thrs)):
		newsAndQa = thrs[index].getResult()
		NEWS = NEWS + newsAndQa
	return NEWS

# 做一层code中转，这样前端可以直接调python接口，不用经过Node层，直接拿到数据
def main(KeyList,num):
	try:
		news = _search(KeyList,num)
		result = {
			"code": 200,
			"msg": "success",
			"result": news
		}
	except:
		result = {
			"code": 412,
			"msg": "爬虫错误",
		}
	return result

# 后台route
@bpGetNews.route('/python/getNews')
async def bpGetNews_root(request):
	# 分解参数
	request = request.args
	KeyList = json.loads(request["KeyList"][0])
	num = int(request["num"][0])
	result = main(KeyList,num)
	
	return sanjson(result)