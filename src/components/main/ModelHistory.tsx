import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { useModelList } from '@/hooks/useModelFeatures';
import LoadingGallery from '@/components/ui/LoadingGallery';
import { MdOutlineSwapCalls } from "react-icons/md";

const ModelHistory = () => {
  const { data, isLoading, error } = useModelList();
  const models = data?.models || [];

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
          <LoadingGallery />
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
              <p className="font-fira-code text-red">Failed to load models</p>
            </div>
          </CardContent>
        </Card>
      );
    }

  if (models.length === 0) {
    return (
      <Card className="bg-white">
        <CardContent className="text-center py-12">
          <MdOutlineSwapCalls className="h-16 w-16 text-persian-indigo mx-auto mb-6" />
              <h3 className="font-biorhyme text-xl text-persian-indigo mb-2">
                  No Models Trained yet :(
              </h3>
              <p className="font-fira-code text-persian-indigo/70">
                  Train some models and come back here :)
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
      transition={{
        duration: 0.5,
        delay: 0.1,
        ease: "easeOut"
      }}
    >
      <Card className="bg-rose-pink h-full flex flex-col rounded-xl p-2">
        <CardHeader className="p-2 pb-1">
          <CardTitle className="font-biorhyme text-persian-indigo text-base flex items-center gap-2">
            <MdOutlineSwapCalls className="h-5 w-5 text-persian-indigo" />
            ML History
          </CardTitle>
        </CardHeader>

        {/* Scrollable container */}
        <CardContent
          ref={scrollRef}
          className="p-2 flex-1 overflow-auto rounded-md bg-white scroll-hidden"
        >
          <div className="space-y-2 pb-4">
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
                <Card className="bg-white shadow-sm rounded-md">
                  <CardContent className="p-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                      <h3 className="font-semibold text-persian-indigo text-sm leading-tight">
                        {model.dataset_name}
                      </h3>
                      <div className="text-xs text-gray-500">
                        {format(new Date(model.created_at), 'MMM dd, yyyy HH:mm')}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-800 mt-2">
                      <div>
                        <div className="text-gray-500">Best Model</div>
                        <div className="font-medium">{model.best_model}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Score</div>
                        <div className="font-medium">{model.best_model_score.toFixed(4)}</div>
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
      {models.length > 3 && (
        <button
          onClick={handleScroll}
          className="absolute bottom-4 right-4 bg-persian-indigo text-white text-xs px-3 py-1 rounded-lg shadow-md hover:bg-opacity-90 transition"
        >
          <ChevronDown />
        </button>
      )}
    </motion.div>
  );
};

export default ModelHistory;