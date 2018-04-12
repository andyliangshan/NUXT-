/**
 * 使用示例
 * CREATE TABLE area (
   areaid               integer PRIMARY KEY AUTOINCREMENT NOT NULL  ,
   name                 text NOT NULL DEFAULT '' ,
   description          text NOT NULL DEFAULT ''
   -- MERGED IN COLUMN DEFINITION: CONSTRAINT Pk_area PRIMARY KEY ( areaid )
   );

   DBL.createTable(`create table if not exists product(
   name varchar(255),
   session varchar(255),
   source varchar(255),
   utm varchar(255),
   ip varchar(255),
   url varchar(255),
   createtime datetime,
   updatetime datetime,
   isdelete int(1),
   status int(50)
   );`).then(data => console.log(data))
  .catch(err => console.log(err));

  DBL.sql(`insert into product (name, session, source, utm, ip, url, createtime, updatetime, isdelete, status) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ['产品列表页面', req.cookies['m.liuxue.sid'], req.query.source, req.query.utm_source, requestIp.getClientIp(req), req.originalUrl, dbtime, dbtime, 0, 0]).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  });
 *
 */
import db from './index';
import logger from '../../log4js/index';

class DBL {
  /**
   * 创建表
   * @param sentence    CREATE TABLE 语句
   * @used
     DBL.createTable(`create table if not exists product(
         name varchar(255),
         session varchar(255),
         source varchar(255),
         utm varchar(255),
         ip varchar(255),
         url varchar(255),
         createtime datetime,
         updatetime datetime,
         isdelete int(1),
         status int(50)
     );`).then(data => console.log(data))
     .catch(err => console.log(err));
   */
  static createTable(sentence) {
    return new Promise((resolve, reject) => {
      db.exec(sentence, (err, data) => {
        if (err) reject(new Error(err));
        resolve(
          `table exists or create table ${sentence.substring(
            27,
            sentence.indexOf('('),
          )} success!`,
        );
      });
    });
  }
  /**
   * 执行 增  删  改  查(单个数据查询或者多个数据查询)
   * @param sql    sql语句
   * @param param     参数(可以是数组或者数字或者字符串,根据sql语句来定)
   * @param mode    执行模式, 默认run,执行sql,如果查询的话,则使用get(单个)all(多个)
   * @returns {Promise}
   @used
   增 : DBL.sql(`insert into ${this.tableName} (begin_time, create_time, end_time, play_id, postion_id, status, task_id) values(?, ?, ?, ?, ?, ?, ?)`,
   [obj.begin_time, obj.create_time, obj.end_time, obj.play_id, obj.postion_id, obj.status, obj.task_id]);

   删 : DBL.sql(`delete from ${this.tableName} where id = ?`, id);

   改 : DBL.sql(`update ${this.tableName} set begin_time = ?, status = ? where postion_id = ?`, [begin_timeValue, statusValue, postion_idValue]);

   查 : DBL.sql(`select * from ${this.tableName} where id = ?`, id, 'get/all');

   // 删
   DBL.sql(`delete from ${db.tableName} where same_day = ?`, '2017-7-12').then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });

   // 改
   DBL.sql(`update ${db.tableName} set task_id = ? where same_day = ?`, [4, '2017-7-12']).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });

   // 查
   DBL.sql(`select * from ${db.tableName} where same_day = ?`, '2017-7-12', 'all').then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });
   */
  static sql(sql, param, mode) {
    mode = mode == 'all' ? 'all' : mode == 'get' ? 'get' : 'run'; //eslint-disable-line
    return new Promise((resolve, reject) => {
      db[mode](sql, param, (err, data) => {
        // data: Array, Object
        if (err) {
          reject(new Error(err));
        } else if (data) {
            //eslint-disable-line
          resolve(data); // 返回数据查询成功的结果
        } else {
          resolve('success'); // 提示 增 删 改 操作成功
        }
      });
    });
  }
}

export default DBL;
