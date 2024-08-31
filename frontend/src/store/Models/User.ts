export interface IUserLogin {
  username: string;
  password: string;
  email?: string;
}
export interface IUser {
  id: string;
  firstName?: string;
  lastName?: string;
  loginName: string;
  password: string;
  phoneNo?: string;
  email: string;
  roleName?: string;
  companyId: string;
  companyName?: string;
  isAuthenticated?: boolean;
  token?: string;
  refreshToken: string;
  expiration: Date;
  filePreference: string;
  address1?: string;
  address2?: string;
  role?: string;
  city?: string;
  state?: string;
  country?: string;
  manager?: string;
  createdBy?: string;
}

export interface IAuthState {
  auth: IUser;
}

export interface IUserHttpResponse {
  data: IUser;
  isSuccess?: boolean;
}
export interface IUserPreferences {
  userId: string;
  website: string;
  defaultTat: string;
  IsPdfAllowed: boolean | undefined;
  IsDocAllowed: boolean | undefined;
  Password: string;
}
