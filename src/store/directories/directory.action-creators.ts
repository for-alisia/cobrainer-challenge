import { DirectoryItem } from './../../models/directories.models';
import { DirectoryActionType } from './directory.action-types';
import {
  FetchStructureSuccess,
  AddItem,
  AddSelected,
  RemoveSelected,
  EditItem,
  DeleteItem,
  ChangeContent,
  FetchStructure,
  SetActiveTab,
  RemoveFromTabs,
} from './directory.actions';

export const fetchStructure = (): FetchStructure => ({
  type: DirectoryActionType.FETCH_STRUCTURE,
});

export const fetchStructureSuccess = (structure: DirectoryItem[]): FetchStructureSuccess => ({
  type: DirectoryActionType.FETCH_STRUCTURE_SUCCESS,
  payload: structure,
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

export const setActiveTab = (item: DirectoryItem): SetActiveTab => ({
  type: DirectoryActionType.SET_ACTIVE_TAB,
  payload: item,
});

export const removeFromTabs = (item: DirectoryItem): RemoveFromTabs => ({
  type: DirectoryActionType.REMOVE_FROM_TABS,
  payload: item,
});
