import { removeWindowClass } from '@app/utils/helpers';
import APIService from './Api.service';
import { IUser } from '@app/store/Models/User';

export const loginByAuth = async () => {
  const token = 'I_AM_THE_TOKEN';
  localStorage.setItem('token', token);
  removeWindowClass('login-page');
  removeWindowClass('hold-transition');
  return token;
};

export const registerByAuth = async () => {
  const token = 'I_AM_THE_TOKEN';
  localStorage.setItem('token', token);
  removeWindowClass('register-page');
  removeWindowClass('hold-transition');
  return token;
};

export const user = {
  login: (user: IUser) => APIService.requests.post('Account/LoginUser', user),
};
