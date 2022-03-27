const LocalStorage = {
  set: (name: string, value) => {
    if (typeof window === 'undefined') return;
    if (!value) {
      throw new Error('请传入正确的值');
    }
    if (typeof value === 'object') {
      localStorage.setItem(name, JSON.stringify(value));
    } else {
      localStorage.setItem(name, value);
    }
  },

  get: (name: string): any => {
    if (typeof window === 'undefined') return;

    let temp = localStorage.getItem(name);
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
    localStorage.removeItem(name);
  },
};

export default LocalStorage;
