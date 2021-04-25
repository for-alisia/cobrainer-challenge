import { DirectoryItem } from '../../models/directories.models';

export function findByPath(path: string, structure: DirectoryItem[]): DirectoryItem | undefined {
  let foundNode: DirectoryItem | undefined;

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
      foundNode = findByPath(path, node.childrens);
    }
  }

  return foundNode;
}

export function addNode(nodeToAdd: DirectoryItem, path: string, structure: DirectoryItem[]) {
  for (let i = 0; i < structure.length; i++) {
    let node = structure[i];

    if (node.path === path) {
      node.childrens?.push(nodeToAdd);
      return;
    }

    if (node.childrens) {
      addNode(nodeToAdd, path, node.childrens);
    }
  }
}

export function deleteNode(node: DirectoryItem, structure: DirectoryItem[]) {
  let foundNodeIdx = structure.indexOf(node);
  if (foundNodeIdx === -1) {
    structure.forEach((el) => {
      if (el.childrens) {
        deleteNode(node, el.childrens);
      }
    });
  } else {
    structure.splice(foundNodeIdx, 1);
  }
}

export function getParent(node: DirectoryItem, structure: DirectoryItem[]) {
  let path = node.path;
  let parentArr = path.split('/');
  parentArr.pop();
  let parentPath = parentArr.join('/');
  return findByPath(parentPath, structure);
}

export function checkIsUniqueName(name: string, parent: DirectoryItem): Boolean {
  let isUnique = true;
  if (parent.childrens) {
    parent.childrens.forEach((el) => {
      if (el.name === name) {
        isUnique = false;
      }
    });
  }

  return isUnique;
}
