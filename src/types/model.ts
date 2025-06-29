export interface ModelTrainResponse {
  filename: string;
  download_url: string;
  dataset_name: string;
  target_column: string;
  model_type: string;
  best_model: string;
  best_model_score: number;
  metrics: Record<string, any>;
  plot_urls: string[];
  training_time: number;
}

export interface ModelListItem {
  filename: string;
  dataset_name: string;
  target_column: string;
  best_model: string;
  best_model_score: number;
  created_at: string;
  download_url: string;
}

export interface ModelListResponse {
  success: boolean;
  message: string;
  models: ModelListItem[];
  total_count: number;
}

export interface ModelMetricsResponse {
  success: boolean;
  message: string;
  metrics: Record<string, any>;
}

export interface ModelPlot {
  plot_type: string;
  filename: string;
  url: string;
}

export interface ModelPlotsResponse {
  success: boolean;
  message: string;
  plots: ModelPlot[];
}

export interface ModelPredictionRequest {
  user_id: string;
  model_filename: string;
  input_data: Record<string, any>;
}

export interface ModelPredictionResponse {
  success: boolean;
  message: string;
  predictions: any[];
  probabilities?: any[];
  model_used: string;
  input_features: string[];
}

export interface ModelComparisonRequest {
  user_id: string;
  model_filenames: string[];
}

export interface ModelComparisonModel {
  filename: string;
  dataset_name: string;
  target_column: string;
  best_model: string;
  score: number;
  model_type: string;
  training_time?: number;
  dataset_size: string;
  created_at: string;
}

export interface ModelComparisonStatistics {
  average_score: number;
  score_range: number;
  model_types: string[];
}

export interface ModelComparisonBestModel {
  filename: string;
  model_name: string;
  score: number;
  dataset: string;
}

export interface ModelComparisonResult {
  total_models: number;
  best_model: ModelComparisonBestModel;
  models: ModelComparisonModel[];
  statistics: ModelComparisonStatistics;
}

export interface ModelComparisonResponse {
  success: boolean;
  message: string;
  comparison: ModelComparisonResult;
}