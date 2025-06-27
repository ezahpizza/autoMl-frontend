
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PixelCard from '../ui/PixelCard';
import LoadingGallery  from '@/components/ui/LoadingGallery';

import { useGenerateEDA } from '@/hooks/useEdaReports';


const uploadSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.type === 'text/csv' || file.name.endsWith('.csv'),
    'Please select a valid CSV file'
  ),
  datasetName: z.string().optional(),
});

type UploadFormData = z.infer<typeof uploadSchema>;

const EdaUploadForm = () => {
  const [dragActive, setDragActive] = useState(false);
  const generateEDA = useGenerateEDA();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const selectedFile = watch('file');

  const onSubmit = (data: UploadFormData) => {
    generateEDA.mutate({
      file: data.file,
      datasetName: data.datasetName,
    }, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setValue('file', file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue('file', e.target.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="bg-almond-white border-persian-indigo/20">
        <CardHeader>
          <CardTitle className="font-fira-code text-persian-indigo text-2xl">
            Upload your Dataset
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors bg-rose-pink/30 bg-dot-8-s-2-persian-indigo ${
                  dragActive
                    ? 'border-pumpkin-orange bg-pumpkin-orange/5'
                    : 'border-persian-indigo/30 hover:border-pumpkin-orange/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="h-full flex flex-col items-center justify-center space-y-4">
                  <Upload className="h-12 w-12 text-persian-indigo" />
                  <PixelCard variant="pink" className='bg-persian-indigo/80'>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    <div className="absolute w-[75%]">
                      <p className="font-biorhyme text-rose-pink font-medium">
                        <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                        Drop your CSV file here, or click to browse
                      </p>
                      <p className="font-fira-code text-sm text-almond-white/80 mt-2">
                        Supports CSV files up to 100MB
                      </p>
                    </div>
                  </PixelCard>
                </div>
              </div>


              {selectedFile && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-persian-indigo/5 rounded-lg"
                >
                  <p className="font-fira-code text-sm text-persian-indigo">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </motion.div>
              )}

              {errors.file && (
                <p className="text-red-500 font-fira-code text-sm">{errors.file.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="font-fira-code text-persian-indigo font-medium">
                Dataset Name (Optional)
              </label>
              <Input
                {...register('datasetName')}
                placeholder="Give a name to your dataset"
                className="bg-white border-persian-indigo/20 focus:border-pumpkin-orange"
              />
            </div>

             <div className="flex justify-center">
                  {generateEDA.isPending ? (
                    <div className="flex justify-center">
                      <LoadingGallery/>
                    </div>
                  ) : (
                    <Button
                        type="submit"
                        disabled={!selectedFile || generateEDA.isPending}
                        className="text-lg w-auto bg-pumpkin-orange hover:bg-pumpkin-orange/90 text-white font-biorhyme"
                      >
                    Generate EDA Report
                    </Button>
                  )}
                
             </div>

          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EdaUploadForm;
