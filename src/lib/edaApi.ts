import { api } from './api';
import { EDAResponse, EDAReport, EDAHistoryItem, APIResponse } from '@/types/eda';

export const edaApi = {
  // Generate EDA report
  generateEDA: async (formData: FormData) => {
    const response = await api.post<EDAResponse>('/eda/generate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // List all EDA reports
  listReports: async (userId: string) => {
    const response = await api.get<APIResponse<EDAReport>>(`/eda/list/${userId}`);
    return response.data;
  },

  // Get EDA history
  getHistory: async (userId: string) => {
    const response = await api.get<APIResponse<EDAHistoryItem>>(`/eda/history/${userId}`);
    return response.data;
  },

  // Delete EDA report
  deleteReport: async (filename: string) => {
    const response = await api.delete(`/eda/delete/${filename}`);
    return response.data;
  },

  // Get view URL for iframe
  getViewUrl: (filename: string) => {
    return `${api.defaults.baseURL}/eda/view/${filename}`;
  },

  // Get download URL
  getDownloadUrl: (filename: string) => {
    return `${api.defaults.baseURL}/eda/download/${filename}`;
  },
};
