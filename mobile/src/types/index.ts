export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Video {
  id: string;
  filename: string;
  status: 'UPLOADED' | 'PROCESSING' | 'DONE' | 'FAILED';
  createdAt: string;
}

export interface InferenceResult {
  reps: number;
  confidence: number;
  notes: string;
  raw: Record<string, any>;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
