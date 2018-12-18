<template>
	<div class="page-main-seo">
		<el-header :height="'240px'">
			<h1>AI for SEO 智能系统</h1>
			<!-- 搜索框 -->
			<div class="search-wrap">
				<el-input placeholder="请输入url" prefix-icon="el-icon-search" v-model="url"></el-input>
				<el-button type="primary" @click="search">立即分析</el-button>
			</div>
		</el-header>
		<el-main>
	
			<!-- 推荐价值关键词 -->
			<div class="mod mod-data-key">
				<h3 class="title">推荐价值关键词</h3>
				<div class="table-wrap">
					<el-table :data="dataKey" :show-header="false" :row-class-name="tableRowClassName">
						<!--  -->
						<el-table-column v-for="(tableItem,tableIndex) in dataKeyIndex" :key="tableIndex" :prop="tableItem" :min-width="'120px'" :fixed="tableIndex==0?true:false" :highlight-current-row="tableIndex==3?true:false" :align="'center'">
						</el-table-column>
					</el-table>
				</div>
			</div>
	
			<div class="mod-data-wrap">
				<div class="mod mod-data-page">
					<h3 class="title">站内热词以及推荐内容</h3>
					<div class="mod-cnt">
						<div class="data-page-info">
							<b>标题：</b>
							<p>{{mainPageData.title}}</p>
						</div>
						<div class="data-page-info">
							<b>关键词：</b>
							<p>{{mainPageData.keywords}}</p>
						</div>
						<div class="data-page-info">
							<b>描述：</b>
							<p>{{mainPageData.description}}</p>
						</div>
						<div class="data-page-info">
							<b>关键词：</b>
							<p>{{mainPageData.body}}</p>
						</div>
					</div>
				</div>
	
				<div class="mod mod-data-page">
					<h3 class="title">行业热词以及推荐内容</h3>
					<div class="mod-cnt">
						<p v-for="item in mainNewsLong">{{item}}</p>
					</div>
				</div>
	
				<div class="mod mod-data-page">
					<h3 class="title">新闻热搜推荐内容</h3>
					<div class="mod-cnt">
						<p v-for="item in mainNews">{{item}}</p>
					</div>
				</div>
	
				<div class="mod mod-data-page">
					<h3 class="title">热门问答推荐内容</h3>
					<div class="mod-cnt">
						<p v-for="item in mainQaLong">{{item}}</p>
					</div>
				</div>
	
			</div>
		</el-main>
	</div>
</template>

