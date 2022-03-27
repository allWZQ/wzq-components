import axios from 'axios';
import ConstValues from './ConstValues';

// 创建axios实例
const Http = axios.create({
  timeout: 1000 * 60 * 3,
  baseURL: `${process.env.API_HOST}/`,
});

Http.interceptors.request.use(
  async (config) => {
    // 增加固定请求参数
    let data = config.data;
    let isGet = config.method == 'get';
    if (isGet) {
      data = config.params;
    }
    data = {
      ...data,
    };
    if (process.env.API_HOST !== 'production') {
      // 打印请求参数
      console.log('----------------');
      console.log(config);
      console.log(config.url);
      console.log(JSON.stringify(data));
      console.log('----------------');
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

Http.interceptors.response.use(
  (response) => {
    let resultData;
    resultData = response.data;
    if (process.env.API_HOST !== 'production') {
      // 打印结果
      console.warn('----------------');
      console.log(response.config.url);
      console.log(resultData);
      console.warn('----------------');
    }
    return resultData;
  },
  (error) => {
    // 拦截错误
    console.log(error);
    const err = {
      ...error,
      ...error.response,
      ...{ msg: ConstValues.Notification.NetError }, // 请求失败，可能跟本地网络有关
    };
    return Promise.reject(err); //
  }
);

export default Http;
