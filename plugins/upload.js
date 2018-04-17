import axios from './axios';

export async function uploadDataUrl(dataUrl) {
    let content = dataUrl.replace(/^data:.+;base64,/, '');
    let resp = await axios.get('/api/qiniu/token');
    const token = resp.data.token;
    if (!token) {
        alert('无法取上传令牌')
        return;
    }
    return new Promise((resolve, reject) => {
        let url = '//up-z0.qiniup.com/putb64/-1';
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                try {
                    resolve(JSON.parse(xhr.responseText));
                } catch (e) {
                    reject(xhr.responseText);
                }
            }
        }
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.setRequestHeader('Authorization', `UpToken ${token}`);
        xhr.send(content);
    });
}

export async function upload(file) {
    let resp = await axios.get('/api/qiniu/token');
    const token = resp.data.token;
    if (!token) {
        alert('无法取上传令牌')
        return;
    }

    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('token', token);

    return new Promise((resolve, reject) => {
        let url = '//up-z0.qiniup.com';
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                try {
                    resolve(JSON.parse(xhr.responseText));
                } catch (e) {
                    reject(xhr.responseText);
                }
            }
        }
        xhr.open('POST', url, true);
        xhr.send(formdata);
    });
}