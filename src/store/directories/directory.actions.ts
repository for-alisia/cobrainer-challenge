import { DirectoryItem } from './../../models/directories.models';
import { DirectoryActionType } from './directory.action-types';

export interface FetchStructure {
  type: DirectoryActionType.FETCH_STRUCTURE;
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

export type DirectoryAction =
  | FetchStructure
  | AddItem
  | AddSelected
  | RemoveSelected
  | EditItem
  | DeleteItem;
