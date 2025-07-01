import { useRef } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FileText, AlertCircle, History, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEdaHistory } from '@/hooks/useEdaReports';
import LoadingGallery from '@/components/ui/LoadingGallery';

const EdaHistoryTable = () => {
  const { data: historyData, isLoading, error } = useEdaHistory();
  const history = historyData?.history || [];

  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 100, behavior: 'smooth' });
    }
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
    <motion.div
      className="h-full relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="bg-pumpkin-orange h-full flex flex-col rounded-xl p-2">
        <CardHeader className="p-2 pb-1">
          <CardTitle className="font-biorhyme text-persian-indigo text-base flex items-center gap-2">
            <FileText className="h-4 w-4" />
            EDA History
          </CardTitle>
        </CardHeader>

        <CardContent
          ref={scrollRef}
          className="p-2 flex-1 overflow-auto rounded-md bg-white scroll-hidden"
        >
          <div className="space-y-2 pb-4">
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
                <Card className="bg-white shadow-sm rounded-md">
                  <CardContent className="p-2">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                        <h3 className="font-biorhyme text-persian-indigo text-sm leading-tight">
                          {item.dataset_name}
                        </h3>
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
                      <div className="text-xs text-gray-500">
                        {format(new Date(item.created_at), 'MMM dd, yyyy HH:mm')}
                      </div>
                    </div>

                    {/* Dataset Details */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-800 mt-2">
                      <div>
                        <div className="text-gray-500">Rows</div>
                        <div className="font-fira-code font-medium">{item.dataset_rows.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Columns</div>
                        <div className="font-fira-code font-medium">{item.dataset_columns}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scroll Button */}
      {history.length > 3 && (
        <button
          onClick={handleScroll}
          className="absolute bottom-4 right-4 bg-persian-indigo text-white text-xs px-3 py-1 rounded-full shadow-md hover:bg-opacity-90 transition"
        >
            <ChevronDown />
        </button>
      )}
    </motion.div>
  );
};

export default EdaHistoryTable;