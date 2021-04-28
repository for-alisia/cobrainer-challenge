import DirectoryStore from './data/directory-store';

export default class RootStore {
  directoryStore: DirectoryStore;

  constructor() {
    this.directoryStore = new DirectoryStore(this);
    this.directoryStore.add('components', 'folder', null);
    this.directoryStore.add('package.json', 'file', null);
  }
}
