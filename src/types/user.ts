export interface CleanupResponse {
  files_deleted: string[];
  records_deleted: Record<string, number>;
  total_files_deleted: number;
  total_records_deleted: number;
  success: boolean;
  message: string;
}
