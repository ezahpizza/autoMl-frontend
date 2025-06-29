import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ModelComparisonResult } from '@/types/model';

interface ModelComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparison: ModelComparisonResult | null;
}

const ModelComparisonModal: React.FC<ModelComparisonModalProps> = ({ isOpen, onClose, comparison }) => {
  if (!comparison) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white px-4 py-6">
        <DialogHeader className="pb-4">
          <DialogTitle className="font-biorhyme text-persian-indigo text-lg md:text-xl">
            Model Comparison Results
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm font-fira-code text-persian-indigo">
          {/* Summary Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <strong>Total Models:</strong> {comparison.total_models}
            </div>
            <div className="md:col-span-2 break-words">
              <strong>Best Model:</strong> {comparison.best_model.model_name}
              <span className="ml-1"><br/>(Score: {comparison.best_model.score}, Dataset: {comparison.best_model.dataset})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><strong>Average Score:</strong> {comparison.statistics.average_score.toFixed(4)}</div>
            <div><strong>Score Range:</strong> {comparison.statistics.score_range.toFixed(4)}</div>
            <div className="md:col-span-2 lg:col-span-1 break-words">
              <strong>Model Types:</strong> {comparison.statistics.model_types.join(', ')}
            </div>
          </div>

          {/* Responsive Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparison.models.map((m) => (
              <div
                key={m.filename}
                className="rounded-md border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all bg-white"
              >
                <div className="mb-2 text-base font-semibold text-persian-indigo">{m.dataset_name}</div>
                <div className="text-xs text-gray-500 mb-1">Target: <span className="text-gray-700">{m.target_column}</span></div>
                <div className="text-xs text-gray-500 mb-1">Best Model: <span className="text-gray-700">{m.best_model}</span></div>
                <div className="text-xs text-gray-500 mb-1">Score: <span className="text-gray-700">{m.score.toFixed(4)}</span></div>
                <div className="text-xs text-gray-500 mb-1">Model Type: <span className="text-gray-700">{m.model_type}</span></div>
                <div className="text-xs text-gray-500 mb-1">Training Time: <span className="text-gray-700">{m.training_time ? `${m.training_time.toFixed(2)}s` : '-'}</span></div>
                <div className="text-xs text-gray-500 mb-1">Dataset Size: <span className="text-gray-700">{m.dataset_size}</span></div>
                <div className="text-xs text-gray-500">Created At: <span className="text-gray-700 break-words">{m.created_at}</span></div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


export default ModelComparisonModal;
