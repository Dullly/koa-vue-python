<template>
	<div class="page-main-seo">
		<el-header :height="'240px'">
			<h1>AI for SEO 智能系统</h1>
			<!-- 搜索框 -->
			<div class="search-wrap">
				<el-input placeholder="请输入url" prefix-icon="el-icon-search"></el-input>
				<el-button type="primary">立即分析</el-button>
			</div>
			<div class="search-state">
				<p>aaaa</p>
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
						<p>魔法少女 星之守护者- 英雄联盟官方网站 - 腾讯游戏</p>
						<p>在英雄联盟宇宙设定中瑞兹是最强的吗</p>
						<p>谁知道王者荣耀这些符号怎么打？</p>
						<p>王者荣耀 爱心字符 怎么打 如图</p>
						<p>英雄联盟官网 上方的渐变黑是怎么做到的</p>
						<p>玩英雄联盟卡怎么回事在线等。</p>
						<p>堡垒之夜法塔里在哪里</p>
						<p>wegame下载堡垒之夜说磁盘不足怎么办</p>
						<p>英雄联盟不会出装。在网吧里有英雄联盟助手。可以...</p>
						<p>LOL助手出现问题.打开Wg软件压根不显示LOL的任何信...</p>
						<p>上海东方梦工厂文化传播有限公司怎么样？</p>
						<p>上海东方梦工厂影视技术有限公司怎么样？</p>
						<p>我的世界一周年村庄种子</p>
						<p>求我的世界好的地图种子。</p>
						<p>堡垒之夜为什么会出现这种问题</p>
						<p>堡垒之夜登陆出现这个。怎么办?</p>
						<p>王者荣耀:英雄百变大赛不看走保啦</p>
						<p>王者荣耀:大神眼中上分最容易的英雄,不是李白,而是图5</p>
						<p>感恩节送大礼,十大永久英雄任你选-王者荣耀官方网...</p>
						<p>【超级赛事月】活动开启倒计时,最终豪礼勿忘兑换 -...</p>
						<p>S8LOL总决赛电脑什么配置</p>
						<p>英雄联盟theshyS8总决赛第二场玩的什么英雄</p>
						<p>堡垒之夜手机版怎么进不去，要求都达到了</p>
						<p>我问下堡垒之夜官网我的礼包在哪</p>
						<p>做王者荣耀主播，那个直播平台好，就是那个平台多...</p>
						<p>王者荣耀投屏直播 这图里的配置可以吗？？家里网速...</p>
						<p>S8LOL总决赛电脑什么配置</p>
						<p>lols8赛季奖励在哪领</p>
						<p>vivo怎样下载堡垒之夜？</p>
						<p>堡垒之夜手机版怎么进不去，要求都达到了</p>
						<p>英雄联盟中国战队ig夺得得全球总冠军引全国网友沸...</p>
						<p>LOL IG战队属于那个国家的?基地在哪里?听说都是韩...</p>
						<p>王者荣耀里的CP英雄组团pk，哪组CP最为强势</p>
						<p>王者荣耀：有很多隐藏的CP英雄你知道吗</p>
						<p>王者荣耀时为什么总被团灭 来看看你的队友吧</p>
						<p>这算是王者荣耀战歌mv吧</p>
						<p>运营团队招聘专题-英雄联盟官方网站-腾讯游戏</p>
						<p>掌上英雄联盟 - 英雄联盟官方网站 - 腾讯游戏</p>
						<p>王者荣耀出了个什么新英雄</p>
						<p>【王者荣耀】新英雄介绍:元歌</p>
						<p>英雄联盟转区</p>
						<p>英雄联盟转区维护到什么时候？</p>
						<p>绝地求生延迟得厉害</p>
						<p>绝地求生25battleye please perform a clean game ...</p>
						<p>堡垒之夜手游体验服礼包哪里有 海量礼包等你拿</p>
						<p>堡垒之夜手游标准皮肤怎么获得 标准服装获取介绍</p>
					</div>
				</div>
	
				<div class="mod mod-data-page">
					<h3 class="title">行业热词以及推荐内容</h3>
					<div class="mod-cnt">
						<p>魔法少女 星之守护者- 英雄联盟官方网站 - 腾讯游戏</p>
						<p>在英雄联盟宇宙设定中瑞兹是最强的吗</p>
						<p>谁知道王者荣耀这些符号怎么打？</p>
						<p>王者荣耀 爱心字符 怎么打 如图</p>
						<p>英雄联盟官网 上方的渐变黑是怎么做到的</p>
						<p>玩英雄联盟卡怎么回事在线等。</p>
						<p>堡垒之夜法塔里在哪里</p>
						<p>wegame下载堡垒之夜说磁盘不足怎么办</p>
						<p>英雄联盟不会出装。在网吧里有英雄联盟助手。可以...</p>
						<p>LOL助手出现问题.打开Wg软件压根不显示LOL的任何信...</p>
						<p>上海东方梦工厂文化传播有限公司怎么样？</p>
						<p>上海东方梦工厂影视技术有限公司怎么样？</p>
						<p>我的世界一周年村庄种子</p>
						<p>求我的世界好的地图种子。</p>
						<p>堡垒之夜为什么会出现这种问题</p>
						<p>堡垒之夜登陆出现这个。怎么办?</p>
						<p>王者荣耀:英雄百变大赛不看走保啦</p>
						<p>王者荣耀:大神眼中上分最容易的英雄,不是李白,而是图5</p>
						<p>感恩节送大礼,十大永久英雄任你选-王者荣耀官方网...</p>
						<p>【超级赛事月】活动开启倒计时,最终豪礼勿忘兑换 -...</p>
						<p>S8LOL总决赛电脑什么配置</p>
						<p>英雄联盟theshyS8总决赛第二场玩的什么英雄</p>
						<p>堡垒之夜手机版怎么进不去，要求都达到了</p>
						<p>我问下堡垒之夜官网我的礼包在哪</p>
						<p>做王者荣耀主播，那个直播平台好，就是那个平台多...</p>
						<p>王者荣耀投屏直播 这图里的配置可以吗？？家里网速...</p>
						<p>S8LOL总决赛电脑什么配置</p>
						<p>lols8赛季奖励在哪领</p>
						<p>vivo怎样下载堡垒之夜？</p>
						<p>堡垒之夜手机版怎么进不去，要求都达到了</p>
						<p>英雄联盟中国战队ig夺得得全球总冠军引全国网友沸...</p>
						<p>LOL IG战队属于那个国家的?基地在哪里?听说都是韩...</p>
						<p>王者荣耀里的CP英雄组团pk，哪组CP最为强势</p>
						<p>王者荣耀：有很多隐藏的CP英雄你知道吗</p>
						<p>王者荣耀时为什么总被团灭 来看看你的队友吧</p>
						<p>这算是王者荣耀战歌mv吧</p>
						<p>运营团队招聘专题-英雄联盟官方网站-腾讯游戏</p>
						<p>掌上英雄联盟 - 英雄联盟官方网站 - 腾讯游戏</p>
						<p>王者荣耀出了个什么新英雄</p>
						<p>【王者荣耀】新英雄介绍:元歌</p>
						<p>英雄联盟转区</p>
						<p>英雄联盟转区维护到什么时候？</p>
						<p>绝地求生延迟得厉害</p>
						<p>绝地求生25battleye please perform a clean game ...</p>
						<p>堡垒之夜手游体验服礼包哪里有 海量礼包等你拿</p>
						<p>堡垒之夜手游标准皮肤怎么获得 标准服装获取介绍</p>
					</div>
				</div>
	
				<div class="mod mod-data-page">
					<h3 class="title">新闻热搜推荐内容</h3>
					<div class="mod-cnt">
						<p>魔法少女 星之守护者- 英雄联盟官方网站 - 腾讯游戏</p>
						<p>在英雄联盟宇宙设定中瑞兹是最强的吗</p>
						<p>谁知道王者荣耀这些符号怎么打？</p>
						<p>王者荣耀 爱心字符 怎么打 如图</p>
						<p>英雄联盟官网 上方的渐变黑是怎么做到的</p>
						<p>玩英雄联盟卡怎么回事在线等。</p>
						<p>堡垒之夜法塔里在哪里</p>
						<p>wegame下载堡垒之夜说磁盘不足怎么办</p>
						<p>英雄联盟不会出装。在网吧里有英雄联盟助手。可以...</p>
						<p>LOL助手出现问题.打开Wg软件压根不显示LOL的任何信...</p>
						<p>上海东方梦工厂文化传播有限公司怎么样？</p>
						<p>上海东方梦工厂影视技术有限公司怎么样？</p>
						<p>我的世界一周年村庄种子</p>
						<p>求我的世界好的地图种子。</p>
						<p>堡垒之夜为什么会出现这种问题</p>
						<p>堡垒之夜登陆出现这个。怎么办?</p>
						<p>王者荣耀:英雄百变大赛不看走保啦</p>
						<p>王者荣耀:大神眼中上分最容易的英雄,不是李白,而是图5</p>
						<p>感恩节送大礼,十大永久英雄任你选-王者荣耀官方网...</p>
						<p>【超级赛事月】活动开启倒计时,最终豪礼勿忘兑换 -...</p>
						<p>S8LOL总决赛电脑什么配置</p>
						<p>英雄联盟theshyS8总决赛第二场玩的什么英雄</p>
						<p>堡垒之夜手机版怎么进不去，要求都达到了</p>
						<p>我问下堡垒之夜官网我的礼包在哪</p>
						<p>做王者荣耀主播，那个直播平台好，就是那个平台多...</p>
						<p>王者荣耀投屏直播 这图里的配置可以吗？？家里网速...</p>
						<p>S8LOL总决赛电脑什么配置</p>
						<p>lols8赛季奖励在哪领</p>
						<p>vivo怎样下载堡垒之夜？</p>
						<p>堡垒之夜手机版怎么进不去，要求都达到了</p>
						<p>英雄联盟中国战队ig夺得得全球总冠军引全国网友沸...</p>
						<p>LOL IG战队属于那个国家的?基地在哪里?听说都是韩...</p>
						<p>王者荣耀里的CP英雄组团pk，哪组CP最为强势</p>
						<p>王者荣耀：有很多隐藏的CP英雄你知道吗</p>
						<p>王者荣耀时为什么总被团灭 来看看你的队友吧</p>
						<p>这算是王者荣耀战歌mv吧</p>
						<p>运营团队招聘专题-英雄联盟官方网站-腾讯游戏</p>
						<p>掌上英雄联盟 - 英雄联盟官方网站 - 腾讯游戏</p>
						<p>王者荣耀出了个什么新英雄</p>
						<p>【王者荣耀】新英雄介绍:元歌</p>
						<p>英雄联盟转区</p>
						<p>英雄联盟转区维护到什么时候？</p>
						<p>绝地求生延迟得厉害</p>
						<p>绝地求生25battleye please perform a clean game ...</p>
						<p>堡垒之夜手游体验服礼包哪里有 海量礼包等你拿</p>
						<p>堡垒之夜手游标准皮肤怎么获得 标准服装获取介绍</p>
					</div>
				</div>
	
				<div class="mod mod-data-page">
					<h3 class="title">热门问答推荐内容</h3>
					<div class="mod-cnt">
						<p>魔法少女 星之守护者- 英雄联盟官方网站 - 腾讯游戏</p>
						<p>在英雄联盟宇宙设定中瑞兹是最强的吗</p>
						<p>谁知道王者荣耀这些符号怎么打？</p>
						<p>王者荣耀 爱心字符 怎么打 如图</p>
						<p>英雄联盟官网 上方的渐变黑是怎么做到的</p>
						<p>玩英雄联盟卡怎么回事在线等。</p>
						<p>堡垒之夜法塔里在哪里</p>
						<p>wegame下载堡垒之夜说磁盘不足怎么办</p>
						<p>英雄联盟不会出装。在网吧里有英雄联盟助手。可以...</p>
						<p>LOL助手出现问题.打开Wg软件压根不显示LOL的任何信...</p>
						<p>上海东方梦工厂文化传播有限公司怎么样？</p>
						<p>上海东方梦工厂影视技术有限公司怎么样？</p>
						<p>我的世界一周年村庄种子</p>
						<p>求我的世界好的地图种子。</p>
						<p>堡垒之夜为什么会出现这种问题</p>
						<p>堡垒之夜登陆出现这个。怎么办?</p>
						<p>王者荣耀:英雄百变大赛不看走保啦</p>
						<p>王者荣耀:大神眼中上分最容易的英雄,不是李白,而是图5</p>
						<p>感恩节送大礼,十大永久英雄任你选-王者荣耀官方网...</p>
						<p>【超级赛事月】活动开启倒计时,最终豪礼勿忘兑换 -...</p>
						<p>S8LOL总决赛电脑什么配置</p>
						<p>英雄联盟theshyS8总决赛第二场玩的什么英雄</p>
						<p>堡垒之夜手机版怎么进不去，要求都达到了</p>
						<p>我问下堡垒之夜官网我的礼包在哪</p>
						<p>做王者荣耀主播，那个直播平台好，就是那个平台多...</p>
						<p>王者荣耀投屏直播 这图里的配置可以吗？？家里网速...</p>
						<p>S8LOL总决赛电脑什么配置</p>
						<p>lols8赛季奖励在哪领</p>
						<p>vivo怎样下载堡垒之夜？</p>
						<p>堡垒之夜手机版怎么进不去，要求都达到了</p>
						<p>英雄联盟中国战队ig夺得得全球总冠军引全国网友沸...</p>
						<p>LOL IG战队属于那个国家的?基地在哪里?听说都是韩...</p>
						<p>王者荣耀里的CP英雄组团pk，哪组CP最为强势</p>
						<p>王者荣耀：有很多隐藏的CP英雄你知道吗</p>
						<p>王者荣耀时为什么总被团灭 来看看你的队友吧</p>
						<p>这算是王者荣耀战歌mv吧</p>
						<p>运营团队招聘专题-英雄联盟官方网站-腾讯游戏</p>
						<p>掌上英雄联盟 - 英雄联盟官方网站 - 腾讯游戏</p>
						<p>王者荣耀出了个什么新英雄</p>
						<p>【王者荣耀】新英雄介绍:元歌</p>
						<p>英雄联盟转区</p>
						<p>英雄联盟转区维护到什么时候？</p>
						<p>绝地求生延迟得厉害</p>
						<p>绝地求生25battleye please perform a clean game ...</p>
						<p>堡垒之夜手游体验服礼包哪里有 海量礼包等你拿</p>
						<p>堡垒之夜手游标准皮肤怎么获得 标准服装获取介绍</p>
					</div>
				</div>
	
			</div>
		</el-main>
	</div>
