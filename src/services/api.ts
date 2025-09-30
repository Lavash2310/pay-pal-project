const API_BASE_URL = 'http://localhost:8000/api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  balance: number;
}

export interface Transaction {
  id: string;
  userId: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  recipient: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Card {
  id: string;
  userId: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  type: string;
  isDefault: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SendMoneyRequest {
  recipientEmail: string;
  amount: number;
  note?: string;
}

export interface WithdrawRequest {
  amount: number;
  cardId: string;
}

export interface AddCardRequest {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Network error' }));
      throw new Error(error.detail || 'Request failed');
    }

    return response.json();
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<{ user: User; token: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<{ user: User; token: string }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // User endpoints
  async getUser(userId: string): Promise<User> {
    return this.request(`/user/${userId}`);
  }

  // Transaction endpoints
  async getTransactions(userId: string): Promise<Transaction[]> {
    return this.request(`/transactions/${userId}`);
  }

  async sendMoney(request: SendMoneyRequest): Promise<{ success: boolean; transaction: Transaction; newBalance: number }> {
    return this.request('/send-money', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async withdrawMoney(request: WithdrawRequest): Promise<{ success: boolean; transaction: Transaction; newBalance: number }> {
    return this.request('/withdraw', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Card endpoints
  async getCards(userId: string): Promise<Card[]> {
    return this.request(`/cards/${userId}`);
  }

  async addCard(request: AddCardRequest): Promise<Card> {
    return this.request('/cards', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async removeCard(cardId: string): Promise<{ success: boolean }> {
    return this.request(`/cards/${cardId}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();