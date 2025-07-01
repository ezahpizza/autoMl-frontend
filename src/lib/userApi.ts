import { api } from './api';
import { CleanupResponse } from '@/types/user';

export const userApi = {
  cleanupUser: async (userId: string) => {
    const response = await api.post<CleanupResponse>(
        `/cleanup/user/${userId}?confirm=true`
    );
    return response.data;
  },
};
