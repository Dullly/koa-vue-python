# -*- coding: UTF-8 -*-
# @Time	 	: 2018年11月28日
# @Author   : jhaoliao、Corkyliu
# @Desc	 	: 此方法用于返回页面5个高频词，为了展示速度，剩余推荐词放在getPageKey处理
# @Param	: url需要查询的url

# 创建sanic蓝图
from sanic.response import json as sanjson
from sanic import Blueprint
# 导出引用关键词
bpGetPageData = Blueprint('getPageData')

import re
import json
import jieba
import requests
from lxml import etree

from ..getParticiple import index as getParticiple

# 公共发送HTTP请求时的HEAD信息，用于伪装为浏览器
Global_Heads = {  
	'Connection': 'Keep-Alive',
	'Accept': 'text/html, application/xhtml+xml, */*',
	'Accept-Language': 'en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3',
	'Accept-Encoding': 'gzip, deflate',
	'User-Agent': 'Mozilla/6.1 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko'
}


def _GetPageInfo(url):
	res = requests.get(url,headers=Global_Heads)
	res.encoding = 'utf-8'
	# 根节点
	html = etree.HTML(res.content)
	title = html.xpath('//title/text()')
	p = html.xpath('//body//*/text()')

	description = html.xpath('/html/head/meta[@name="description"]/@content')
	keywords = html.xpath('/html/head/meta[@name="keywords"]/@content')

	p = getParticiple.search(p)
	keywords = getParticiple.search(keywords)
	description = getParticiple.search(description)

	bodyStr = p + description + keywords


	# 查询出现频率高的算法
	obj = {}
	for i in bodyStr:
		if i not in obj:
			obj[i] = 1
		else:
			obj[i] += 1
	Obj = sorted(obj.items(),key = lambda x:x[1],reverse = True)
	# 保留五个出现最多的词
	sort_FF = []
	for index, val in enumerate(Obj):
		if(index<5):
			dict1 = dict(zip(['name'],[val[0]]))
			dict2 = dict(zip(['rank'],[val[1]]))
			dictMerged=dict(dict1)
			dictMerged.update(dict2)
			sort_FF.append(dictMerged['name'])
		else:
			break

	# 去重
	bodyStr = list(set(bodyStr))
	# 返回信息组装
	bodyStr = ','.join(bodyStr).split(',')
	title = ','.join(title)
	keywords = ','.join(keywords).split(',')
	description = ','.join(description)

	pageInfo = {
		'keywords': keywords,
		'title': title,
		'description': description,
		'body': bodyStr,
		'top': sort_FF,
	}

	return pageInfo


def search(url):
	return _GetPageInfo(url)

# 后台route
@bpGetPageData.route('/python/getPageData')
async def bpGetPageData_root(request):
	# 分解参数
	request = request.args
	url = request["url"][0]
	result = search(url)
	
	return sanjson(result)