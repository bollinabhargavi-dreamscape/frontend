export default interface IUploadFiles {
  filename: string;
  fileId: string;
  fileextension: string;
  filepath: string;
  size: number;
  pageCount: any;
}

export interface IUploadFilesPayload {
  jobId: string;
  UploadFiles: any[]; // Replace `any[]` with a more specific type if available
  createdBy: string;
}

export interface IJobFiles {
  FileExtension: string;
  FileName: string;
  Id: string;
  IsUploadFile?: boolean;
  PageCount: number;
  sourceFilePath: string;
}
