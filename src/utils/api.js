import axios from "axios";
import mockAPI from "./mockApi";

// Toggle between mock and real API
const USE_MOCK_API = true;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// API wrapper that can use mock or real API
const apiService = {
  async login(credentials) {
    if (USE_MOCK_API) {
      return mockAPI.login(credentials);
    }
    return api.post("/gnet/auth/login", credentials);
  },

  async register(userData) {
    if (USE_MOCK_API) {
      return mockAPI.register(userData);
    }
    
    const endpoint = 
      userData.role === "superadmin" ? "/gnet/auth/register-superadmin" :
      userData.role === "seller" ? "/gnet/auth/register-seller" :
      "/gnet/auth/register-user";
    
    return api.post(endpoint, userData);
  },

  async getDashboardData(userRole) {
    if (USE_MOCK_API) {
      return mockAPI.getDashboardData(userRole);
    }
    return api.get(`/dashboard/${userRole}`);
  },

  async getProducts(sellerId) {
    if (USE_MOCK_API) {
      return mockAPI.getProducts(sellerId);
    }
    return api.get(`/products?sellerId=${sellerId}`);
  },

  async getOrders(filters = {}) {
    if (USE_MOCK_API) {
      return mockAPI.getOrders(filters);
    }
    return api.get("/orders", { params: filters });
  },

  async getKYCRequests(status = 'all') {
    if (USE_MOCK_API) {
      return mockAPI.getKYCRequests(status);
    }
    return api.get(`/kyc/requests?status=${status}`);
  },

  async updateKYCStatus(requestId, status) {
    if (USE_MOCK_API) {
      return mockAPI.updateKYCStatus(requestId, status);
    }
    return api.put(`/kyc/requests/${requestId}`, { status });
  }
};

export default apiService;