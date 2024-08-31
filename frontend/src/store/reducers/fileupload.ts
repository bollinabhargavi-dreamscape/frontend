import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUploadFiles from '../Models/UploadFiles';

interface FileUploadState {
  uploadfile: Array<IUploadFiles>;
  fileupload: boolean;
}
const initialState: FileUploadState = {
  uploadfile: [],
  fileupload: false,
};

export const fileUploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setUploadedFiles: (
      state: { uploadfile: Array<IUploadFiles> },
      action: PayloadAction<IUploadFiles>,
    ) => {
      state.uploadfile?.push({
        filename: action.payload.filename,
        fileId: action.payload.fileId,
        size: action.payload.size,
        fileextension: action.payload.fileextension,
        filepath: action.payload.filepath,
        pageCount: action.payload.pageCount,
      });
    },
    removeUploadedFiles: (state: { uploadfile: Array<IUploadFiles> }) => {
      state?.uploadfile?.pop?.();
    },
    setfileUpload: (state: { fileupload: boolean }) => {
      state.fileupload = !state.fileupload;
    },
    removeAllUploadedFiles: (state: { uploadfile: Array<IUploadFiles> }) => {
      state.uploadfile.length = 0;
    },
  },
});

export const {
  setUploadedFiles,
  removeUploadedFiles,
  removeAllUploadedFiles,
  setfileUpload,
} = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
