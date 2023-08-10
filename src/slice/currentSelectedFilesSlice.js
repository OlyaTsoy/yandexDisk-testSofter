import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentSelectedFiles: []
};

const currentSelectedFilesSlice = createSlice({
  name: 'currentSelectedFiles',
  initialState,
  reducers: {
    selectFile(state, action) {
      if (state.currentSelectedFiles.includes(action.payload)) {
        state.currentSelectedFiles.splice(state.currentSelectedFiles.indexOf(action.payload), 1);
      } else {
        state.currentSelectedFiles.push(action.payload);
      }
    },
    deselectAll(state) {
      state.currentSelectedFiles = [];
    }
  }
});

export const {setCurrentSelectedFiles, selectFile, deselectAll} = currentSelectedFilesSlice.actions;

export default currentSelectedFilesSlice.reducer;