import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './reduxSlice';


export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});


