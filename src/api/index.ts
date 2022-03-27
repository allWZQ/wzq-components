import Http from '~/utils/Http';

export function userLogin<T = any, R = any>(data) {
  return Http.post<T, R>('/login', data);
}
