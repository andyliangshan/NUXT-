import * as axios from 'axios'

let options = {
  params: {
    tsp: Date.now()
  },
}

// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
} else {
  // // 添加请求拦截器
  // axios.interceptors.request.use(function (config) {
  //   // 在发送请求之前做些什么
  //   const token = window.localStorage.getItem('token');
  //   if (token) {
  //     config.headers = {
  //       'x-access-token': token
  //     }
  //   }
  //   return config;
  // }, function (error) {
  //   // 对请求错误做些什么
  //   return Promise.reject(error);
  // });
}

export default axios.create(options)
