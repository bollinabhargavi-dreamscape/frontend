import { UserManager, UserManagerSettings } from 'oidc-client-ts';
import { sleep } from './helpers';
import ApiService from '@app/services/Api.service';
import { IUser, IUserLogin } from '@app/store/Models/User';
import { AxiosResponse } from 'axios';
import { IClient } from '@app/store/Models/Client';
import { IEmployee } from '@app/store/Models/Employee';

declare const FB: any;

const GOOGLE_CONFIG: UserManagerSettings = {
  authority: 'https://accounts.google.com',
  client_id: '',
  client_secret: '',
  redirect_uri: `${window.location.protocol}//${window.location.host}/callback`,
  scope: 'openid email profile',
  loadUserInfo: true,
};

export const GoogleProvider = new UserManager(GOOGLE_CONFIG);

export const facebookLogin = () => {
  return new Promise((res, rej) => {
    let authResponse: any;
    FB.login(
      (r: any) => {
        if (r.authResponse) {
          ({ authResponse } = r);
          FB.api(
            '/me?fields=id,name,email,picture.width(640).height(640)',
            (profileResponse: any) => {
              authResponse.profile = profileResponse;
              authResponse.profile.picture = profileResponse.picture.data.url;
              res(authResponse);
            },
          );
        } else {
          console.log('User cancelled login or did not fully authorize.');
          rej(undefined);
        }
      },
      { scope: 'public_profile,email' },
    );
  });
};

export const getFacebookLoginStatus = () => {
  return new Promise((res, rej) => {
    let authResponse: any = {};
    FB.getLoginStatus((r: any) => {
      if (r.authResponse) {
        ({ authResponse } = r);
        FB.api(
          '/me?fields=id,name,email,picture.width(640).height(640)',
          (profileResponse: any) => {
            authResponse.profile = profileResponse;
            authResponse.profile.picture = profileResponse.picture.data.url;
            res(authResponse);
          },
        );
      } else {
        rej(undefined);
      }
    });
  });
};

export const authLogin = async (user: IUserLogin) => {
  try {
    const response: AxiosResponse = await ApiService.requests.post(
      'user/verifylogin',
      user,
    );
    if (response?.data) {
      if (response?.data?.data) response.data.data.isAuthenticated = true;
      localStorage.setItem(
        'authentication',
        JSON.stringify(response?.data?.data),
      );
      return response?.data ?? {};
    }
  } catch (error) {
    console.log('Failed to call login service', error);
    throw error;
  }
};

export const forgotPasswordAPI = async (username: string) => {
  try {
    const response: AxiosResponse = await ApiService.requests.post(
      '/user/forgotPassword',
      { username },
    );
    if (response?.data) {
      return response?.data ?? {};
    }
  } catch (error) {
    console.log('Failed to call login service', error);
    throw error;
  }
};

export const resetPasswordAPI = async (username: string, password: string) => {
  try {
    const response: AxiosResponse = await ApiService.requests.post(
      '/user/resetPassword',
      { username, password },
    );
    if (response?.data) {
      return response?.data ?? {};
    }
  } catch (error) {
    console.log('Failed to call login service', error);
    throw error;
  }
};

export const getAuthStatus = async () => {
  try {
    await sleep(500);
    const authentication = localStorage.getItem('authentication');
    if (authentication) {
      return JSON.parse(authentication);
    } else {
      return undefined;
    }
  } catch (error) {
    console.log('Failed to get auth status', error);
    throw error;
  }
};

export const RegisterUser = async (user: IClient) => {
  try {
    const response = await ApiService.requests.post('client/register', user);
    if (response) {
      return response;
    } else {
      throw new Error(response || 'An unknown error occurred');
    }
  } catch (error) {
    console.log('Failed to register user', error);
    throw error;
  }
};

export const CreateEmployee = async (user: IEmployee) => {
  try {
    const response = await ApiService.requests.post('employee/register', user);

    if (response) {
      return response;
    } else {
      throw new Error(response || 'An unknown error occurred');
    }
  } catch (error) {
    console.log('Failed to create employee', error);
    throw error;
  }
};

export const refreshToken = async (user: IUser) => {
  try {
    const response = await ApiService.requests.post(
      'Login/refresh-token',
      user,
    );
    if (response.data) {
      response.data.isAuthenticated = true;
      localStorage.removeItem('authentication');
      localStorage.setItem('authentication', JSON.stringify(response.data));
      return response;
    } else {
      throw new Error('An unknown error occurred');
    }
  } catch (error) {
    console.log('Failed to refresh token', error);
    throw error;
  }
};

export const formatNumber = (phone: string) => {
  // Assuming the phone number is a 10-digit string
  const phoneNumber = phone.replace(/\D/g, ''); // Remove non-digit characters
  const country = '+1';
  const area = phoneNumber.substring(0, 3);
  const middle = phoneNumber.substring(3, 6);
  const last = phoneNumber.substring(6, 10);

  return `${country} (${area}) ${middle}-${last}`;
};
