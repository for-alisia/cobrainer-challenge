import { DirectoryItem } from './../../models/directories.models';
import { DirectoryActionType } from './directory.action-types';

export interface FetchStructure {
  type: DirectoryActionType.FETCH_STRUCTURE;
}
export interface FetchStructureSuccess {
  type: DirectoryActionType.FETCH_STRUCTURE_SUCCESS;
  payload: DirectoryItem[];
}

export interface AddItem {
  type: DirectoryActionType.ADD_ITEM;
  payload: { name: string; path: string | null; type: 'file' | 'folder' };
}

export interface AddSelected {
  type: DirectoryActionType.ADD_SELECTED;
  payload: DirectoryItem;
}

export interface RemoveSelected {
  type: DirectoryActionType.REMOVE_SELECTED;
}

export interface EditItem {
  type: DirectoryActionType.EDIT_ITEM;
  payload: { newName: string; path: string };
}

export interface DeleteItem {
  type: DirectoryActionType.DELETE_ITEM;
  payload: string;
}

export interface ChangeContent {
  type: DirectoryActionType.CHANGE_CONTENT;
  payload: { path: string; newContent: string };
}

export interface SetActiveTab {
  type: DirectoryActionType.SET_ACTIVE_TAB;
  payload: DirectoryItem;
}

export interface RemoveFromTabs {
  type: DirectoryActionType.REMOVE_FROM_TABS;
  payload: DirectoryItem;
}

export type DirectoryAction =
  | FetchStructureSuccess
  | AddItem
  | AddSelected
  | RemoveSelected
  | EditItem
  | DeleteItem
  | ChangeContent
  | FetchStructure
  | SetActiveTab
  | RemoveFromTabs;
