export interface IEmployee {
  firstName: string;
  loginName: string;
  lastName: string;
  email: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  password?: string;
  passwordRetype?: string;
  manager: string;
  role: string;
  logo?: string | null;
  isActive?: true | null;
  modifyedBy?: string | null;
  userId?: string | null;
}
export interface IGetEmployee {
  Employee: IEmployee;
  CreatedDateTime: string;
}

export interface IUser {
  FirstName: string;
  LoginName: string;
  LastName: string;
  Email: string;
  PhoneNo: string;
}

export interface IClientDataResponse {
  User: IUser;
  Address1: string;
  Address2: string;
  City: string;
  State?: string;
  Country?: string;
  FilePreference?: any;
  IsActive: string;
}
