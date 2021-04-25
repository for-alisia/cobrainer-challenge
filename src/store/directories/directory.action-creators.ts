import { DirectoryItem } from './../../models/directories.models';
import { DirectoryActionType } from './directory.action-types';
import { FetchStructure, AddItem, AddSelected } from './directory.actions';

export const fetchStructure = (): FetchStructure => ({
  type: DirectoryActionType.FETCH_STRUCTURE,
});

export const addItem = (name: string, path: string | null, type: 'file' | 'folder'): AddItem => ({
  type: DirectoryActionType.ADD_ITEM,
  payload: { name, path, type },
});

export const addSelected = (item: DirectoryItem): AddSelected => ({
  type: DirectoryActionType.ADD_SELECTED,
  payload: item,
});
