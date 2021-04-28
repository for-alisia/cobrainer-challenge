import DirectoryStore from './data/directory-store';

export default class RootStore {
  directoryStore: DirectoryStore;

  constructor() {
    this.directoryStore = new DirectoryStore(this);
  }
}
