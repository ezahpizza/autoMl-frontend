import React, { useState } from 'react';
import Papa from 'papaparse';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import  SelectionModal from '@/components/ui/SelectionModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTrainModel } from '@/hooks/useModelFeatures';
import LoadingGallery from '@/components/ui/LoadingGallery';

const modelOptions = [
  { value: 'lr', label: 'Logistic Regression' },
  { value: 'knn', label: 'K-Nearest Neighbors' },
  { value: 'nb', label: 'Naive Bayes' },
  { value: 'dt', label: 'Decision Tree' },
  { value: 'rf', label: 'Random Forest' },
  { value: 'xgboost', label: 'XGBoost' },
  { value: 'lightgbm', label: 'LightGBM' },
];

const uploadSchema = z.object({
  file: z.instanceof(File, { message: "Please select a CSV file" }),
  datasetName: z.string().optional(),
  targetColumn: z.string().min(1, "Select a target column"),
  modelType: z.string().min(1, "Select a model type"),
});

type UploadFormData = z.infer<typeof uploadSchema>;

const ModelUploadForm = () => {
  const [csvColumns, setCsvColumns] = useState<string[]>([]);
  const [previewRows, setPreviewRows] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [columnCount, setColumnCount] = useState<number>(0);
  const [parsing, setParsing] = useState(false);
  const [targetColumnModalOpen, setTargetColumnModalOpen] = useState(false);
  const [modelTypeModalOpen, setModelTypeModalOpen] = useState(false);

  const trainModel = useTrainModel();

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setParsing(true);
      Papa.parse(file, {
        header: true,
        preview: 5,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as any[];
          const columns = results.meta.fields || [];
          setCsvColumns(columns);
          setPreviewRows(data.slice(0, 5));
          setRowCount(results.data.length);
          setColumnCount(columns.length);
          setValue('file', file);
          setParsing(false);
        },
        error: () => {
          setCsvColumns([]);
          setPreviewRows([]);
          setRowCount(0);
          setColumnCount(0);
          setParsing(false);
        },
      });
    }
  };

  const onSubmit = (data: UploadFormData) => {
    if (!csvColumns.includes(data.targetColumn)) {
      alert("Selected target column does not exist in the dataset.");
      return;
    }
    trainModel.mutate(
      {
        file: data.file,
        datasetName: data.datasetName,
        targetColumn: data.targetColumn,
        modelType: data.modelType,
      },
      {
        onSuccess: () => {
          reset();
          setCsvColumns([]);
          setPreviewRows([]);
          setRowCount(0);
          setColumnCount(0);
        },
      }
    );
  };

  return (
    <Card className="bg-almond-white w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="font-fira-code text-persian-indigo text-2xl">
          Train a Model
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mb-2"
            />
            {errors.file && (
              <p className="text-red-500 font-fira-code text-sm">{errors.file.message}</p>
            )}
          </div>
          {parsing && <LoadingGallery />}
          {csvColumns.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-4 mb-2">
                <span className="font-fira-code text-persian-indigo">
                  Rows: {rowCount}
                </span>
                <span className="font-fira-code text-persian-indigo">
                  Columns: {columnCount}
                </span>
                <span className="font-fira-code text-persian-indigo">
                  Columns: {csvColumns.join(', ')}
                </span>
              </div>
              <div className="overflow-x-auto max-h-48 border rounded bg-white">
                <table className="min-w-full text-xs font-fira-code">
                  <thead>
                      <tr>
                        {csvColumns.map((col) => (
                          <th key={col} className="px-2 py-1 border-b text-left">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewRows.map((row, idx) => (
                        <tr key={idx}>
                          {csvColumns.map((col) => (
                            <td key={col} className="px-2 py-1 border-b text-left">
                              {row[col]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                </table>
              </div>

              <div className="mt-2">
                <label className="font-fira-code text-persian-indigo font-medium">
                  Target Column
                </label>
                <button
                  type="button"
                  onClick={() => setTargetColumnModalOpen(true)}
                  className="w-full mt-1 border rounded p-2 text-left bg-white hover:bg-gray-50 font-fira-code"
                >
                  {watch('targetColumn') || 'Select target column'}
                </button>
                {errors.targetColumn && (
                  <p className="text-red-500 font-fira-code text-sm">{errors.targetColumn.message}</p>
                )}
              </div>

              <div className="mt-2">
                <label className="font-fira-code text-persian-indigo font-medium">
                  Model Type
                </label>
                <button
                  type="button"
                  onClick={() => setModelTypeModalOpen(true)}
                  className="w-full mt-1 border rounded p-2 text-left bg-white hover:bg-gray-50 font-fira-code"
                >
                  {modelOptions.find(opt => opt.value === watch('modelType'))?.label || 'Select model type'}
                </button>
                {errors.modelType && (
                  <p className="text-red-500 font-fira-code text-sm">{errors.modelType.message}</p>
                )}
              </div>

            </div>
          )}
          <div>
            <Input
              {...register('datasetName')}
              placeholder="Dataset name (optional)"
              className="bg-white border-persian-indigo/20 focus:border-pumpkin-orange"
            />
          </div>
          <div className="flex justify-center">
            {trainModel.isPending ? (
              <LoadingGallery />
            ) : (
              <Button
                type="submit"
                disabled={!selectedFile || !csvColumns.length || trainModel.isPending}
                className="w-auto bg-rose-pink hover:bg-pumpkin-orange/90 text-white font-biorhyme"
              >
                Train
              </Button>
            )}
          </div>
          <SelectionModal
            isOpen={targetColumnModalOpen}
            onClose={() => setTargetColumnModalOpen(false)}
            title="Select Target Column"
            items={csvColumns}
            onSelect={(item) => setValue('targetColumn', item)}
            placeholder="Choose target column"
          />

          <SelectionModal
            isOpen={modelTypeModalOpen}
            onClose={() => setModelTypeModalOpen(false)}
            title="Select Model Type"
            items={modelOptions.map(opt => opt.label)}
            onSelect={(item, index) => setValue('modelType', modelOptions[index].value)}
            placeholder="Choose model type"
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default ModelUploadForm;