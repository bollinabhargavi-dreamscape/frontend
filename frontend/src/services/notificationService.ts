import ApiService from '@app/services/Api.service';
import { AxiosResponse } from 'axios';

const getNotifications = async (jobId: string, userId: string) => {
  try {
    const response: AxiosResponse = await ApiService.requests.get(
      `Notification/getnotifications?jobId=${jobId}&userId=${userId}`,
    );
    return response?.data ?? {};
  } catch (error: any) {
    console.log('Failed in get Notifications', error);
    throw error;
  }
};

const saveNotification = async (data: any) => {
  try {
    const response: AxiosResponse = await ApiService.requests.post(
      `Notification/savenotification`,
      data,
    );
    return response?.data ?? {};
  } catch (error: any) {
    console.log('Failed in save Notification', error);
    throw error;
  }
};

const NotificationService = {
  getNotifications,
  saveNotification,
};

export default NotificationService;
