import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModelList, useCompareModels } from '@/hooks/useModelFeatures';
import LoadingGallery from '@/components/ui/LoadingGallery';
import { AlertCircle } from 'lucide-react';
import { MdOutlineSwapCalls } from "react-icons/md";
import ModelComparisonModal from './ModelComparisonModal';

const CompareModels: React.FC = () => {
  const { data, isLoading, error } = useModelList();
  const compareModels = useCompareModels();
  const [compareBase, setCompareBase] = useState<string | null>(null);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set());

  const models = data?.models || [];

  const handleCompareClick = (filename: string) => {
    setCompareBase(filename);
    setSelectedModels(new Set());
    setCompareDialogOpen(true);
  };

  const handleModelToggle = (filename: string) => {
    const newSelected = new Set(selectedModels);
    if (newSelected.has(filename)) {
      newSelected.delete(filename);
    } else {
      newSelected.add(filename);
    }
    setSelectedModels(newSelected);
  };

  const handleCompare = () => {
    if (!compareBase || selectedModels.size === 0) return;
    
    const modelsToCompare = [compareBase, ...Array.from(selectedModels)];
    compareModels.mutate(modelsToCompare, {
      onSuccess: (result) => {
        setComparisonResult(result.comparison);
        setCompareDialogOpen(false);
        setModalOpen(true);
      },
    });
  };

  const getBaseModel = () => models.find(m => m.filename === compareBase);

  if (isLoading) {
    return (
      <Card className="bg-white border-persian-indigo/20">
        <CardContent className="flex items-center justify-center py-8">
          <LoadingGallery />
        </CardContent>
      </Card>
    );
  }

  if (error) {
      return (
        <Card className="bg-white border-red-200">
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center space-y-2">
              <span className="font-fira-code text-red-600">Failed to load models</span>
            </div>
          </CardContent>
        </Card>
      );
    }
    
  if (models.length < 2) {
    return (
      <Card className="bg-white">
        <CardContent className="text-center py-12">
          <MdOutlineSwapCalls className="h-16 w-16 text-persian-indigo mx-auto mb-6" />
              <h3 className="font-biorhyme text-xl text-persian-indigo mb-2">
                  Need at least two models to compare :(
              </h3>
              <p className="font-fira-code text-persian-indigo/70">
                  Train some more and come back :)
              </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.1,
        ease: "easeOut" 
      }}
    >
      
    <Card className="bg-rose-pink">
      <CardHeader>
        <CardTitle className="font-biorhyme text-persian-indigo text-xl">
          Compare Models
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="space-y-4">
          {models.map((model, index) => (
            <motion.div
                key={model.filename}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
              >
            <Card key={model.filename}>
              <CardContent className="p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="mb-2 md:mb-0">
                    <h3 className="font-semibold text-persian-indigo text-lg">
                      {model.dataset_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Target: {model.target_column}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(model.created_at), 'MMM dd, yyyy HH:mm')}
                  </div>
                </div>

                {/* Model Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-gray-500 block mb-1">Best Model</span>
                    <p className="font-medium text-gray-900">{model.best_model}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block mb-1">Score</span>
                    <p className="font-medium text-gray-900">{model.best_model_score.toFixed(4)}</p>
                  </div>
                </div>

                {/* Compare Action */}
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    className="bg-persian-indigo text-almond-white hover:bg-persian-indigo/70 hover:persian-indigo w-full md:w-auto"
                    onClick={() => handleCompareClick(model.filename)}
                  >
                    Compare
                  </Button>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>

        {/* Compare Selection Dialog */}
        <Dialog open={compareDialogOpen} onOpenChange={setCompareDialogOpen}>
          <DialogContent className="w-[85vw] rounded-lg max-w-sm mx-auto md:max-w-lg overflow-y-auto bg-persian-indigo">

            <DialogHeader>
              <DialogTitle className="font-biorhyme text-almond-white flex items-center justify-between">
                Compare Models
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Base Model Info */}
              {getBaseModel() && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Comparing:</div>
                  <div className="font-medium text-persian-indigo text-sm">
                    {getBaseModel()?.dataset_name} ({getBaseModel()?.best_model})
                  </div>
                </div>
              )}

              {/* Selection Prompt */}
              <div className="font-fira-code text-persian-indigo text-md">
                Select models to compare with:
              </div>

              {/* Model Selection with Checkboxes */}
              <div className="space-y-2 max-h-80 overflow-y-auto scroll-hidden">
                {models.filter(m => m.filename !== compareBase).map(m => (
                  <div
                    key={m.filename}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-persian-indigo/50 transition-colors cursor-pointer"
                    onClick={() => handleModelToggle(m.filename)}
                  >
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-persian-indigo">{m.dataset_name}</div>
                      <div className="text-xs text-gray-600">{m.best_model}</div>
                      <div className="text-xs text-gray-500">Score: {m.best_model_score.toFixed(4)}</div>
                    </div>
                    
                    {/* Custom Checkbox */}
                    <div className="ml-3">
                      <div 
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          selectedModels.has(m.filename)
                            ? 'bg-persian-indigo border-persian-indigo'
                            : 'border-gray-300 hover:border-persian-indigo/50'
                        }`}
                      >
                        {selectedModels.has(m.filename) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Compare Button */}
              <div className="flex justify-center pt-2">
                <Button
                  className="bg-rose-pink text-almond-white hover:text-persian-indigo hover:bg-rose-pink/70 px-8"
                  onClick={handleCompare}
                  disabled={compareModels.isPending || selectedModels.size === 0}
                >
                  {compareModels.isPending ? 'Comparing...' : `Compare ${selectedModels.size + 1} Model${selectedModels.size === 0 ? '' : 's'}`}
                </Button>
              </div>

              {/* Loading State */}
              {compareModels.isPending && (
                <div className="flex items-center justify-center py-4">
                  <LoadingGallery />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <ModelComparisonModal
          isOpen={modalOpen}
          onClose={() => { setModalOpen(false); setComparisonResult(null); setCompareBase(null); }}
          comparison={comparisonResult}
        />
      </CardContent>
    </Card>
    </motion.div>   
  );
};

export default CompareModels;