
export interface EDAResponse {
  filename: string;
  report_url: string;
  dataset_name: string;
  dataset_rows: number;
  dataset_columns: number;
  file_size: number;
}

export interface EDAReport {
  filename: string;
  dataset_name: string;
  dataset_rows: number;
  dataset_columns: number;
  created_at: string;
  view_url: string;
  download_url: string;
  file_size: number;
}

export interface EDAHistoryItem {
  id: string;
  filename: string;
  dataset_name: string;
  dataset_rows: number;
  dataset_columns: number;
  file_size: number;
  status: 'completed' | 'missing';
  created_at: string;
  file_exists: boolean;
  view_url: string | null;
}

export interface UserInitRequest {
  user_id: string;
  email: string;
  name?: string;
}

export interface APIResponse<T> {
  success: boolean;
  message: string;
  reports?: T[];
  history?: T[];
  total_count: number;
}
