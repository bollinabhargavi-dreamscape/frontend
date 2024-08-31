import ApiService from '@app/services/Api.service';
import { AxiosResponse } from 'axios';

const getEmployees = async () => {
  try {
    const response: AxiosResponse = await ApiService.requests.get(
      `employee/getemployees`,
    );
    return response?.data ?? {};
  } catch (error: any) {
    console.log('Failed in all employee', error);
    throw error;
  }
};

const getEmployeeData = async (employeeId: string) => {
  try {
    const response: AxiosResponse = await ApiService.requests.get(
      `employee/employeedata?userId=${employeeId}`,
    );
    return response?.data ?? {};
  } catch (error: any) {
    console.log('An error occurred in fetching employee data', error);
    throw error;
  }
};

const updateEmployeeDetails = async (user: AxiosResponse) => {
  try {
    const response: AxiosResponse = await ApiService.requests.patch(
      'employee/update',
      user,
    );
    return response?.data ?? {};
  } catch (error: any) {
    console.log('An error occurred in updating employee details', error);
    throw error;
  }
};

const EmployeesService = {
  getEmployees,
  getEmployeeData,
  updateEmployeeDetails,
};

export default EmployeesService;
