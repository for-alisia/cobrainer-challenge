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

export type DirectoryAction = FetchStructure | AddItem | AddSelected;
