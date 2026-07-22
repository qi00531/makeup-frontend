export type AnalysisStatus = 'processing' | 'completed' | 'failed';
export type AnalysisStageStatus = 'pending' | 'active' | 'completed';

export interface UploadVideoResult {
  taskId: string;
  fileName: string;
  fileSize: number;
  status: 'uploaded';
}

export interface UploadPhotoResult {
  photoId: string | null;
  previewUrl: string | null;
  skipped: boolean;
}

export interface AnalysisStage {
  id: string;
  label: string;
  status: AnalysisStageStatus;
}

export interface AnalysisProgress {
  taskId: string;
  progress: number;
  currentStage: string;
  remainingSeconds: number;
  status: AnalysisStatus;
  stages: AnalysisStage[];
  failureReason?: string;
}

export interface MakeupPreview {
  taskId: string;
  title: string;
  style: string;
  occasion: string;
  difficulty: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
  palette: string[];
  hints: Array<{ title: string; description: string; tone: 'positive' | 'adjust' | 'neutral' }>;
}

export interface MakeupService {
  uploadVideo(file: File): Promise<UploadVideoResult>;
  uploadPhoto(file: File | null): Promise<UploadPhotoResult>;
  analyze(taskId: string): AsyncGenerator<AnalysisProgress>;
  getPreview(taskId: string): Promise<MakeupPreview>;
}
