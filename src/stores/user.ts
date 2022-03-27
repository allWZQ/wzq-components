import { action, observable } from 'mobx';
import ConstValues from '~/utils/ConstValues';
import Cookie from '~/utils/Cookie';

class UserStore {
  @observable user: User;
  constructor() {
    this.init();
  }
  @action
  init = () => {
    this.user = Cookie.getCookie(ConstValues.LOCAL_KEYS.OPERATE_TOKEN);
  };
  @action
  setUserToken = (data) =>{
    this.user = data
  }
}
export default UserStore;