<script>
	import { $ajax } from '../../common/js/axios'
	
	export default {
		data() {
			const _this = this
			return {
				dataKey: [
					["王者荣耀", "绝地求生大逃杀", "堡垒之夜官网", "英雄杀官方网", "英雄联盟", "手游模拟器", "我的世界论坛", "梦工厂"],
					["114426", "1862", "803", 0, "72447", "1135", "324", "564"],
					[114, 86, 85, 91, 236, 100, 103, 106],
					[64.357, 39.716, 39.576, 38.625, 38.612, 37.784, 37.206, 36.891]
				],
				dataKeyIndex: [],	//最后展示时使用
				mainKeyLong: [],	//长尾词

				url: "https://egame.qq.com/5967374",	//待查询的url
				mainPageData: [],	//站内热门信息
				mainKeyWords: [],	//核心关键词
				mainNews: [],		//核心词查出来的新闻
				mainNewsLong: [],	//长尾词查出来的新闻
				mainQaLong: [],		//长尾词查出来的问答
	
			}
		},
		
		methods: {
			/**
			 * 处理逻辑
			 *  */
			// 点击立即分析，启动任务
			async search(){

				/** 
				 * 第一步，获取到站内内容
				*/
				// 请求getPageData接口
				let resPageData = await $ajax.post("/python/getPageData", {
					url: this.url,
				})
				// 主内容处理
				this.getMainPageData(resPageData)

				/** 
				 * 第二步，获取body中指数最高的5个关键词
				*/
				let resKeyIndex = await $ajax.post("/api/getKeyIndex", {
					KeyList: resPageData.body,
				})
				let _mainkeywords = this.getKeyIndex(resKeyIndex)

				/** 
				 * 第三步，获取核心关键词长尾词
				*/
				this.mainKeyLong = await $ajax.post("/api/getKeyLong", {
					KeyList: _mainkeywords,
				})
				// 获取核心词新闻
				this.mainNews = await $ajax.post("/python/getNews", {
					KeyList: _mainkeywords,
					num: 10
				})

				/** 
				 * 第四步，长尾词分词
				*/
				// 分词
				this.mainKeyLong = await $ajax.post("/python/getParticiple", {
					KeyList: this.mainKeyLong,
				})
				// 查热度
				this.mainKeyLong = await $ajax.post("/api/getKeyIndex", {
					KeyList: this.mainKeyLong,
				})
				this.getKeyIndexLong(this.mainKeyLong)
				
				// 长尾词新闻
				this.mainNewsLong = await $ajax.post("/python/getNews", {
					KeyList: this.mainKeyLong ,
					num: 2
				})
				// 长尾词问答
				this.mainQaLong = await $ajax.post("/python/getQa", {
					KeyList: this.mainKeyLong ,
					num: 2
				})
				
				this.getMainKeyIndex();

			},
			// 第一步，获取到站内内容
			getMainPageData:function(res){
				this.mainPageData = res;

				// 放入核心关键词里
				this.mainKeyWords = res.top.reduce(function(coll,item){
					coll.push(item);
					return coll;
				},this.mainKeyWords)

				// Tips
				this.$message({
					message: '页面主内容获取成功！',
					type: 'success',
					duration: 1000
				});
				
			},
			// 查询指数
			getKeyIndex:function(res){
				//按DavPv、MDayPv、Price依次排序
				res = this.sortData(res)
				// 截取前5个
				res = res.slice(0,5);

				// 放入核心关键词里
				this.mainKeyWords = res.reduce(function(coll,item){
					coll.push( item["KeyName"] );
					return coll;
				},this.mainKeyWords)

				return this.mainKeyWords;
					
			},
			getKeyIndexLong:function(res){
				//按DavPv、MDayPv、Price依次排序
				res = this.sortData(res)
				// 截取前20个
				res = res.slice(0,20);

				let keylist = [];
				res.forEach(ele=>{
					keylist.push(ele["KeyName"])
				})
				this.mainKeyLong = keylist;
			},
			getMainKeyIndex:function(){

			},
			/**
			 * 一些辅助方法
			 *  */
			// 提示刷新弹框
			errorTips:function(msg="请刷新重试！"){
				this.$alert( msg, '错误', {
					confirmButtonText: '确定',
				});
			},
			// 最后一行高亮
			tableRowClassName({row, rowIndex}) {
				if (rowIndex === 0) {
					return 'table-top';
				} else if (rowIndex === 3) {
					return 'table-bottom';
				}
				return '';
			},
			// 首先按照DayPv排序，其次按照MDayPv排序，最后按照Price排序，
			sortData:function(arr){
				let newArr = arr.sort(function(a,b){
					if(a.DayPv === b.DayPv){
						if(b.MDayPv === a.MDayPv){
							return a.Price - b.Price;
						}
						return b.MDayPv - a.MDayPv;
					}
					return b.DayPv - a.DayPv;
				})
				return newArr;
			},
			// 将后台返回后的数据重新处理，便于在前端显示
			filterDataKey() {
				var _tmpDataKey = [],
					dataKeyLen = 0,
					dataKeyTitle = ['关键词', '指数', '竞争程度', '总评分'];
				this.dataKey.forEach((ele, index) => {
					_tmpDataKey[index] = [];
					ele.forEach((_e, _i) => {
						var _tmpName = "table" + (_i + 1);
						dataKeyLen = Math.max(dataKeyLen, _i)
						_tmpDataKey[index][_tmpName] = String(_e);
					})
					_tmpDataKey[index]['table0'] = dataKeyTitle[index];
	
				});
	
				for (let i = 0; i < dataKeyLen + 2; i++) {
					this.dataKeyIndex[i] = "table" + i;
				}
				this.dataKey = _tmpDataKey;
			},
			

		},
		mounted() {
			
			this.search()
		},
		
	}
</script>

<style lang="scss">
	.page-main-seo {
		// 头部
		.search-wrap {
			margin-top: 60px;
			display: -webkit-box;
			-webkit-box-orient: horizontal;
			-webkit-box-pack: center;
			-webkit-box-align: center;
			.el-input {
				width: 500px;
				height: 42px;
			}
			.el-button {
				margin-left: 10px;
			}
		}
		// 主体部分
		.el-main {
			width: 94%;
			margin-left: auto;
			margin-right: auto;
		}
		.mod-data-key {
			margin-top: 15px;
		}
		// 表格
		.table-wrap {
			margin-top: 10px;
			text-align: center;
			color: #000;
			min-height: 150px;
			background-color: #fff;
			border: 1px solid #e1e1e1;
			td {
				padding-top: 8px;
				padding-bottom: 8px;
				min-width: 130px;
				&:first-child {
					font-weight: 700;
				}
			}
			.table-top {
				font-weight: 700;
				td {
					padding-top: 14px;
				}
			}
			.table-bottom {
				color: #239268;
				td {
					padding-bottom: 14px;
				}
			}
		}
		.mod-data-wrap {
			display: flex;
			margin-top: 30px;
			justify-content: space-between;
			.mod {
				width: 24%;
			}
		}
		.mod-cnt {
			box-sizing: border-box;
			padding: 15px;
			margin-top: 10px;
			height: 450px;
			border-radius: 3px;
			border: 1px solid #e1e1e1;
			background-color: #fff;
			overflow: scroll;
			p {
				margin-bottom: 10px;
			}
		}
		.data-page-info{
			b{
				font-size: 14px;
			}
		}
	}
</style>
