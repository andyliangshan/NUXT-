import sqlite3 from 'sqlite3';

const SQLite3 = sqlite3.verbose();

// 本地测试发送邮件 ： const db = new SQLite3.Database('./sqlite.db', err => {
const db = new SQLite3.Database('../sqlite.db', err => {
  if (err) {
    throw new Error(err);
    process.exit(1); //eslint-disable-line
  } else {
    console.log('sqlite数据库连接成功');
  }
});

export default db;
