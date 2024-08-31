import IUploadFiles from './UploadFiles';

export interface IJob {
  id: string;
  jobId: number;
  name: string;
  priority: string;
  notes: string;
  isSingleJob: boolean;
  parentJobId: string;
  assignTo: string;
  l1User: string;
  l2User: string;
  l3User: string;
  status: string;
  statusName: string;
  isDeleted: boolean;
  companyId: string;
  createdBy: string;
  modifyedBy: string;
  createdDateTime: Date;
  modifiedDateTime: Date;
  jobFiles: string;
  userName: string;
  unReadMessages: number;
  filePreference: string;
  tat: string;
  files?: string;
  uploadFiles?: string;
  uid?: string;
}
export interface IMergeJob {
  JobIds: string[];
  UserId: string;
  CreatedBy: string;
  CompanyId: string;
}

export interface IFilePreference {
  filePreference: string;
  uploadFiles: IUploadFiles[];
}

export interface IJobResponse {
  data: IJob[];
  isSuccess: boolean;
}

export interface IGenericResponse {
  isSuccess?: boolean;
  message?: string;
  data?: number;
}
