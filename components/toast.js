let timer;
const TOAST_ID = 'toast-msg';

export const toast = function (msg) {
    let toastDom = document.getElementById(TOAST_ID);
    if (toastDom) {
        clearTimeout(timer);
    } else {
        toastDom = document.createElement('div');
        toastDom.setAttribute('id', TOAST_ID);
        document.body.appendChild(toastDom);
    }

    toastDom.innerText = msg;

    // 4秒钟之后销毁
    timer = setTimeout(() => {
        document.body.removeChild(toastDom);
    }, 4000);
}