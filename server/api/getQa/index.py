# -*- coding: UTF-8 -*-
# @Time		: 2018年11月28日
# @Author   : Corkyliu
# @Desc		: 此方法用于返回问答、新闻
# @Param	: longKeyList: Array 批量查询新闻和问答； 
from sanic.response import json as sanjson
from sanic import Blueprint
bpGetQa = Blueprint('getQa')

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

# 搜索热门问题
def _SingleGetQa(key,limitNum):

	# url = 'https://zhidao.baidu.com/search?word='++'&lm=0&site=-1&sites=0&date=3'
	url = 'https://zhidao.baidu.com/search?lm=0&rn=10&pn=0&fr=search&ie=gbk&word=' + key
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
	qsLit = qsLit[0:limitNum]
	return qsLit

def _MultiGetKey(keyList,limitNum):
	res = []
	for item in keyList:
		news = _SingleGetQa(item, limitNum)
		res = res + news
	return res


def clean(str):
	return str.replace('\\n', '').strip()

def _search(longKeyList,limitNum):

	NEWS = []
	# 多线程
	threadList = []
	thrs = []
	# 多线程无法开太多，为了速度只能分组处理
	tmpLongKeysStep = 6  # 每组3个关键词
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
def search(KeyList,num):

	return _search(KeyList,num)

@bpGetQa.route('/python/getQa',methods=['POST'])
async def bpGetQa_root(request):
	request = request.json
	KeyList = request["KeyList"]
	num = int(request["num"])
	result = search(KeyList,num)
	
	return sanjson(result)
