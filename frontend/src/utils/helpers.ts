import { IAuthState } from '@app/store/Models/User';
import { useSelector } from 'react-redux';

export const sleep = (time: number) =>
  new Promise((res) => setTimeout(res, time));

export const calculateWindowSize = (windowWidth: number) => {
  if (windowWidth >= 1200) {
    return 'lg';
  }
  if (windowWidth >= 992) {
    return 'md';
  }
  if (windowWidth >= 768) {
    return 'sm';
  }
  return 'xs';
};

export const setWindowClass = (classList: string) => {
  const window: HTMLElement | null =
    document && document.getElementById('root');
  if (window) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.classList = classList;
  }
};
export const addWindowClass = (classList: string) => {
  const window: HTMLElement | null =
    document && document.getElementById('root');
  if (window) {
    window.classList.add(classList);
  }
};

export const removeWindowClass = (classList: string) => {
  const window: HTMLElement | null =
    document && document.getElementById('root');
  if (window) {
    window.classList.remove(classList);
  }
};

export const convertUrlToFilePath = (url: string) => {
  if (!url) return '';
  // Create a URL object to parse the URL
  const parsedUrl = new URL(url);

  // Extract the pathname from the URL
  let path = parsedUrl.pathname;

  // Decode URL-encoded characters
  path = decodeURIComponent(path);

  // Remove the leading '/' from the pathname
  path = path.replace(/^\/+/, '');

  // Replace '%2F' with '/' and '%5B' and '%5D' with '[' and ']' respectively
  path = path
    .replace(/%2F/g, '/')
    .replace(/%5B/g, '[')
    .replace(/%5D/g, ']')
    .replace(/\+/g, ' ');

  return path;
};

export const getFileIcon = (fileExt: string) => {
  switch (fileExt) {
    case 'pdf':
    case '.pdf':
    case 'pdflink':
    case '.pdflink':
      return 'fa-file-pdf-o text-danger';
    case 'doc':
    case '.doc':
    case 'docx':
    case '.docx':
      return 'fa-file-word-o text-primary';
    default:
      return 'fa-file text-info';
  }
};

export const diffHours = (modifiedDate: Date, todayDate: Date) => {
  // Calculate the difference in milliseconds between the two provided Date objects by subtracting the milliseconds value of dt1 from the milliseconds value of dt2
  let diff = (todayDate.getTime() - modifiedDate.getTime()) / 1000;
  // Convert the difference from milliseconds to hours by dividing it by the number of seconds in an hour (3600)
  diff /= 60 * 60;
  // Return the absolute value of the rounded difference in hours
  return Math.abs(Math.round(diff));
};

export const IsValidString = (value: string): boolean => {
  return value?.trim?.().length > 0;
};

export const authName = () => {
  const parsedToken = useSelector((state: IAuthState) => state.auth);
  let userName: string = `${parsedToken?.firstName ?? ''}${parsedToken?.firstName ? ' ' : ''}${parsedToken?.lastName ?? ''}`;
  userName = userName?.trim?.();
  if (!userName || userName?.length <= 0) {
    userName = parsedToken?.loginName;
  }
  return userName;
};

export const capitalizeFirstLetter = (value: string) =>
  value?.charAt(0).toUpperCase() + value?.slice?.(1);

export const ensureZipExtension = (fileName: string) => {
  if (!fileName) return '';
  fileName = String(fileName);
  if (fileName?.endsWith('.zip')) {
    return fileName;
  } else {
    return fileName + '.zip';
  }
};

/**
 * Checks the input is Array of not
 *
 * @method IsArray
 * @param {array} arr input array
 *
 * @return {boolean} boolean value indicating the array status
 */
export const IsArray = (arr: []) =>
  typeof arr === 'object' && arr instanceof Array;

/**
 * Checks an Arry is empty or not
 *
 * @method IsEmptyArray
 * @param {array} arr input array
 *
 * @return {boolean} boolean value indicating the array status
 */
export const IsEmptyArray = (arr: []) => !(IsArray(arr) && arr.length > 0);

/**
 * Checks an Object is empty or not
 *
 * @method IsEmptyObject
 * @param {object} obj input object
 *
 * @return {boolean} boolean value indicating the object status
 */
export const IsEmptyObject = (obj: object) =>
  !(
    typeof obj === 'object' &&
    !(obj instanceof Array) &&
    obj !== null &&
    Object.keys(obj).length > 0
  );

/**
 * Checks an Object is valid
 *
 * @method IsValidObject
 * @param {object} obj input object
 *
 * @return {boolean} boolean value indicating the object status
 */
export const IsValidObject = (obj: object) =>
  typeof obj === 'object' && !(obj instanceof Array) && obj !== null;

// Function to check if a timestamp is valid and compare it with the current time
export function isTimestampValidAndCompare(timestamp: string): boolean {
  // Convert the timestamp to a number
  const timestampNumber = Number(timestamp);

  // Check if the conversion was successful and the timestamp is valid
  if (isNaN(timestampNumber) || timestampNumber <= 0) {
    console.error('Invalid timestamp');
    return false;
  }

  // Convert timestamp to a Date object
  const timestampDate = new Date(timestampNumber);

  // Check if the Date object is valid
  if (isNaN(timestampDate.getTime())) {
    console.error('Invalid Date object');
    return false;
  }

  // Get the current time
  const now = new Date();

  // Compare the timestamp date with the current time
  return timestampDate > now;
}
