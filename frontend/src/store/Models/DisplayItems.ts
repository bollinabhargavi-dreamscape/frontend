import { IUIState } from '../reducers/ui';

export interface SmallBoxProps {
  type: 'info' | 'success' | 'warning' | 'danger';
  icon?: string;
  count: number;
  title: string;
  navigateTo: string;
}

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export interface IUploadForm {
  uploadfiles: any[];
  tat: string;
  comment: string;
  uploadtype: boolean;
  companyId: string;
  createdBy: string;
  mergeFilename: string;
}

export default interface IDashboard {
  recordCount: number;
  color: string;
  icon: string;
  title: string;
  link: string;
  sortOrder: number;
}

export interface FormValues {
  fromPageNo: string;
  toPageNo: string;
  splitJobId: string;
  employee: string;
  empJobId: string;
  pageCount: string;
}

export interface SplitJobData extends FormValues {
  id: string;
}

export interface IRootState {
  ui: IUIState;
}

export interface IDropDownListObj {
  label: string;
  value: string;
}
export interface IIdValueSet {
  id: string;
  value: string;
}

export interface IIdValueSetResponse {
  data: IIdValueSet[];
  isSuccess: boolean;
}
