import ApiService from '@app/services/Api.service';
import { AxiosResponse } from 'axios';

const getDashboardDetails = async (userId: string) => {
  try {
    const response: AxiosResponse = await ApiService.requests.get(
      `dashboard?username=${userId}`,
    );
    return response?.data ?? {};
  } catch (error: any) {
    console.log('Failed in get employee', error);
    throw error;
  }
};

const DashboardService = {
  getDashboardDetails,
};

export default DashboardService;
