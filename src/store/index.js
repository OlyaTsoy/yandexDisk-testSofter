import {configureStore } from '@reduxjs/toolkit';
import currentSelectedFilesSlice from '../slice/currentSelectedFilesSlice';
import filesSlice from '../slice/filesSlice';
import uploadsFilesSlice from '../slice/uploadsFilesSlice';


export const store = configureStore({
  reducer: {
    currentSelected: currentSelectedFilesSlice,
    files: filesSlice,
    uploadsFiles: uploadsFilesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    }),
});