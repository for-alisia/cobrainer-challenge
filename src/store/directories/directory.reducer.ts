import produce from 'immer';

/** Models */
import { DirectoryAction } from './directory.actions';
import { DirectoryActionType } from './directory.action-types';
import { DirectoryItem } from '../../models/directories.models';

/** Helpers */
import {
  findByPath,
  deleteNode,
  addNode,
  getParent,
  checkIsUniqueName,
  changePath,
} from './directory.helpers';
import { initialStructure } from './directory.test-data';

interface DirectoryState {
  structure: DirectoryItem[];
  selectedItem: DirectoryItem | null;
  message: string | null;
  openedTabs: DirectoryItem[];
  activeTab: DirectoryItem | null;
}

/** Test data */
const initialState: DirectoryState = {
  structure: initialStructure,
  selectedItem: null,
  message: null,
  openedTabs: [],
  activeTab: null,
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
        // Add empty content to a new file
        if (action.payload.type === 'file') {
          newItem.content = 'Type something here...';
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

        let idxToChange = state.openedTabs.findIndex((el) => el.path === nodeToEdit?.path);
        // Change a path here
        nodeToEdit.path = changePath(nodeToEdit.path, action.payload.newName);
        // Replace in a tabs array
        if (idxToChange !== -1) {
          state.openedTabs.splice(idxToChange, 1, nodeToEdit);
        }

        return state;

      case DirectoryActionType.DELETE_ITEM:
        let nodeToDelete = findByPath(action.payload, state.structure);
        if (!nodeToDelete) {
          state.message = `Can't find an item ${action.payload}`;
        } else {
          deleteNode(nodeToDelete, state.structure);
          //Check if the node is inside opened tabs
          let idxInTab = state.openedTabs.findIndex((el) => el.path === nodeToDelete?.path);
          if (idxInTab !== -1) {
            state.openedTabs.splice(idxInTab, 1);
          }

          if (state.activeTab && nodeToDelete.path === state.activeTab.path) {
            state.activeTab = state.openedTabs[0] || null;
          }

          state.message = null;
        }
        return state;

      case DirectoryActionType.CHANGE_CONTENT:
        let nodeToChange = findByPath(action.payload.path, state.structure);

        if (!nodeToChange) {
          state.message = "Can't find the file!";
          return state;
        }

        if (nodeToChange.type === 'folder') {
          state.message = "Can't change folder's content";
          return state;
        }

        nodeToChange.content = action.payload.newContent;

        let idxContent = state.openedTabs.findIndex((el) => el.path === nodeToChange?.path);

        if (idxContent !== -1) {
          state.openedTabs.splice(idxContent, 1, nodeToChange);
        }

        if (nodeToChange.path === state.activeTab?.path) {
          state.activeTab = nodeToChange;
        }

        return state;

      case DirectoryActionType.ADD_SELECTED:
        state.selectedItem = action.payload;
        if (action.payload.type === 'file') {
          // Check if we already have this file opened
          let idxInTabs = state.openedTabs.findIndex((el) => el.path === action.payload.path);
          if (idxInTabs === -1) {
            state.openedTabs.push(action.payload);
          }
          state.activeTab = action.payload;
        }
        state.message = null;
        return state;

      case DirectoryActionType.REMOVE_SELECTED:
        state.selectedItem = null;
        state.message = null;
        return state;

      case DirectoryActionType.FETCH_STRUCTURE_SUCCESS:
        state.structure = action.payload;
        return state;

      case DirectoryActionType.SET_ACTIVE_TAB:
        if (action.payload.type === 'file') {
          state.activeTab = action.payload;
        } else {
          state.message = "Can't set a folder as an active tab";
        }
        return state;

      case DirectoryActionType.REMOVE_FROM_TABS:
        // Find a tab
        let idx = state.openedTabs.findIndex((el) => el.path === action.payload.path);
        // If there is no such tab, return an error
        if (idx === -1) {
          state.message = "Can't close this item";
          return state;
        }
        // Remove a tab
        state.openedTabs.splice(idx, 1);
        // If this tab was active, change an active tab to a first tab from opened tabs array
        if (state.activeTab && state.activeTab.path === action.payload.path) {
          state.activeTab = state.openedTabs[0] || null;
        }
        return state;
      default:
        return state;
    }
  }
);

export default directoryReducer;
