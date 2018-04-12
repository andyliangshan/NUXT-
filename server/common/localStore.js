import path from 'path';
import fs from 'fs';
import cryptoer from '../utils/encry/cryptoer';

const upload = (file, opts, callback)=> {
  const filename = opts.filename;

  const newFileName = cryptoer.md5(filename + String((new Date()).getTime())) + path.extname(filename);

  const uploadPath = path.join(__dirname, '../upload/');
  if (!fs.statSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }
  const baseUrl = '../upload/';
  const filePath = path.join(uploadPath, newFileName);
  const fileUrl = baseUrl + newFileName;

  file.on('end', ()=> {
    callback(null, {
      url: fileUrl,
    });
  });
  file.pipe(fs.createWriteStream(filePath));
};

export default upload;
