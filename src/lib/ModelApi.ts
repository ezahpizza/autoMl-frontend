import { api } from './api';
import {
  ModelTrainResponse,
  ModelListResponse,
  ModelMetricsResponse,
  ModelPlotsResponse,
  ModelPredictionRequest,
  ModelPredictionResponse,
  ModelComparisonRequest,
  ModelComparisonResponse,
} from '@/types/model';

export const modelApi = {
  trainModel: async (formData: FormData) => {
    const response = await api.post<ModelTrainResponse>('/model/train', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  listModels: async (userId: string) => {
    const response = await api.get<ModelListResponse>(`/model/list/${userId}`);
    return response.data;
  },

  downloadModel: (filename: string) => {
    return `${api.defaults.baseURL}/model/download/${filename}`;
  },

  getMetrics: async (filename: string) => {
    const response = await api.get<ModelMetricsResponse>(`/model/metrics/${filename}`);
    return response.data;
  },

  getPlots: async (filename: string) => {
    const response = await api.get<ModelPlotsResponse>(`/model/plots/${filename}`);
    return response.data;
  },

  deleteModel: async (filename: string) => {
    const response = await api.delete(`/model/delete/${filename}`);
    return response.data;
  },

  predict: async (data: ModelPredictionRequest) => {
    const response = await api.post<ModelPredictionResponse>('/model/predict', data);
    return response.data;
  },

  compareModels: async (data: ModelComparisonRequest) => {
    const response = await api.post<ModelComparisonResponse>('/model/compare', data);
    return response.data;
  },
};