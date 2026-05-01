import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { ApiResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add interceptor to include token in requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle response errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async signup(email: string, password: string, name: string) {
    const response = await this.client.post<ApiResponse<{ token: string }>>('/auth/signup', {
      email,
      password,
      name,
    });
    return response.data;
  }

  async login(email: string, password: string) {
    const response = await this.client.post<ApiResponse<{ token: string }>>('/auth/login', {
      email,
      password,
    });
    return response.data;
  }

  async getMe() {
    const response = await this.client.get('/auth/me');
    return response.data;
  }

  // Projects endpoints
  async getProjects() {
    const response = await this.client.get('/projects');
    return response.data;
  }

  async getProject(id: string) {
    const response = await this.client.get(`/projects/${id}`);
    return response.data;
  }

  async createProject(data: { name: string; description: string }) {
    const response = await this.client.post('/projects', data);
    return response.data;
  }

  async updateProject(id: string, data: { name: string; description: string }) {
    const response = await this.client.put(`/projects/${id}`, data);
    return response.data;
  }

  async deleteProject(id: string) {
    const response = await this.client.delete(`/projects/${id}`);
    return response.data;
  }

  async addProjectMember(projectId: string, userId: string, role: string) {
    const response = await this.client.post(`/projects/${projectId}/members`, {
      userId,
      role,
    });
    return response.data;
  }

  async removeProjectMember(projectId: string, userId: string) {
    const response = await this.client.delete(`/projects/${projectId}/members/${userId}`);
    return response.data;
  }

  async updateProjectMember(projectId: string, userId: string, role: string) {
    const response = await this.client.put(`/projects/${projectId}/members/${userId}`, { role });
    return response.data;
  }

  // Tasks endpoints
  async getTasks(projectId: string) {
    const response = await this.client.get(`/projects/${projectId}/tasks`);
    return response.data;
  }

  async getTask(projectId: string, taskId: string) {
    const response = await this.client.get(`/projects/${projectId}/tasks/${taskId}`);
    return response.data;
  }

  async createTask(projectId: string, data: {
    title: string;
    description: string;
    assignedTo: string;
    priority: string;
    dueDate: string;
  }) {
    const response = await this.client.post(`/projects/${projectId}/tasks`, data);
    return response.data;
  }

  async updateTask(projectId: string, taskId: string, data: Partial<{
    title: string;
    description: string;
    status: string;
    assignedTo: string;
    priority: string;
    dueDate: string;
  }>) {
    const response = await this.client.put(`/projects/${projectId}/tasks/${taskId}`, data);
    return response.data;
  }

  async deleteTask(projectId: string, taskId: string) {
    const response = await this.client.delete(`/projects/${projectId}/tasks/${taskId}`);
    return response.data;
  }

  // Dashboard endpoints
  async getDashboardStats() {
    const response = await this.client.get('/dashboard/stats');
    return response.data;
  }
}

export const apiClient = new ApiClient();
