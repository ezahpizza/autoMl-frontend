
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Eye, Download, Trash2, Database, Calendar } from 'lucide-react';
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
import { EDAReport } from '@/types/eda';
import { useDeleteEDA } from '@/hooks/useEdaReports';
import { edaApi } from '@/lib/edaApi';
import EdaViewModal from './EdaViewModal';

interface EdaReportCardProps {
  report: EDAReport;
  index: number;
}

const EdaReportCard = ({ report, index }: EdaReportCardProps) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const deleteEDA = useDeleteEDA();

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDelete = () => {
    deleteEDA.mutate(report.filename);
  };

  const handleDownload = () => {
    window.open(edaApi.getDownloadUrl(report.filename), '_blank');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          ease: "easeOut" 
        }}
      >
        <Card className="bg-white border-persian-indigo/20 hover:border-pumpkin-orange/50 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="font-biorhyme text-persian-indigo text-lg flex items-center gap-2">
              <Database className="h-5 w-5" />
              {report.dataset_name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-fira-code text-persian-indigo/70">
                  Rows: <span className="text-persian-indigo font-medium">{report.dataset_rows.toLocaleString()}</span>
                </p>
                <p className="font-fira-code text-persian-indigo/70">
                  Columns: <span className="text-persian-indigo font-medium">{report.dataset_columns}</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-fira-code text-persian-indigo/70">
                  Size: <span className="text-persian-indigo font-medium">{formatFileSize(report.file_size)}</span>
                </p>
                <div className="flex items-center gap-1 text-persian-indigo/70">
                  <Calendar className="h-3 w-3" />
                  <span className="font-fira-code text-xs">
                    {format(new Date(report.created_at), 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => setIsViewModalOpen(true)}
                variant="outline"
                size="sm"
                className="flex-1 border-pumpkin-orange text-pumpkin-orange hover:bg-pumpkin-orange hover:text-white"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              
              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
                className="flex-1 border-persian-indigo text-persian-indigo hover:bg-persian-indigo hover:text-white"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete EDA Report</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete the report for "{report.dataset_name}"? 
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700"
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

      <EdaViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        filename={report.filename}
        datasetName={report.dataset_name}
      />
    </>
  );
};

export default EdaReportCard;
