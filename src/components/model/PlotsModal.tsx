import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModelPlots } from '@/hooks/useModelFeatures';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlotsModalProps {
  isOpen: boolean;
  onClose: () => void;
  filename: string | null;
}

const PlotsModal: React.FC<PlotsModalProps> = ({ isOpen, onClose, filename }) => {
  const { data, isLoading, error } = useModelPlots(filename);
  const plots = data?.plots || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-7xl max-h-[90vh] bg-white">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="font-biorhyme text-persian-indigo text-lg md:text-xl">
            Model Plots
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-8 text-persian-indigo">Loading plots...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">Failed to load plots.</div>
          ) : plots.length === 0 ? (
            <div className="text-center py-8 text-persian-indigo/60">No plots available for this model.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs md:text-sm font-fira-code border">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 border-b text-left min-w-[150px]">File Name</th>
                    <th className="px-3 py-2 border-b text-left min-w-[120px]">Plot Type</th>
                    <th className="px-3 py-2 border-b text-left min-w-[100px]">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {plots.map((plot) => (
                    <tr key={plot.filename} className="hover:bg-gray-50">
                      <td className="px-3 py-2 border-b text-left">{plot.filename}</td>
                      <td className="px-3 py-2 border-b text-left">{plot.plot_type}</td>
                      <td className="px-3 py-2 border-b text-left">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-pumpkin-orange text-pumpkin-orange w-full md:w-auto"
                        >
                          <a href={plot.url} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-1" />
                            <span className="hidden md:inline">Download</span>
                            <span className="md:hidden">Get</span>
                          </a>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlotsModal;