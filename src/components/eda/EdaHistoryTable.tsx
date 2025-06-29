
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Eye, FileText, AlertCircle, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEdaHistory } from '@/hooks/useEdaReports';
import LoadingGallery from '@/components/ui/LoadingGallery';
import EdaViewModal from './EdaViewModal';

const EdaHistoryTable = () => {
  const { data: historyData, isLoading, error } = useEdaHistory();
  const [selectedReport, setSelectedReport] = React.useState<{
    filename: string;
    datasetName: string;
  } | null>(null);

  const history = historyData?.history || [];

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
      <Card className="bg-white">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center space-y-2">
            <AlertCircle className="h-8 w-8 text-red mx-auto" />
            <p className="font-fira-code text-red">Failed to load history</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card className="bg-white">
        <CardContent className="text-center py-12">
          <History className="h-16 w-16 text-persian-indigo mx-auto mb-6" />
          <h3 className="font-biorhyme text-xl text-persian-indigo mb-2">
            No History :(
          </h3>
          <p className="font-fira-code text-persian-indigo/70">
            Upload a CSV file to get a report :)
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
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="bg-pumpkin-orange">
          <CardHeader>
            <CardTitle className="font-biorhyme text-persian-indigo text-xl flex items-center gap-2">
              <FileText className="h-5 w-5" />
              EDA History ({history.length} records)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              {history.map((item, index) => (
                <motion.div
                  key={item.filename}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.15,
                    ease: "easeOut"
                  }}
                >
                  <Card>
                    <CardContent className="p-4 md:p-6">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div className="mb-2 md:mb-0">
                          <h3 className="font-biorhyme text-persian-indigo text-lg">
                            {item.dataset_name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant={item.status === 'completed' ? 'default' : 'destructive'}
                              className={
                                item.status === 'completed' 
                                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                  : 'bg-red text-red hover:bg-red/80'
                              }
                            >
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {format(new Date(item.created_at), 'MMM dd, yyyy HH:mm')}
                        </div>
                      </div>

                      {/* Dataset Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <span className="text-sm text-gray-500 block mb-1">Rows</span>
                          <p className="font-fira-code text-sm text-gray-900">
                            {item.dataset_rows.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 block mb-1">Columns</span>
                          <p className="font-fira-code text-sm text-gray-900">
                            {item.dataset_columns}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 block mb-1">Size</span>
                          <p className="font-fira-code text-sm text-gray-900">
                            {formatFileSize(item.file_size)}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end">
                        {item.file_exists && item.view_url ? (
                          <Button
                            onClick={() => setSelectedReport({
                              filename: item.filename,
                              datasetName: item.dataset_name,
                            })}
                            size="sm"
                            className="bg-pumpkin-orange text-almond-white hover:text-persian-indigo hover:bg-pumpkin-orange/70 w-full md:w-auto"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        ) : (
                          <span className="font-fira-code text-xs text-persian-indigo/40">
                            Not available
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {selectedReport && (
        <EdaViewModal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          filename={selectedReport.filename}
          datasetName={selectedReport.datasetName}
        />
      )}
    </>
  );
};

export default EdaHistoryTable;