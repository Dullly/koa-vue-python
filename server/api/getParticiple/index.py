# -*- coding: UTF-8 -*-
# @Time	 	: 2018年12月03日
# @Author   : Corkyliu
# @Desc	 	: 此方法用于分词，使用自己维护的自定义词库
# @Param	: 词组
from sanic.response import json as sanjson
from sanic import Blueprint
bpGetParticiple = Blueprint('getParticiple')

import os
import sys
import json
import jieba
import jieba.posseg as pseg

# 自定义词典
jieba.load_userdict(os.getcwd() + "/server/api/Global/python/dict/userdict.txt")
def stopwordslist(filepath):
    stopwords = [line.strip() for line in open(filepath, 'r', encoding='utf-8').readlines()]
    return stopwords
stopwords = stopwordslist(os.getcwd() + "/server/api/Global/python/dict/stopwords.txt")

def _participleKey(key):
    res = pseg.lcut(key)
    result = []
    for item in res:
        if item.word not in stopwords and item.flag in ["x","n"] and len(item.word)>1:
            result.append(item.word)
    return result
    # return ["a"]

def _participle(KeyList):
    mainResult = []
    # 如果是数组
    if isinstance(KeyList,list):
        for item in KeyList:
            mainResult += _participleKey(item)
    elif isinstance(KeyList,str):
        mainResult += _participleKey(item)

    return mainResult

def _search(KeyList):
    res = _participle(KeyList)
    res = list(set(res))
    
    return res


@bpGetParticiple.route('/python/getParticiple',methods=['POST'])
async def bpGetParticiple_root(request):
	request = request.json
	KeyList = json.loads(request["KeyList"])
	res = _search(KeyList)
	return sanjson(res)