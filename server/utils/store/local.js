import path from 'path';
import fs from 'fs';
import cryptoer from '../encry/cryptoer';

/**
 * 返回 可访问的 路径 url： /public/upload/xxxxxxx.png
 */
const upload = (file, opts, callback) => {
  const filename = opts.filename; //eslint-disable-line

  const newFileName =
    cryptoer.md5(filename + String(new Date().getTime())) +
    path.extname(filename);

  const uploadPath = path.join(__dirname, '../../../public/upload/');
  const baseUrl = '/public/upload/';
  const filePath = path.join(uploadPath, newFileName);
  const fileUrl = baseUrl + newFileName;
  console.log('上传本地最终目录', fileUrl);

  file.on('end', () => {
    callback(null, {
      url: fileUrl,
    });
  });
  file.pipe(fs.createWriteStream(filePath));
};

export default upload;
