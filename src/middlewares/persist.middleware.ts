import { Middleware } from 'redux';

import { RootState } from '../store/root-reducer';

import { DirectoryActionType } from '../store/directories/directory.action-types';

import { fetchStructureSuccess } from '../store/directories/directory.action-creators';

export const persistMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (action.type === DirectoryActionType.FETCH_STRUCTURE) {
    const structure = localStorage.getItem('structure');
    if (structure) {
      store.dispatch(fetchStructureSuccess(JSON.parse(structure)));
    }
  }

  next(action);

  if (
    action.type === DirectoryActionType.ADD_ITEM ||
    action.type === DirectoryActionType.CHANGE_CONTENT ||
    action.type === DirectoryActionType.DELETE_ITEM ||
    action.type === DirectoryActionType.EDIT_ITEM
  ) {
    const newStructure = JSON.stringify(store.getState().directories.structure);
    localStorage.setItem('structure', newStructure);
  }
};
