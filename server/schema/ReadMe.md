## schema文件夹
### 建立数据库的模型，存放数据库字段映射
### 如需改动数据接口、数据库结构，请联系Corkyliu

---

### sequelize相关
字段生成：[sequelize-auto从数据库表自动生成Sequelize模型(Model)](https://itbilu.com/nodejs/npm/41mRdls_Z.html)

###### sequelize指令
sequelize-auto -o "./models" -d mercury -h localhost -p 3306 -u mercury -x mercury666
##### 取消sql中带`createdAt`等字段
timestamps: false