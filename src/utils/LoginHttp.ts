import axios, { AxiosRequestConfig } from 'axios';
import Cookie from '~/utils/Cookie';
import ConstValues from './ConstValues';

// 创建axios实例
const LoginHttp = axios.create({
  timeout: 1000 * 60 * 3,
  baseURL: `${process.env.API_HOST}/`,
});

export function handleRequestToken(config: AxiosRequestConfig): void {
  const token = Cookie.getCookie(ConstValues.LOCAL_KEYS.OPERATE_TOKEN);
  if (token) {
    config.headers['token'] = `${token}`;
  }
}

LoginHttp.interceptors.request.use(
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
    if (process.env.NEXT_PUBLIC_API_ENV !== 'production') {
      // 打印请求参数
      console.log('----------------');
      console.log(config);
      console.log(config.url);
      console.log(JSON.stringify(data));
      console.log('----------------');
    }
    handleRequestToken(config);
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

LoginHttp.interceptors.response.use(
  (response) => {
    let resultData;
    resultData = response.data;
    if (process.env.NEXT_PUBLIC_API_ENV !== 'production') {
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

export default LoginHttp;
