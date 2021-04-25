import produce from 'immer';

/** Models */
import { DirectoryAction } from './directory.actions';
import { DirectoryActionType } from './directory.action-types';
import { DirectoryItem } from '../../models/directories.models';

/** Helpers */
import { findByPath, deleteNode, addNode, getParent, checkIsUniqueName } from './directory.helpers';
import { initialStructure } from './directory.test-data';

interface DirectoryState {
  structure: DirectoryItem[];
  selectedItem: DirectoryItem | null;
  message: string | null;
}

/** Test data */
const initialState: DirectoryState = {
  structure: initialStructure,
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
          state.message = null;
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
        // Check if new node is unique
        if (!checkIsUniqueName(newItem.name, node)) {
          state.message = "Can't add not unique item";
          return state;
        }
        // Add node
        addNode(newItem, action.payload.path, state.structure);
        return state;

      case DirectoryActionType.EDIT_ITEM:
        // Find node
        let nodeToEdit = findByPath(action.payload.path, state.structure);
        // Return if path is not correct
        if (!nodeToEdit) {
          state.message = `Can't find an item ${action.payload.path}`;
          return state;
        }
        // Get parent
        let parent = getParent(nodeToEdit, state.structure);
        // Return if newName isn't unique in a parent folder
        if (parent && !checkIsUniqueName(action.payload.newName, parent)) {
          state.message = 'Not unique name!';
          return state;
        }
        // Change a name
        state.message = null;
        nodeToEdit.name = action.payload.newName;

        return state;

      case DirectoryActionType.DELETE_ITEM:
        let nodeToDelete = findByPath(action.payload, state.structure);
        if (!nodeToDelete) {
          state.message = `Can't find an item ${action.payload}`;
        } else {
          deleteNode(nodeToDelete, state.structure);
          state.message = null;
        }
        return state;

      case DirectoryActionType.ADD_SELECTED:
        state.selectedItem = action.payload;
        state.message = null;
        return state;

      case DirectoryActionType.REMOVE_SELECTED:
        state.selectedItem = null;
        state.message = null;
        return state;
      default:
        return state;
    }
  }
);

export default directoryReducer;
