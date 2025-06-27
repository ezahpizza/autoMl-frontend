
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';
import { edaApi } from '@/lib/edaApi';
import { useToast } from '@/hooks/use-toast';

export const useEdaReports = () => {
  const { user } = useUser();

  return useQuery({
    queryKey: ['eda-reports', user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error('User ID not available');
      return edaApi.listReports(user.id);
    },
    enabled: !!user?.id,
  });
};

export const useEdaHistory = () => {
  const { user } = useUser();

  return useQuery({
    queryKey: ['eda-history', user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error('User ID not available');
      return edaApi.getHistory(user.id);
    },
    enabled: !!user?.id,
  });
};

export const useGenerateEDA = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: { file: File; datasetName?: string }) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('user_id', user.id);
      if (data.datasetName) {
        formData.append('dataset_name', data.datasetName);
      }
      
      return edaApi.generateEDA(formData);
    },
    onSuccess: (data) => {
      toast({
        title: "EDA Generated Successfully",
        description: `Report for ${data.dataset_name} is ready to view`,
      });
      queryClient.invalidateQueries({ queryKey: ['eda-reports'] });
      queryClient.invalidateQueries({ queryKey: ['eda-history'] });
    },
    onError: (error) => {
      console.error('Failed to generate EDA:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate EDA report. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteEDA = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: edaApi.deleteReport,
    onSuccess: () => {
      toast({
        title: "Report Deleted",
        description: "EDA report has been successfully deleted",
      });
      queryClient.invalidateQueries({ queryKey: ['eda-reports'] });
      queryClient.invalidateQueries({ queryKey: ['eda-history'] });
    },
    onError: (error) => {
      console.error('Failed to delete EDA:', error);
      toast({
        title: "Deletion Failed",
        description: "Failed to delete EDA report. Please try again.",
        variant: "destructive",
      });
    },
  });
};
