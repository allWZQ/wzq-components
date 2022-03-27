import LoginHttp from '~/utils/LoginHttp';

export function userMenus<T = any, R = any>() {
  return LoginHttp.post<T, R>('/login/menus');
}
