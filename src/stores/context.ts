import { observable, action } from 'mobx';
import * as H from 'history';

export class ContextStore {
  @observable history: H.History;
  @action
  setHistory(history: H.History) {
    this.history = history;
  }
}
export default ContextStore;
