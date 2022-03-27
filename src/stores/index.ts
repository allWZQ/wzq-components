import ContextStore from './context';
import UserStore from './user';

class Root {
  static rootStore: Root;
  static getInstance = () => {
    return Root.rootStore;
  };
  context: ContextStore;
  userStore: UserStore;

  constructor() {
    if (!Root.rootStore) {
      let self = this;
      this.context = new ContextStore();
      this.userStore = new UserStore();
      Root.rootStore = self;
    }
    return Root.rootStore;
  }
}

export default Root;
