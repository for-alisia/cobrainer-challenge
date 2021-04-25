import produce from 'immer';

/** Models */
import { DirectoryAction } from './directory.actions';
import { DirectoryActionType } from './directory.action-types';
import { DirectoryItem } from '../../models/directories.models';

interface DirectoryState {
  structure: DirectoryItem[];
  selectedItem: DirectoryItem | null;
  message: string | null;
}

/** Test data */
const initialState: DirectoryState = {
  structure: [
    {
      type: 'folder',
      name: 'src',
      path: '/src',
      childrens: [
        {
          type: 'folder',
          name: 'Components',
          path: '/src/Components',
          childrens: [
            {
              type: 'file',
              name: 'Modal.js',
              path: '/src/Components/Modal.js',
              content: 'example 1',
            },
            {
              type: 'file',
              name: 'Modal.css',
              path: '/src/Components/Modal.css',
              content: 'example 2',
            },
          ],
        },
        { type: 'file', name: 'index.js', path: '/src/index.js', content: 'index here' },
        { type: 'file', name: 'index.html', path: '/src/index.html', content: 'html here' },
      ],
    },
    { type: 'file', name: 'package.json', path: '/package.json', content: 'your packages here' },
    { type: 'folder', name: 'test', path: '/test', childrens: [] },
  ],
  selectedItem: null,
  message: null,
};

const directoryReducer = produce(
  (state: DirectoryState = initialState, action: DirectoryAction): DirectoryState => {
    switch (action.type) {
      case DirectoryActionType.ADD_ITEM:
        // Create a new Item
        let newItem: DirectoryItem = {
          type: action.payload.type,
          name: action.payload.name,
          path: `${action.payload.path ? action.payload.path : ''}/${action.payload.name}`,
        };
        // Add childrens to a new folder
        if (action.payload.type === 'folder') {
          newItem.childrens = [];
        }
        // Add item to the root
        if (action.payload.path === null) {
          state.structure.push(newItem);
          return state;
        }
        let node = findByPath(action.payload.path, state.structure);
        // Check if the node exists
        if (!node) {
          state.message = "Can't find a path to add. Check if the path is correct";
          return state;
        }
        // Check if we try to add inside a file
        if (node && node.type === 'file') {
          state.message = "Can't add to a file. Choose a directory instead";
          return state;
        }

        // Add node
        addNode(newItem, action.payload.path, state.structure, state);
        return state;
      case DirectoryActionType.ADD_SELECTED:
        state.selectedItem = action.payload;
        return state;
      default:
        return state;
    }
  }
);

export default directoryReducer;

function findByPath(path: string, structure: DirectoryItem[]): DirectoryItem | null {
  let foundNode: DirectoryItem | null = null;

  structure.forEach((node) => {
    if (node.path === path) {
      foundNode = node;
      return;
    }

    if (node.type === 'folder' && node.childrens && node.childrens.length) {
      foundNode = findByPath(path, node.childrens);
    }
  });

  return foundNode;
}

function addNode(
  node: DirectoryItem,
  path: string,
  structure: DirectoryItem[],
  state: DirectoryState
) {
  structure.forEach((el) => {
    if (el.path === path) {
      console.log(checkIsUniqueName(node, el));
      if (!checkIsUniqueName(node, el)) {
        state.message = 'Item with this name is already exists';
        return;
      }
      el.childrens?.push(node);
      return;
    }

    if (el.type === 'folder' && el.childrens) {
      addNode(node, path, el.childrens, state);
    }
  });
}

function checkIsUniqueName(child: DirectoryItem, parent: DirectoryItem): Boolean {
  let isUnique = true;
  if (parent.childrens) {
    parent.childrens.forEach((el) => {
      if (el.path === child.path) {
        isUnique = false;
      }
    });
  }

  return isUnique;
}
