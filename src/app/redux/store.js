import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { teamReducers } from './reducers/teamReducers';

const rootReducer = {
  teams: teamReducers,
}
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})
export default store;

