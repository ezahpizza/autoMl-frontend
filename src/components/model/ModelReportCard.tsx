import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { GiArtificialIntelligence } from "react-icons/gi";
import { Download, BarChart2, Terminal, Trash2 } from 'lucide-react';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useModelList, useDeleteModel } from '@/hooks/useModelFeatures';
import LoadingGallery from '@/components/ui/LoadingGallery';
import PlotsModal from './PlotsModal';
import SandboxModal from './SandboxModal';
import { modelApi } from '@/lib/ModelApi';

const ModelReportCard = () => {
  const { data, isLoading, error } = useModelList();

  const deleteModel = useDeleteModel();
  const [plotsModel, setPlotsModel] = useState<string | null>(null);
  const [sandboxModel, setSandboxModel] = useState<string | null>(null);

  const models = data?.models || [];

  const handleDownload = (filename: string) => {
    window.open(modelApi.downloadModel(filename), '_blank');
  };

  const handleDelete = (filename: string) => {
    deleteModel.mutate(filename);
  };

  const handlePlots = (filename: string) => {
    setPlotsModel(filename);
  };

  const handleSandbox = (filename: string) => {
    setSandboxModel(filename);
  };

   if (isLoading) {
    return (
        <Card className="bg-white border-persian-indigo/20">
          <CardContent className="flex items-center justify-center py-8">
                <LoadingGallery/>
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
  
  if(models.length === 0){
    return (
      <Card className="bg-white">
          <CardContent className="text-center py-12">
              <GiArtificialIntelligence className="h-16 w-16 text-persian-indigo mx-auto mb-6" />
              <h3 className="font-biorhyme text-xl text-persian-indigo mb-2">
                  No Models Yet :(
              </h3>
              <p className="font-fira-code text-persian-indigo/70">
                  Upload your first CSV file and train one now :)
              </p>
          </CardContent>
      </Card>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 0.1,
          ease: "easeOut" 
        }}
      >
      <Card className="w-full bg-rose-pink">
        <CardHeader>
          <CardTitle className="font-biorhyme text-persian-indigo text-xl">
            Trained Models ({models.length})
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
              <Card key={model.filename} className="border border-persian-indigo/10">
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

                  {/* Actions */}
                  <div className="grid grid-cols-2 md:flex gap-2">
                    <Button
                      size="sm"
                       className="bg-pumpkin-orange text-almond-white hover:text-persian-indigo hover:bg-pumpkin-orange/70 md:w-[140px]"
                      onClick={() => handleDownload(model.filename)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      className="bg-persian-indigo text-almond-white hover:bg-persian-indigo/70 md:w-[140px]"
                      onClick={() => handlePlots(model.filename)}
                    >
                      <BarChart2 className="h-4 w-4 mr-2" />
                      Plots
                    </Button>
                    <Button
                      size="sm"
                      className="bg-rose-pink text-persian-indigo hover:text-persian-indigo hover:bg-rose-pink/70 md:w-[140px]"
                      onClick={() => handleSandbox(model.filename)}
                    >
                      <Terminal className="h-4 w-4 mr-2" />
                      Sandbox
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-red text-almond-white hover:text-persian-indigo hover:bg-red/50 md:w-[140px]"
                          disabled={deleteModel.isPending}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="w-full max-w-md mx-4 md:mx-auto">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Model</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the model for "{model.dataset_name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-col md:flex-row gap-2">
                          <AlertDialogCancel className="w-full md:w-auto">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(model.filename)}
                            className="bg-red/70 hover:bg-red w-full md:w-auto"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
      </motion.div>
      <PlotsModal
        isOpen={!!plotsModel}
        onClose={() => setPlotsModel(null)}
        filename={plotsModel}
      />
      <SandboxModal
        isOpen={!!sandboxModel}
        onClose={() => setSandboxModel(null)}
        filename={sandboxModel}
      />
    </>
  );
};

export default ModelReportCard;