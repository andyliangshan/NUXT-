import QRCode from 'qrcode';

const NodeQR = {
  cookie: '',

  toFile: (destFilePath, url, options = {}) =>
    new Promise(resolve => {
      QRCode.toFile(destFilePath, url, options, (err, file) => {
        if (err) {
          console.log('qrcode error..........', err);
          resolve(0);
        } else {
          resolve(1);
        }
      });
    }),
  toDataURL: (text, options = {}) =>
    new Promise(resolve => {
      QRCode.toDataURL(text, options, (err, url) => {
        if (err) resolve(null);
        else resolve(url);
      });
    }),
};

export default NodeQR;
