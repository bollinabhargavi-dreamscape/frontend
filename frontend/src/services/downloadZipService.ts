import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ApiService from '@app/services/Api.service';
import { AxiosRequestConfig } from 'axios';
import { ensureZipExtension } from '@app/utils/helpers';

export class DownloadModel {
  link: string = '';
  fileSize: number = 0;
  fileName: string = '';
}

export const getFile = async (url: string) => {
  const httpOptions: AxiosRequestConfig = {
    headers: {
      'Content-Type': getContentType(url),
    },
    responseType: 'blob',
  };

  try {
    const response = await ApiService.requests.get(url, httpOptions);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const downlodFile = async (
  fileInfo: any,
  setProgress: any,
  signal: any,
) => {
  try {
    const response = await fetch(fileInfo.SourceFilePath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      signal,
    });
    if (!response.body) {
      throw new Error('Response body is empty');
    }
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length')!;

    let receivedLength = 0;
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(value);
      receivedLength += value.length;
      const progress = Math.floor((receivedLength / contentLength) * 100);
      setProgress(progress);
    }
    const blob = new Blob(chunks);
    saveAs(blob, fileInfo.FileName);
    return;
  } catch (error: any) {
    console.error('Download error:', error);
    throw error;
  }
};

async function getFileSize(url: string) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
    });

    // Check if the response is successful
    if (response.ok) {
      // Extract the 'Content-Length' header, which represents the file size in bytes
      const contentLength = response.headers.get('Content-Length');

      // Convert to number and return the file size
      return contentLength ? parseInt(contentLength, 10) : null;
    } else {
      throw new Error(`Failed to fetch file metadata: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Example usage
async function createZip(
  files: any[],
  zipName: string,
  setProgress: any,
  signal: any,
) {
  try {
    const name = ensureZipExtension(zipName);
    const zip = new JSZip();

    // Step 1: Calculate total size of all files
    let totalSize = 0;
    const sizePromises = files.map(async (file) => {
      const res = await getFileSize(file.SourceFilePath);
      return res;
    });

    // Get the size of each file
    const blobs = await Promise.all(sizePromises);
    blobs.forEach((blob) => (totalSize += blob || 0));

    // Step 2: Process files and track progress based on size
    let processedSize = 0;

    // Use `Promise.all` to wait for all fetches and processing to complete
    await Promise.all(
      files.map(async (file) => {
        const response = await fetch(file.SourceFilePath, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          signal,
        });
        const reader: any = response?.body?.getReader();
        const chunks: Uint8Array[] = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          chunks.push(value);
          processedSize += value.length;
          const progress = Math.floor((processedSize / totalSize) * 100);
          setProgress(progress);
        }
        const blob = new Blob(chunks);
        zip.file(file.FileName, blob);
      }),
    );

    // Generate the zip file and save it
    zip.generateAsync({ type: 'blob' }).then((content) => {
      if (content) {
        saveAs(content, name);
      }
      return;
    });
  } catch (error: any) {
    console.error('Download error:', error);
    throw error;
  }
}

function getContentType(url: string): string {
  const extension: string = new RegExp(/(?:\.([^.]+))?$/)?.exec(url)?.[1] ?? '';
  switch (extension) {
    case 'pdf': {
      return 'application/pdf';
    }
    case 'xlsx': {
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }
    case 'xsl': {
      return 'application/vnd.ms-excel';
    }
    case 'csv': {
      return 'application/vnd.ms-excel';
    }
    case 'jpg': {
      return 'image/jpg';
    }
    case 'jpge': {
      return 'image/jpge';
    }
    default: {
      return 'application/json-patch+json';
    }
  }
}

const DownloadZipService = {
  getFile,
  createZip,
  downlodFile,
};

export default DownloadZipService;
