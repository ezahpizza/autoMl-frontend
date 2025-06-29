import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Eye, Download, Trash2, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { useDeleteEDA, useEdaReports } from '@/hooks/useEdaReports';
import { edaApi } from '@/lib/edaApi';
import EdaViewModal from './EdaViewModal';
import LoadingGallery from '@/components/ui/LoadingGallery';

const EdaReportCard: React.FC = () => {
  
  const { data, isLoading, error } = useEdaReports();
  const deleteEDA = useDeleteEDA();
  const [viewModal, setViewModal] = useState<string | null>(null);
  const reports = data?.reports || [];
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (isLoading) {
    return (
      <Card className="bg-white border-persian-indigo/20">
        <CardContent className="flex items-center justify-center py-8">
          <LoadingGallery />
        </CardContent>
      </Card>
    );
  }

  if (reports.length === 0) {
    return (
      <Card className="bg-white">
        <CardContent className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-persian-indigo mx-auto mb-6" />
          <h3 className="font-biorhyme text-xl text-persian-indigo mb-2">
            No Reports Yet :(
          </h3>
          <p className="font-fira-code text-persian-indigo/60">
            Upload your first CSV file to generate an EDA report :)
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white border-red-200">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center space-y-2">
            <span className="font-fira-code text-red-600">Failed to load reports</span>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const handleDelete = (filename: string) => deleteEDA.mutate(filename);
  const handleDownload = (filename: string) => window.open(edaApi.getDownloadUrl(filename), '_blank');

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        <Card className="w-full bg-pumpkin-orange">
          <CardHeader>
            <CardTitle className="font-biorhyme text-persian-indigo text-xl">
              EDA Reports ({reports.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              {reports.map((report, index) => (
                <motion.div
                    key={report.filename}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.15,
                      ease: "easeOut"
                    }}
                  >
                <Card key={report.filename} className="border border-persian-indigo/10">
                  <CardContent className="p-4 md:p-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="mb-2 md:mb-0">
                        <h3 className="font-biorhyme text-persian-indigo text-lg">
                          {report.dataset_name}
                        </h3>
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(report.created_at), 'MMM dd, yyyy')}
                      </div>
                    </div>

                    {/* Report Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <span className="text-sm text-gray-500 block mb-1">Rows</span>
                        <p className="font-fira-code text-sm text-gray-900">
                          {report.dataset_rows.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block mb-1">Columns</span>
                        <p className="font-fira-code text-sm text-gray-900">
                          {report.dataset_columns}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block mb-1">Size</span>
                        <p className="font-fira-code text-sm text-gray-900">
                          {formatFileSize(report.file_size)}
                        </p>
                      </div>
                    </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {/* mobile */}
                    <div className="flex gap-2 md:hidden">
                      <Button
                        onClick={() => setViewModal(report.filename)}
                        size="sm"
                        className="bg-pumpkin-orange text-almond-white hover:bg-pumpkin-orange/70 flex-1"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        onClick={() => handleDownload(report.filename)}
                        size="sm"
                        className="bg-rose-pink text-persian-indigo hover:bg-persian-indigo flex-1"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                    
                    {/* desktop */}
                    <div className="hidden md:flex md:gap-2">
                      <Button
                        onClick={() => setViewModal(report.filename)}
                        size="sm"
                        className="bg-pumpkin-orange text-almond-white hover:text-persian-indigo hover:bg-pumpkin-orange/70 flex-1"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        onClick={() => handleDownload(report.filename)}
                        size="sm"
                        className="bg-persian-indigo text-almond-white hover:bg-persian-indigo/70 flex-1"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>

                      {/* common delete */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-red text-almond-white hover:text-persian-indigo hover:bg-red/70 flex-1"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-full max-w-md mx-4 md:mx-auto">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete EDA Report</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the report for "{report.dataset_name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-col md:flex-row gap-2">
                            <AlertDialogCancel className="w-full md:w-auto">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(report.filename)}
                              className="bg-red hover:bg-red/70 w-full md:w-auto"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <div className="flex justify-start md:hidden">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-600 hover:bg-red-50 w-full"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-full max-w-md mx-4 md:mx-auto">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete EDA Report</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the report for "{report.dataset_name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-col md:flex-row gap-2">
                            <AlertDialogCancel className="w-full md:w-auto">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(report.filename)}
                              className="bg-red-600 hover:bg-red-700 w-full md:w-auto"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  </CardContent>
                </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {viewModal && (
        <EdaViewModal
          isOpen={!!viewModal}
          onClose={() => setViewModal(null)}
          filename={viewModal}
          datasetName={reports.find(r => r.filename === viewModal)?.dataset_name || ''}
        />
      )}
    </>
  );
};

export default EdaReportCard;