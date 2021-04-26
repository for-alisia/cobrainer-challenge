/** Dependencies */
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistMiddleware } from '../middlewares/persist.middleware';

/** Reducers */
import rootReducer from './root-reducer';

const middlewares = [logger, persistMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
