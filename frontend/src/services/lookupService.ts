import ApiService from '@app/services/Api.service';
import { AxiosResponse } from 'axios';

export const getUsers = async (role: string) => {
  try {
    const response: AxiosResponse = await ApiService.requests.get(
      `Lookup/getuserlookup?role=${role}`,
    );
    return response?.data ?? {};
  } catch (error) {
    console.log('Failre in job service - get jobs', error);
    throw error;
  }
};

export const getStatus = async (type: string) => {
  try {
    const response: AxiosResponse = await ApiService.requests.get(
      `Lookup/getstatuslookup?type=${type}`,
    );
    return response?.data ?? {};
  } catch (error) {
    console.log('Failre in job service - get jobs', error);
    throw error;
  }
};

const LookupService = {
  getUsers,
  getStatus,
};

export default LookupService;
