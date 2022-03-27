import LoginHttp from "~/utils/LoginHttp";

export function getAccount<T = any, R = any>() {
  return LoginHttp.post<T, R>('/login/account');
}

export function addAccount<T = any, R = any>(data) {
  return LoginHttp.post<T, R>('/login/add_account', data);
}

export function setAccount<T = any, R = any>(data) {
  return LoginHttp.post<T, R>('/login/set_account', data);
}

export function delAccount<T = any, R = any>(data) {
  return LoginHttp.post<T, R>('/login/del_account', data);
}