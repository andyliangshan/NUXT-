import fs from 'fs';
import path from 'path';
import level from 'level';
import cp from 'child_process';

/**
 * 清理并创建 'dbConfig.path'/development|production 本地存储db目录
 * @param dbConfig 指定db目录('data','temp', etc.);
 * @return {*} db 操作对象 db.put   db.get
 */
export default async dbConfig => {
  const dbPath = path.resolve(
    dbConfig.path,
    process.env.NODE_ENV || 'development',
  );

  try {
    fs.accessSync(dbPath, fs.R_OK | fs.W_OK); //eslint-disable-line
    await cp.exec('rm -rf ' + dbPath); //eslint-disable-line
    console.log('Clearing existing db ', dbPath);
  } catch (err) {
    console.log('Failed to clear existing db ', err);
  }

  await cp.exec('mkdir -p ' + dbPath); //eslint-disable-line

  return level(dbPath, { valueEncoding: 'json' });
};
