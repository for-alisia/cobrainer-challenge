import RootStore from '../root-store';
import { makeAutoObservable } from 'mobx';

export type ItemType = 'file' | 'folder';

export class DirectoryItem {
  type: ItemType;
  name: string;
  path: string;
  childrens: DirectoryItem[] | null;
  content?: string;

  constructor(name: string, path: string, type: ItemType) {
    this.name = name;
    this.path = path;
    this.type = type;
    this.childrens = null;

    if (this.type === 'folder') {
      this.childrens = [];
    }

    if (this.type === 'file') {
      this.content = 'Type something here';
    }

    makeAutoObservable(this);
  }

  editName(newName: string) {
    this.name = newName;
  }

  addChild(item: DirectoryItem) {
    if (this.type === 'folder' && this.childrens) {
      this.childrens.push(item);
    }
  }

  deleteChild(item: DirectoryItem) {
    if (this.type === 'folder' && this.childrens) {
      let index = this.childrens.findIndex((el) => el.path === item.path);

      if (index !== -1) {
        this.childrens.splice(index, 1);
      }
    }
  }
}

export default class DirectoryStore {
  rootStore: RootStore;
  structure: DirectoryItem[];
  selectedItem: DirectoryItem | null;
  message: string | null;
  root: DirectoryItem;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.structure = [];
    this.selectedItem = null;
    this.message = null;
    this.root = new DirectoryItem('_root', '/', 'folder');

    makeAutoObservable(this, {
      findNode: false,
      checkIfUnique: false,
      //getParent: false,
    });
  }

  // Reaction "ADD ITEM"
  add(name: string, type: ItemType, path: string | null) {
    let newPath = path ? `${path}/${name}` : `/${name}`;
    const newItem = new DirectoryItem(name, newPath, type);
  }

  // Reaction: EDIT ITEM'S NAME
  edit(newName: string, path: string) {}

  // Reaction: DELETE_ITEM
  remove(path: string) {}

  // Reaction: ADD_SELECTED
  addSelected(node: DirectoryItem) {
    this.selectedItem = node;
    console.log(this.selectedItem);
  }

  // Reaction: REMOVE_SELECTED
  removeSelected() {
    this.selectedItem = null;
  }

  // Helper: FIND IN STRUCTURE
  findNode(path: string, root: DirectoryItem): DirectoryItem | null {
    let foundNode: DirectoryItem | null = null;

    if (path === root.path) return root;

    return foundNode;
  }

  // Helper: UNIQUE IN FOLDER
  checkIfUnique(name: string, type: ItemType, parent: DirectoryItem): boolean {
    let isUnique = true;

    if (parent.childrens) {
      parent.childrens.forEach((el) => {
        if (el.name === name && el.type === type) {
          isUnique = false;
        }
      });
    }

    return isUnique;
  }

  // // Helper: GET PARENT
  // getParent(node: DirectoryItem) {
  //   let path = node.path;
  //   let parentArr = path.split('/');
  //   parentArr.pop();
  //   let parentPath = parentArr.join('/');
  //   return this.findNode(parentPath, this.structure);
  // }
}
