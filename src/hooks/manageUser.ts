import { useMutation } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';
import { userApi } from '@/lib/userApi';
import { useToast } from '@/hooks/use-toast';

export const useCleanupUser = () => {
  const { user } = useUser();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      return userApi.cleanupUser(user.id);
    },
    onSuccess: (data) => {
      toast({
        title: 'All Data Deleted',
        description: `Deleted ${data.total_files_deleted} files and ${data.total_records_deleted} records.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Deletion Failed',
        description: error?.message || 'Failed to delete user data.',
        variant: 'destructive',
      });
    },
  });
};
