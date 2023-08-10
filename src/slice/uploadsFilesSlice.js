import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploadsFiles: []
};

const uploadsFilesSlice = createSlice({
  name: 'uploadsFiles',
  initialState,
  reducers: {
    setUploadsFiles(state, action) {
      state.uploadsFiles = action.payload;
    },
    setUploadStatus(state, action) {
      state.uploadsFiles.forEach((file) => {
        if ((file.fileData.path) === action.payload.path) {
          file.status = action.payload.status
        }
      })
    },
  }
});

export const {setUploadsFiles, setUploadStatus} = uploadsFilesSlice.actions;

export default uploadsFilesSlice.reducer;