const API_BASE_URL = 'http://localhost:3000';

export interface Disease {
  id: string;
  diseaseNumber: string;
  name: string;
  category: string;
  overview: string;
  causes: string;
  typesAndSymptoms: string;
  diagnosis: string;
  lifestyleAndDailySupport: string;
  treatmentsAndPharma: string;
  faqs?: FAQ[];
  factsMyths?: FactMyth[];
  specialists?: Specialist[];
  sources?: Source[];
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface FactMyth {
  id: string;
  statement: string;
  isFact: boolean;
  explanation: string;
  order: number;
}

export interface Specialist {
  id: string;
  name: string;
  organization: string;
  location: string;
  contact?: string;
  focus: string;
  why: string;
}

export interface Source {
  id: string;
  title: string;
  url?: string;
  type: string;
  description?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getDiseases(search?: string, category?: string): Promise<Disease[]> {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    
    const queryString = params.toString();
    const endpoint = `/diseases${queryString ? `?${queryString}` : ''}`;
    
    return this.request<Disease[]>(endpoint);
  }

  async getDiseaseById(id: string): Promise<Disease> {
    return this.request<Disease>(`/diseases/${id}`);
  }

  async getDiseaseByNumber(diseaseNumber: string): Promise<Disease> {
    return this.request<Disease>(`/diseases/number/${diseaseNumber}`);
  }

  async getCategories(): Promise<string[]> {
    return this.request<string[]>('/diseases/categories');
  }

  async createDisease(disease: Partial<Disease>): Promise<Disease> {
    return this.request<Disease>('/diseases', {
      method: 'POST',
      body: JSON.stringify(disease),
    });
  }

  async updateDisease(id: string, disease: Partial<Disease>): Promise<Disease> {
    return this.request<Disease>(`/diseases/${id}`, {
      method: 'PUT',
      body: JSON.stringify(disease),
    });
  }

  async deleteDisease(id: string): Promise<void> {
    return this.request<void>(`/diseases/${id}`, {
      method: 'DELETE',
    });
  }

  async importFromSheets(spreadsheetId: string, range: string): Promise<any> {
    return this.request<any>('/diseases/import', {
      method: 'POST',
      body: JSON.stringify({ spreadsheetId, range }),
    });
  }
}

export const apiService = new ApiService();
