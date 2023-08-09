import {configureStore} from '@reduxjs/toolkit';
import currentSelectedFilesSlice from '../slice/currentSelectedFilesSlice';
import filesSlice from '../slice/filesSlice';

export const store = configureStore({
  reducer: {
    currentSelected: currentSelectedFilesSlice,
    files: filesSlice,
  },
});