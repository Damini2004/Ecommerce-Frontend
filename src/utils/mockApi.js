// Mock API service for development
import { mockUsers, mockDashboardData, mockProducts, mockOrders, mockKYCRequests } from './mockData';

class MockAPI {
  constructor() {
    this.delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  }

  async login(credentials) {
    await this.delay(1000); // Simulate network delay
    
    const user = mockUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return {
        data: {
          accessToken: `mock-token-${Date.now()}`,
          refreshToken: `mock-refresh-${Date.now()}`,
          user: userWithoutPassword
        }
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }

  async register(userData) {
    await this.delay(1000);
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      isVerified: false
    };
    
    mockUsers.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    
    return {
      data: {
        message: 'User registered successfully',
        user: userWithoutPassword
      }
    };
  }

  async getDashboardData(userRole) {
    await this.delay(500);
    return {
      data: mockDashboardData[userRole] || mockDashboardData.user
    };
  }

  async getProducts(sellerId) {
    await this.delay(500);
    return {
      data: mockProducts.filter(p => p.sellerId === sellerId)
    };
  }

  async getOrders(filters = {}) {
    await this.delay(500);
    let orders = [...mockOrders];
    
    if (filters.sellerId) {
      orders = orders.filter(o => o.sellerId === filters.sellerId);
    }
    
    if (filters.status) {
      orders = orders.filter(o => o.status === filters.status);
    }
    
    return { data: orders };
  }

  async getKYCRequests(status = 'all') {
    await this.delay(500);
    let requests = [...mockKYCRequests];
    
    if (status !== 'all') {
      requests = requests.filter(r => r.status === status);
    }
    
    return { data: requests };
  }

  async updateKYCStatus(requestId, status) {
    await this.delay(800);
    const request = mockKYCRequests.find(r => r.id === requestId);
    if (request) {
      request.status = status;
      request.updatedAt = new Date().toISOString();
      return { data: request };
    }
    throw new Error('KYC request not found');
  }
}

export default new MockAPI();