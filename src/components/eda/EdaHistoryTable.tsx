
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Eye, FileText, AlertCircle } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEdaHistory } from '@/hooks/useEdaReports';
import LoadingGallery  from '@/components/ui/LoadingGallery';
import EdaViewModal from './EdaViewModal';

const EdaHistoryTable = () => {
  const { data: historyData, isLoading, error } = useEdaHistory();
  const [selectedReport, setSelectedReport] = React.useState<{
    filename: string;
    datasetName: string;
  } | null>(null);

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
      <Card className="bg-white border-red-200">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center space-y-2">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto" />
            <p className="font-fira-code text-red-600">Failed to load history</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const history = historyData?.history || [];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="bg-white border-persian-indigo/20">
          <CardHeader>
            <CardTitle className="font-biorhyme text-persian-indigo text-xl flex items-center gap-2">
              <FileText className="h-5 w-5" />
              EDA History ({history.length} records)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-persian-indigo/30 mx-auto mb-4" />
                <p className="font-biorhyme text-persian-indigo/60">No EDA reports generated yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-fira-code text-persian-indigo">Dataset</TableHead>
                      <TableHead className="font-fira-code text-persian-indigo">Rows</TableHead>
                      <TableHead className="font-fira-code text-persian-indigo">Columns</TableHead>
                      <TableHead className="font-fira-code text-persian-indigo">Size</TableHead>
                      <TableHead className="font-fira-code text-persian-indigo">Status</TableHead>
                      <TableHead className="font-fira-code text-persian-indigo">Created</TableHead>
                      <TableHead className="font-fira-code text-persian-indigo">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.05,
                          ease: "easeOut" 
                        }}
                        className="hover:bg-almond-white/50 transition-colors"
                      >
                        <TableCell className="font-biorhyme text-persian-indigo">
                          {item.dataset_name}
                        </TableCell>
                        <TableCell className="font-fira-code text-sm">
                          {item.dataset_rows.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-fira-code text-sm">
                          {item.dataset_columns}
                        </TableCell>
                        <TableCell className="font-fira-code text-sm">
                          {formatFileSize(item.file_size)}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.status === 'completed' ? 'default' : 'destructive'}
                            className={
                              item.status === 'completed' 
                                ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                : 'bg-red-100 text-red-800 hover:bg-red-100'
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-fira-code text-sm">
                          {format(new Date(item.created_at), 'MMM dd, yyyy HH:mm')}
                        </TableCell>
                        <TableCell>
                          {item.file_exists && item.view_url ? (
                            <Button
                              onClick={() => setSelectedReport({
                                filename: item.filename,
                                datasetName: item.dataset_name,
                              })}
                              variant="outline"
                              size="sm"
                              className="border-pumpkin-orange text-pumpkin-orange hover:bg-pumpkin-orange hover:text-white"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          ) : (
                            <span className="font-fira-code text-xs text-persian-indigo/40">
                              Not available
                            </span>
                          )}
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
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
