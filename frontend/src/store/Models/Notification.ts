export interface IDialog {
  title: string;
  okBottonText?: string;
  cancelBottonText?: string;
  details?: object | any;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  reloadGridData: Function;
}

export interface INotificationForm {
  comments: string;
  jobId: string;
  userId: string;
}
