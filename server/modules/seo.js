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
	static async SfindSeoKey (keyName) {
		const result = await seoDb.findAll({
			where: {
				KeyName: keyName
			}
		})
		return result
	}
	/**
	 * 单查询，seo的相关信息
	 * @param KeyName  关键词
	 * @returns {Promise.<*>}
	 */
	static async MfindSeoKey (KeyLists) {
		const result = await seoDb.findAll({
			where: {
				KeyName: {[Op.in]: KeyLists},
			}
		})
		return result
	}
	/**
	 * 查询用户信息，单查询
	 * @param KeyName  关键词
	 * @returns {Promise.<*>}
	 */
	static async SfindBpsoKey (keyName, islimit=true) {
		if(islimit){
			const result = await bpsoDb.findAll({
				where: {
					KeyName: keyName,
					KeyWords: keyName
				}
			})
		}else{
			const result = await bpsoDb.findAll({
				where: {
					KeyName: keyName,
				}
			})
		}
		return result
	}
	/**
	 * 查询用户信息，多查询
	 * @param KeyLists  关键词数组
	 * @returns {Promise.<*>}
	 */
	static async MfindBpsoKey (KeyLists, islimit=true) {
		var result;
		if(islimit){
			result = await bpsoDb.findAll({
				where: {
					KeyName: {[Op.in]: KeyLists},
					KeyWords: {[Op.in]: KeyLists},
				}
			})
		}else{
			result = await bpsoDb.findAll({
				where: {
					KeyName: {[Op.in]: KeyLists},
				}
			})
		}
		return result
	}
	
}

module.exports = SeoModel