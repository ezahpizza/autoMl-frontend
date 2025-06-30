// SandboxModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModelMetrics, useModelPredict } from '@/hooks/useModelFeatures';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  filename: string | null;
}

const SandboxModal = ({ isOpen, onClose, filename }: SandboxModalProps) => {
  const { user } = useUser();
  const [inputData, setInputData] = useState<Record<string, any>>({});
  const [inputFields, setInputFields] = useState<string[]>([]);
  const [showPrediction, setShowPrediction] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);

  const { data: metricsData, isLoading: metricsLoading } = useModelMetrics(filename ?? undefined);
  const predictMutation = useModelPredict();

  useEffect(() => {
    if (metricsData && metricsData.metrics) {
      let features: string[] = [];
      features = metricsData.metrics.feature_names;

      setInputFields(features);
      setInputData(features.reduce((acc, f) => ({ ...acc, [f]: '' }), {}));
    }
  }, [metricsData]);

  const handleInputChange = (field: string, value: string) => {
    setInputData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filename || !user?.id) return;
    predictMutation.mutate(
      { model_filename: filename, input_data: inputData },
      {
        onSuccess: (data) => {
          setPredictionResult(data);
          setShowPrediction(true);
        },
      }
    );
  };

    const renderMetrics = () => {
      if (metricsLoading) return <div className="text-xs text-center py-2">Loading metrics...</div>;
      if (!metricsData || !metricsData.metrics) return <div className="text-xs text-center py-2">No metrics available.</div>;

      return (
        <div className="mb-3 w-full">
          <div className="font-medium text-persian-indigo mb-2 text-sm">Model Metrics</div>
          <div className="w-full">
            <table className="w-full text-xs md:text-sm border rounded-md table-fixed">
              <tbody>
                {Object.entries(metricsData.metrics)
                  .filter(([k, v]) => typeof v !== 'object' || Array.isArray(v))
                  .map(([key, value]) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="px-2 py-1 font-medium border-b border-gray-200 bg-gray-50 align-top w-1/3 break-words">
                        {key}
                      </td>
                      <td className="px-2 py-1 border-b border-gray-100 break-words">
                        {Array.isArray(value) ? value.join(', ') : String(value)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };


    const renderPrediction = () => {
      if (!showPrediction || !predictionResult) return null;

      return (
        <div className="mt-4 p-3 md:p-4 bg-gray-50 rounded-md border border-gray-200 w-full max-w-4xl text-xs md:text-sm">
          <div className="font-medium mb-2 text-persian-indigo text-sm">Prediction Result</div>
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row md:items-center">
              <span className="font-medium min-w-[100px]">Prediction:</span>
              <span className="break-words">{Array.isArray(predictionResult.predictions)
                ? predictionResult.predictions.join(', ')
                : String(predictionResult.predictions)}</span>
            </div>
            {predictionResult.probabilities && (
              <div className="flex flex-col md:flex-row md:items-start">
                <span className="font-medium min-w-[100px]">Probabilities:</span>
                <span className="break-words">{JSON.stringify(predictionResult.probabilities)}</span>
              </div>
            )}
            <div className="flex flex-col md:flex-row md:items-center">
              <span className="font-medium min-w-[100px]">Model Used:</span>
              <span className="break-words">{predictionResult.model_used}</span>
            </div>
          </div>
        </div>
      );
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto scrollbar-custom bg-almond-white">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <DialogTitle className="font-biorhyme text-persian-indigo text-sm md:text-base">
              Prediction Sandbox
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1">
            <div className="min-h-[200px] flex flex-col items-center text-persian-indigo/80 space-y-4 px-2 pb-4 text-xs md:text-sm">
              
              {/* Model Metrics */}
              {renderMetrics()}

              {/* Prediction Form */}
              {inputFields.length > 0 ? (
                <form onSubmit={handlePredict} className="w-full max-w-4xl flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {inputFields.map((field) => (
                      <div key={field} className="flex flex-col">
                        <label className="text-xs font-medium mb-1" htmlFor={field}>
                          {field}
                        </label>
                        <Input
                          id={field}
                          name={field}
                          value={inputData[field] ?? ''}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          className="text-xs"
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center md:justify-end">
                    <Button
                      type="submit"
                      className="w-auto px-6 py-2 text-xs"
                      disabled={predictMutation.status === 'pending'}
                    >
                      {predictMutation.status === 'pending' ? 'Predicting...' : 'Predict'}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-xs text-gray-400 text-center py-6">
                  No input fields detected for this model.
                </div>
              )}

              {/* Prediction Result */}
              {renderPrediction()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );

};

export default SandboxModal;