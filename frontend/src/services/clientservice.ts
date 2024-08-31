import ApiService from '@app/services/Api.service';
import { AxiosResponse } from 'axios';

const getClients = async () => {
  try {
    const response: AxiosResponse =
      await ApiService.requests.get(`client/GetClients`);
    return response?.data ?? {};
  } catch (error: any) {
    console.log('An error occurred in fetching client list', error);
    throw error;
  }
};
const getClientData = async (clientId: string) => {
  try {
    const response: AxiosResponse = await ApiService.requests.get(
      `client/clientdata?userId=${clientId}`,
    );
    return response?.data?.data ?? {};
  } catch (error: any) {
    console.log('An error occurred in fetching client', error);
    throw error;
  }
};

const updateClientDetails = async (user: AxiosResponse) => {
  try {
    const response: AxiosResponse = await ApiService.requests.patch(
      'client/update',
      user,
    );
    return response?.data ?? {};
  } catch (error: any) {
    console.log('An error occurred in updating client details', error);
    throw error;
  }
};
const ClientService = {
  getClients,
  getClientData,
  updateClientDetails,
};

export default ClientService;
