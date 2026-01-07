export const API_BASE_URL = __DEV__
  ? 'http://192.168.1.153:3000'
  : 'https://your-production-api.com';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    ME: '/api/auth/me'
  },
  VIDEOS: {
    UPLOAD: '/api/videos/upload',
    LIST: '/api/videos',
    GET: (id: string) => `/api/videos/${id}`,
    PROCESS: (id: string) => `/api/videos/${id}/process`
  },
  INFERENCE: {
    GET: (videoId: string) => `/api/inference/${videoId}`
  }
};

export const POLL_INTERVAL = 2000; // 2 seconds
