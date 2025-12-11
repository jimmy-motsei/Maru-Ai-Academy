// API configuration and utility functions

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('API fetch error:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Module types (matching backend)
export interface ApiModule {
  id: string;
  title: string;
  description: string;
  slug: string;
  stream: 'BEGINNER' | 'INTERMEDIATE';
  order: number;
  icon?: string;
  duration?: string;
  courseId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiUser {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

// API endpoints
export const api = {
  // Modules
  async getModules(): Promise<ApiResponse<{ modules: ApiModule[] }>> {
    return fetchApi<{ modules: ApiModule[] }>('/api/modules');
  },

  async getModule(id: string): Promise<ApiResponse<ApiModule>> {
    return fetchApi<ApiModule>(`/api/modules/${id}`);
  },

  async createModule(module: Partial<ApiModule>): Promise<ApiResponse<ApiModule>> {
    return fetchApi<ApiModule>('/api/modules', {
      method: 'POST',
      body: JSON.stringify(module),
    });
  },

  // Users
  async getUsers(): Promise<ApiResponse<{ users: ApiUser[] }>> {
    return fetchApi<{ users: ApiUser[] }>('/api/users');
  },

  async getUser(id: string): Promise<ApiResponse<ApiUser>> {
    return fetchApi<ApiUser>(`/api/users/${id}`);
  },

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return fetchApi<{ status: string; timestamp: string }>('/health');
  },
};

export default api;
