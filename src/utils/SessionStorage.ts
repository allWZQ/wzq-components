const SessionStorage = {
  set: (name: string, value) => {
    if (typeof window === 'undefined') return;
    if (!value) {
      throw new Error('请传入正确的值');
    }
    if (typeof value === 'object') {
      sessionStorage.setItem(name, JSON.stringify(value));
    } else {
      sessionStorage.setItem(name, value);
    }
  },

  get: (name: string): any => {
    if (typeof window === 'undefined') return;

    let temp = sessionStorage.getItem(name);
    if (temp) {
      try {
        temp = JSON.parse(temp);
      } catch (err) {
        console.error(err);
      }
    }
    return temp;
  },

  remove: (name) => {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(name);
  },
};

export default SessionStorage;
