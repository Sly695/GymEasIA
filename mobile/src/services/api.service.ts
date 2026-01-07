import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config';
import { AuthResponse, User, Video, InferenceResult } from '../types';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  setToken(token: string | null) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  async register(email: string, username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await this.client.post(API_ENDPOINTS.AUTH.REGISTER, {
        email,
        username,
        password
      });
      if (!response.data.success) {
        throw new Error(response.data.error || 'Registration failed');
      }
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        // Erreur du serveur
        throw new Error(error.response.data?.error || 'Registration failed');
      } else if (error.request) {
        // Pas de réponse du serveur (connexion impossible)
        throw new Error('Cannot connect to server. Make sure the backend is running and check your network connection.');
      } else {
        // Erreur lors de la configuration de la requête
        throw new Error(error.message || 'An error occurred');
      }
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await this.client.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password
      });
      if (!response.data.success) {
        throw new Error(response.data.error || 'Login failed');
      }
      return response.data.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.error || 'Login failed');
      } else if (error.request) {
        throw new Error('Cannot connect to server. Make sure the backend is running and check your network connection.');
      } else {
        throw new Error(error.message || 'An error occurred');
      }
    }
  }

  async getMe(): Promise<User> {
    const response = await this.client.get(API_ENDPOINTS.AUTH.ME);
    return response.data.data.user;
  }

  async uploadVideo(uri: string): Promise<Video> {
    const filename = uri.split('/').pop() || 'video.mp4';
    const formData = new FormData();
    
    formData.append('video', {
      uri,
      type: 'video/mp4',
      name: filename
    } as any);

    const response = await this.client.post(API_ENDPOINTS.VIDEOS.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data.data.video;
  }

  async getVideos(): Promise<Video[]> {
    const response = await this.client.get(API_ENDPOINTS.VIDEOS.LIST);
    return response.data.data.videos;
  }

  async getVideo(id: string): Promise<Video> {
    const response = await this.client.get(API_ENDPOINTS.VIDEOS.GET(id));
    return response.data.data.video;
  }

  async getInference(videoId: string): Promise<InferenceResult | null> {
    try {
      const response = await this.client.get(API_ENDPOINTS.INFERENCE.GET(videoId));
      return response.data.data.inference;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null; // Still processing
      }
      throw error;
    }
  }
}

export const api = new ApiService();
