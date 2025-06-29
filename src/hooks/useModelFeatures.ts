import { ModelPredictionResponse } from '@/types/model';
import { ModelComparisonResponse } from '@/types/model';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';
import { modelApi } from '@/lib/ModelApi';
import { useToast } from '@/hooks/use-toast';

export const useModelMetrics = (filename?: string | null) => {
  return useQuery({
    queryKey: ['model-metrics', filename],
    queryFn: () => filename ? modelApi.getMetrics(filename) : Promise.resolve(null),
    enabled: !!filename,
    staleTime: 5 * 60 * 1000,
  });
};

export const useModelPlots = (filename?: string | null) => {
  return useQuery({
    queryKey: ['model-plots', filename],
    queryFn: () => filename ? modelApi.getPlots(filename) : Promise.resolve(null),
    enabled: !!filename,
    staleTime: 5 * 60 * 1000,
  });
};

export const useModelPredict = () => {
  const { user } = useUser();
  const { toast } = useToast();
  return useMutation<ModelPredictionResponse, unknown, { model_filename: string; input_data: Record<string, any> }>({
    mutationFn: ({ model_filename, input_data }) => {
      if (!user?.id) throw new Error('User not authenticated');
      return modelApi.predict({ user_id: user.id, model_filename, input_data });
    },
    onError: () => {
      toast({
        title: 'Prediction Failed',
        description: 'Failed to get prediction. Please try again.',
        variant: 'destructive',
      });
    },
  });
};

export const useModelList = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: ['model-list', user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error('User ID not available');
      return modelApi.listModels(user.id);
    },
    enabled: !!user?.id,
  });
};

export const useTrainModel = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: { file: File; datasetName?: string; targetColumn: string; modelType: string }) => {
      if (!user?.id) throw new Error('User not authenticated');
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('user_id', user.id);
      formData.append('target_column', data.targetColumn);
      if (data.datasetName) formData.append('dataset_name', data.datasetName);
      formData.append('model_types', data.modelType);
      return modelApi.trainModel(formData);
    },
    onSuccess: (data) => {
      toast({
        title: "Model Trained Successfully",
        description: `Model for ${data.dataset_name} is ready to download`,
      });
      queryClient.invalidateQueries({ queryKey: ['model-list'] });
    },
    onError: (error) => {
      toast({
        title: "Training Failed",
        description: "Failed to train model. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteModel = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: modelApi.deleteModel,
    onSuccess: () => {
      toast({
        title: "Model Deleted",
        description: "Model has been successfully deleted",
      });
      queryClient.invalidateQueries({ queryKey: ['model-list'] });
    },
    onError: () => {
      toast({
        title: "Deletion Failed",
        description: "Failed to delete model. Please try again.",
        variant: "destructive",
      });
    },
  });
};


export const useCompareModels = () => {
  const { user } = useUser();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (modelFilenames: string[]) => {
      if (!user?.id) throw new Error('User not authenticated');
      return modelApi.compareModels({ user_id: user.id, model_filenames: modelFilenames }) as Promise<ModelComparisonResponse>;
    },
    onError: () => {
      toast({
        title: 'Comparison Failed',
        description: 'Failed to compare models. Please try again.',
        variant: 'destructive',
      });
    },
  });
};