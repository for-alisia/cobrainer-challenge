import RootStore from '../root-store';
import { makeAutoObservable } from 'mobx';

export type ItemType = 'file' | 'folder';

export class DirectoryItem {
  type: ItemType;
  name: string;
  path: string;
  childrens?: DirectoryItem[];
  content?: string;

  constructor(name: string, path: string, type: ItemType) {
    this.name = name;
    this.path = path;
    this.type = type;

    if (this.type === 'folder') {
      this.childrens = [];
    }

    if (this.type === 'file') {
      this.content = 'Type something here';
    }

    makeAutoObservable(this);
  }
}

export default class DirectoryStore {
  rootStore: RootStore;
  structure: DirectoryItem[] = [];
  selectedItem: DirectoryItem | null = null;
  message: string | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {
      findNode: false,
      checkIfUnique: false,
      getParent: false,
    });
  }

  // Reaction "ADD ITEM"
  add(name: string, type: ItemType, path: string | null) {
    let newPath = path ? `${path}/${name}` : `/${name}`;
    const newItem = new DirectoryItem(name, newPath, type);

    // Add to root
    if (!path) {
      this.structure.push(newItem);
      return;
    }

    // Get parent node
    let nodeToPaste = this.findNode(path, this.structure);

    // If parent node doesn't exist
    if (!nodeToPaste) {
      this.message = 'Sorry, can not find a path';
      return;
    }

    // If parent node is file
    if (nodeToPaste.type === 'file') {
      this.message = 'Sorry, can not add to a file, choose a folder instead';
      return;
    }

    // If name is not unique in a folder
    if (!this.checkIfUnique(name, type, nodeToPaste)) {
      this.message = 'Sorry, this item is not unique';
      return;
    }

    // Add new node to a parent
    nodeToPaste.childrens?.push(newItem);
  }

  // Reaction: EDIT ITEM'S NAME
  edit(path: string, newName: string) {
    let nodeToEdit = this.findNode(path, this.structure);

    if (!nodeToEdit) {
      this.message = 'Can not find an item with this path';
      return;
    }

    let parent = this.getParent(nodeToEdit);

    // TODO: if the node is in the root?
    if (parent && !this.checkIfUnique(newName, nodeToEdit.type, parent)) {
      this.message = 'Not unique name';
      return;
    }

    nodeToEdit.name = newName;
  }

  // Reaction: DELETE_ITEM
  remove(path: string) {
    let nodeToDelete = this.findNode(path, this.structure);

    if (!nodeToDelete) {
      this.message = 'Can not find an item with this path';
      return;
    }

    let parentNode = this.getParent(nodeToDelete);

    if (parentNode && parentNode.childrens) {
      let index = parentNode.childrens.findIndex((el) => el.path === nodeToDelete?.path);

      parentNode.childrens.splice(index, 1);
    }
  }

  // Reaction: ADD_SELECTED
  addSelected(node: DirectoryItem) {
    this.selectedItem = node;
  }

  // Reaction: REMOVE_SELECTED
  removeSelected() {
    this.selectedItem = null;
  }

  // Helper: FIND IN STRUCTURE
  findNode(path: string, structure: DirectoryItem[]): DirectoryItem | null {
    let foundNode: DirectoryItem | null = null;

    for (let i = 0; i < structure.length; i++) {
      let node = structure[i];
      if (foundNode) {
        return foundNode;
      }
      if (node.path === path) {
        foundNode = node;
        return foundNode;
      }
      if (node.childrens && node.childrens.length) {
        foundNode = this.findNode(path, node.childrens);
      }
    }

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

  // Helper: GET PARENT
  getParent(node: DirectoryItem) {
    let path = node.path;
    let parentArr = path.split('/');
    parentArr.pop();
    let parentPath = parentArr.join('/');
    return this.findNode(parentPath, this.structure);
  }
}
