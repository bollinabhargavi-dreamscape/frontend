import ApiService from '@app/services/Api.service';
import { AxiosResponse } from 'axios';

const getJobs = async (
  userId: string,
  searchJobId: string | null,
  jobStatus: string,
  createdBy: string,
  filename: string | null = null,
  fromDate: string | null = null,
  toDate: string | null = null,
  initialLoad: boolean = false,
) => {
  // Construct query parameters
  const params = new URLSearchParams();
  params.append('userId', userId);
  if (searchJobId) params.append('jobId', searchJobId);
  if (jobStatus) params.append('jobStatus', jobStatus);
  if (createdBy) params.append('createdBy', createdBy);
  if (filename) params.append('filename', filename);
  if (fromDate) params.append('fromDate', fromDate);
  if (toDate) params.append('toDate', toDate);
  params.append('initialLoad', initialLoad.toString());
  // Send request
  try {
    const response: AxiosResponse = await ApiService.requests.get(
      `Job/getjobs?${params.toString()}`,
    );
    return response?.data ?? {};
  } catch (error: any) {
    console.log('Failre in job service - get jobs', error);
    throw error;
  }
};

const deleteJob = async (jobId: string, userId: string, status: string) => {
  try {
    const response: AxiosResponse = await ApiService.requests.get(
      `Job/deletejob?jobId=${jobId}&userId=${userId}&status=${status}`,
    );
    return response?.data ?? {};
  } catch (error: any) {
    console.log('Failre in job service - get jobs', error);
    throw error;
  }
};
const updateJobStatus = async (
  jobId: string,
  userId: string,
  status: string,
) => {
  try {
    const response: AxiosResponse = await ApiService.requests.get(
      `Job/updateJobStatus?jobId=${jobId}&userId=${userId}&status=${status}`,
    );
    return response?.data ?? {};
  } catch (error: any) {
    console.log('Failre in job service - get jobs', error);
    throw error;
  }
};

const getJob = async (jobId: string) => {
  try {
    const response: AxiosResponse = await ApiService.requests.get(
      `Job/getJob?jobId=${jobId}`,
    );
    return response?.data ?? {};
  } catch (error: any) {
    console.log('Failre in job service - get jobs', error);
    throw error;
  }
};

const mergeJobs = async (
  jobIds: string[],
  userId: string,
  createdBy: string,
  companyId: string,
) => {
  try {
    const response: AxiosResponse = await ApiService.requests.post(
      `Job/mergejobs`,
      { jobIds, userId, createdBy, companyId },
    );
    return response?.data ?? {};
  } catch (error: any) {
    console.log('Failre in job service - get jobs', error);
    throw error;
  }
};

const postJobs = async (data: any) => {
  try {
    const response: AxiosResponse = await ApiService.requests.post(
      'Upload/SaveJob',
      data,
    );
    return response?.data ?? {};
  } catch (error: any) {
    console.log('Failre in job service - get jobs', error);
    throw error;
  }
};

const JobService = {
  getJobs,
  deleteJob,
  updateJobStatus,
  mergeJobs,
  postJobs,
  getJob,
};

export default JobService;
