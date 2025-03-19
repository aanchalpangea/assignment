import { combineReducers } from '@reduxjs/toolkit';

// Import your reducers here
// import exampleReducer from './reducers/exampleReducer';

const rootReducer = combineReducers({
  // Add your reducers here
  // example: exampleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
