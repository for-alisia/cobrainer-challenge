/** Dependencies */
import { combineReducers } from 'redux';

/** Reducers */
import directoryReducer from './directories/directory.reducer';

const rootReducer = combineReducers({
  directories: directoryReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
