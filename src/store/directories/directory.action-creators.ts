import { DirectoryItem } from './../../models/directories.models';
import { DirectoryActionType } from './directory.action-types';
import {
  FetchStructure,
  AddItem,
  AddSelected,
  RemoveSelected,
  EditItem,
  DeleteItem,
  ChangeContent,
} from './directory.actions';

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

export const removeSelected = (): RemoveSelected => ({
  type: DirectoryActionType.REMOVE_SELECTED,
});

export const editItem = (newName: string, path: string): EditItem => ({
  type: DirectoryActionType.EDIT_ITEM,
  payload: { newName, path },
});

export const deleteItem = (path: string): DeleteItem => ({
  type: DirectoryActionType.DELETE_ITEM,
  payload: path,
});

export const changeContent = (path: string, newContent: string): ChangeContent => ({
  type: DirectoryActionType.CHANGE_CONTENT,
  payload: { path, newContent },
});
