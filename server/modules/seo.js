/**
 *     
 * @author      corkyliu
 * @time        2018年12月02日
 * @desc        seo数据库接口
 * 
 * */
const db = require('../config.js'); 	// 引入seo的表结构
const mercuryDb = db.mercuryDb; 		// 引入数据库
const seoDb = mercuryDb.import('../schema/seo.js'); // 用sequelize的import方法引入表结构，实例化了seo表
const bpsoDb = mercuryDb.import('../schema/bpso.js'); // 用sequelize的import方法引入表结构，实例化了bpso表
import Seqeuelize from 'sequelize';
const Op = Seqeuelize.Op;

// S前缀代表单查询，M前缀代表多查询
class SeoModel {
	/**
	 * 单查询，seo的相关信息
	 * @param KeyName  关键词
	 * @returns {Promise.<*>}
	 */
	static async findSeoKey (KeyLists) {
		const result = await seoDb.findAll({
			where: {
				KeyName: {[Op.in]: KeyLists},
			}
		})
		return result
	}
	/**
	 * 查询百度竞价信息，多查询
	 * @param KeyList  关键词数组
	 * @returns {Promise.<*>}
	 */
	static async findBpsoKey (KeyList, islimit=true) {
		var result;
		if(islimit){
			// let $sql = "select * from bpso where id in (select max(id) from bpso group by `KeyName`) ORDER BY DayPv DESC,MDayPv DESC,Price";
			let $sql = "SELECT * FROM `bpso` AS `bpso` WHERE id in (select max(id) from bpso group by `KeyName`) AND `bpso`.`KeyName` IN (",
				arrToStr;
			
			KeyList.forEach(ele => {
				arrToStr += "'"+ele+"'";
			});
			$sql += arrToStr + ") AND `bpso`.`KeyWords` IN(" + arrToStr +") ORDER BY DayPv DESC,MDayPv DESC,Price"

			result = await Seqeuelize.query($sql);
		}else{
			result = await bpsoDb.findAll({
				where: {
					KeyName: {[Op.in]: KeyList},
				}
			})
		}
		return result
	}
	
}

module.exports = SeoModel