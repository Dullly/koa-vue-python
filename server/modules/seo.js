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

class SeoModel {
	/**
	 * 查询用户信息
	 * @param KeyName  关键词
	 * @returns {Promise.<*>}
	 */
	static async findByKeyName (keyName) {
		console.log(keyName)
		const result = await seoDb.findAll({
			where: {
				KeyName: keyName
			}
		})
		return result
	}
	/**
	 * 查询用户信息，单查询
	 * @param KeyName  关键词
	 * @returns {Promise.<*>}
	 */
	static async SfindKeyIndex (keyName) {
		const result = await bpsoDb.findAll({
			attributes: ['KeyName','DayPv'],
			where: {
				KeyName: keyName,
				KeyWords: keyName
			}
		})
		return result
	}
	/**
	 * 查询用户信息，多查询
	 * @param KeyLists  关键词数组
	 * @returns {Promise.<*>}
	 */
	static async MfindKeyIndex (KeyLists) {
		const result = await bpsoDb.findAll({
			attributes: ['KeyName','DayPv'],
			where: {
				KeyName: {[Op.in]: KeyLists},
			}
		})
		return result
	}
	
}

module.exports = SeoModel