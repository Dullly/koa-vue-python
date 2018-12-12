# -*- coding: UTF-8 -*-
# @Time		: 2018年11月28日
# @Author   : Corkyliu
# @Desc		: 此方法用于返回问答、新闻
# @Param	: longKeyList: Array 批量查询新闻和问答； 

import requests
import sys
import os
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
# 公共的截断数额，新闻、问答都截取前两条
Global_Intercept_Num = 2

# 将父级目录加入库，好引用Lib下的文件
lib_path = os.path.abspath(os.path.join('..'))
sys.path.append(lib_path)
# 引入多线程脚本
from lib import ThreadClass

# 搜索热门问题
def _SingleGetQa(key):

	url = 'https://zhidao.baidu.com/search?word='+key+'&lm=0&site=-1&sites=0&date=3'
	res = requests.get(url, headers=Global_Heads, verify=False, timeout=10)
	res.encoding = 'utf-8'
	# 根节点
	root = etree.HTML(res.content)
	# 搜索正文
	wgt_list = root.xpath("//div[@id='wgt-list']/dl")
	# 问题集合
	qsLit = []
	for index in range(len(wgt_list)):
		ques = root.xpath(
			"//div[@id='wgt-list']/dl["+str(index+1)+"]/dt/a//text()")
		res = ''.join(ques)
		qsLit.append(res)

	# 截取前 Global_Intercept_Num条
	qsLit = qsLit[0:Global_Intercept_Num]
	return qsLit

def _MultiGetKey(keyList,isFull):
	res = []
	for item in keyList:
		news = _SingleGetNews(item, isFull)
		res = res + news
	return res
		
# 搜索热门新闻
def _SingleGetNews(key, isFull):
	url = "http://news.baidu.com/ns?word="+key + "&tn=newstitle&from=news&cl=2&rn=20&ct=0"
	res = requests.get(url, headers=Global_Heads, verify=False, timeout=10)
	res.encoding = 'utf-8'
	# 根节点
	root = etree.HTML(res.content)
	# 搜索正文
	wgt_list = root.xpath(
		"//div[@id='content_left']//div[@class='result title']")
	newsList = []
	for index in range(len(wgt_list)):
		news = root.xpath(
			"//div[@id='content_left']//div[@id="+str(index+1)+"]/h3/a//text()")
		res = ''.join(news)
		newsList.append(clean(res))

	# 如果需要截取
	if isFull:
		pass
	else:
		# 截取前 Global_Intercept_Num条
		newsList = newsList[0:Global_Intercept_Num]

	return newsList

# 查询新闻+问答，因为多线程不能开太多，所以这里只能这样


def _newsAndQa(keyList):
	res = []
	for item in keyList:
		Qa = _SingleGetQa(item)
		indus = _SingleGetNews(item, False)
		res.append({"indus": indus, "qa": Qa})
	return res


def clean(str):
	return str.replace('\\n', '').strip()

def search(longKeyList):
	# 热门问答
	QA = []
	# 行业相关
	Industry = []
	# 核心词的相关新闻
	NEWS = []

	# 多线程
	threadList = []
	thrs = []
	tmpNewsAndQa = []
	# 多线程无法开太多，为了速度只能分组处理
	tmpLongKeysStep = 5  # 每组5个关键词
	tmpLongKeys = [longKeyList[i:i+tmpLongKeysStep]
	for i in range(0, len(longKeyList), tmpLongKeysStep)]

	# print('多线程开始 time:'+time.asctime( time.localtime(time.time())))
	for index in range(len(tmpLongKeys)):
		th = ThreadClass.MyThread(_newsAndQa, (tmpLongKeys[index],))
		th.start()
		thrs.append(th)

	for index in range(len(thrs)):
		newsAndQa = thrs[index].get_result()
		tmpNewsAndQa = tmpNewsAndQa + newsAndQa
	# print('多线程结束 time:'+time.asctime( time.localtime(time.time())))

	# 组装
	for item in tmpNewsAndQa:
		indus = item["indus"]
		qa = item["qa"]

		Industry = Industry + indus
		QA = QA + qa

	return QA, Industry

def getNews(longKeyList,isFull=True):
	NEWS = []

	# 多线程
	threadList = []
	thrs = []
	# 多线程无法开太多，为了速度只能分组处理
	tmpLongKeysStep = 3  # 每组3个关键词
	tmpLongKeys = [longKeyList[i:i+tmpLongKeysStep]
	for i in range(0, len(longKeyList), tmpLongKeysStep)]

	for index in range(len(tmpLongKeys)):
		th = ThreadClass.MyThread(_MultiGetKey, (tmpLongKeys[index],isFull,))
		th.start()
		thrs.append(th)

	for index in range(len(thrs)):
		newsAndQa = thrs[index].get_result()
		NEWS = NEWS + newsAndQa
		
	return NEWS
