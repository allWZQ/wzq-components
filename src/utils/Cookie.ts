import CookieTool from 'js-cookie';
const Cookie = {
  SESSION_COOKIE_EXPIRE: -1,
  setCookie: (name, value, days?) => {
    if (days == Cookie.SESSION_COOKIE_EXPIRE) {
      CookieTool.set(name, value, { path: '/' });
    } else {
      CookieTool.set(name, value, { expires: days || 30, path: '/' });
    }
  },
  getCookie: (name: string) => {
    return CookieTool.get(name);
  },

  removeCookie: (name: string) => {
    CookieTool.remove(name);
  },
};

export default Cookie;