</template>

<script>
	// import common from '@/../server/common'
	// import utils from '@/utils/index'
	
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
				dataKeyIndex: [],
	
			}
		},
		mounted() {
			this.filterDataKey();
			this.getData();
		},
		methods: {
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
			tableRowClassName({row, rowIndex}) {
				if (rowIndex === 0) {
					return 'table-top';
				} else if (rowIndex === 3) {
					return 'table-bottom';
				}
				return '';
			},
			getData() {
				// this.$ajax.get('/api/seo/getKeyIndex',{
				// 	params:{
				// 		KeyName: '梦工厂',
				// 	}
				// })
				// .then(function (response) {
				// 	console.log(response)
				// })
				// .catch(function (error) {
				// 	console.log(error)
				// });
				// this.$ajax.get('/api/seo/getParticiple',{
				// 	// params:{
				// 	// 	KeyList: JSON.stringify(["梦工厂","QQ飞车"]),
				// 	// }
				// 	params:{
				// 		KeyName: '梦工厂',
				// 	}
				// })
				// .then(function (response) {
				// 	console.log(response)
				// })
				// .catch(function (error) {
				// 	console.log(error)
				// })
				this.$ajax.get('/api/seo/getNews',{
					// params:{
					// 	KeyList: JSON.stringify(["梦工厂","QQ飞车"]),
					// }
					params:{
						KeyName: '梦工厂',
						num: 5
					}
				})
				.then(function (response) {
					console.log(response)
				})
				.catch(function (error) {
					console.log(error)
				})
			}

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
		.search-state {
			width: 598px;
			margin-top: 10px;
			margin-left: auto;
			margin-right: auto;
			color: rgba(255, 255, 255, .8);
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
	}
</style>
