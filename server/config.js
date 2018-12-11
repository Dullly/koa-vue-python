/**
 *     
 * @author      corkyliu
 * @time        2018年12月02日
 * @desc        Sequelize数据库配置，(Nodejs ORM框架)
 * 
 * */

const Sequelize = require('sequelize');

const mercuryDb = new Sequelize('mercury', 'mercury', 'mercury666', {
    host: '129.204.15.134',
    dialect: 'mysql',
    operatorsAliases: false,
    dialectOptions: {
        // 字符集
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00' //东八时区
});

module.exports = {
    mercuryDb
}