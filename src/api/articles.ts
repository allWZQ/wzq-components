import LoginHttp from "~/utils/LoginHttp";

export function getArticles<T = any, R = any>() {
  return LoginHttp.post<T, R>('/login/articles');
}

export function addArticles<T = any, R = any>(data) {
  return LoginHttp.post<T, R>('/login/add_articles', data);
}

export function setArticles<T = any, R = any>(data) {
  return LoginHttp.post<T, R>('/login/set_articles', data);
}

export function delArticles<T = any, R = any>(data) {
  return LoginHttp.post<T, R>('/login/del_articles', data);
}