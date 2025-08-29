// Mock data for the application

export const mockUsers = [
  {
    id: "1",
    firstname: "John",
    lastname: "Doe", 
    email: "admin@test.com",
    phone: "+1234567890",
    password: "admin123",
    role: "admin",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    createdAt: "2024-01-15T10:30:00.000Z"
  },
  {
    id: "2",
    firstname: "Jane", 
    lastname: "Smith",
    email: "seller@test.com",
    phone: "+1234567891",
    password: "seller123",
    role: "seller",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face",
    createdAt: "2024-01-20T14:20:00.000Z"
  },
  {
    id: "3",
    firstname: "Super",
    lastname: "Admin",
    email: "superadmin@test.com", 
    phone: "+1234567892",
    password: "superadmin123",
    role: "superadmin",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    createdAt: "2024-01-10T09:00:00.000Z"
  },
  {
    id: "4", 
    firstname: "Regular",
    lastname: "User",
    email: "user@test.com",
    phone: "+1234567893", 
    password: "user123",
    role: "user",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    createdAt: "2024-01-25T16:45:00.000Z"
  }
];

export const mockDashboardData = {
  superadmin: {
    stats: {
      totalRevenue: 125789.50,
      totalUsers: 15234,
      totalOrders: 8567,
      totalSellers: 324,
      growthRate: 18.5,
      monthlyGrowth: 12.3
    },
    recentOrders: [
      { id: "#5210", customer: "Mahmoud Ali", date: "2024-03-14", status: "completed", amount: 35.00 },
      { id: "#5211", customer: "Sarah Johnson", date: "2024-03-14", status: "pending", amount: 127.50 },
      { id: "#5212", customer: "Mike Chen", date: "2024-03-13", status: "shipped", amount: 89.99 },
      { id: "#5213", customer: "Emma Wilson", date: "2024-03-13", status: "completed", amount: 234.75 }
    ],
    topProducts: [
      { icon: "💻", name: "Business Laptop HD", price: 279, sales: 156 },
      { icon: "🎧", name: "Headphone Jack Adapter", price: 19, sales: 342 },
      { icon: "🔊", name: "Wireless Headphones", price: 34, sales: 198 },
      { icon: "🥤", name: "Stanley Quencher", price: 35, sales: 287 },
      { icon: "⌚", name: "Crystal Accented Watch", price: 17, sales: 423 }
    ],
    salesData: [
      { month: 'Jan', revenue: 8500, orders: 120 },
      { month: 'Feb', revenue: 12300, orders: 185 },
      { month: 'Mar', revenue: 18700, orders: 267 },
      { month: 'Apr', revenue: 22100, orders: 298 },
      { month: 'May', revenue: 19800, orders: 276 },
      { month: 'Jun', revenue: 25400, orders: 324 }
    ]
  },
  admin: {
    stats: {
      pendingKYC: 23,
      approvedSellers: 187,
      totalProducts: 2156,
      flaggedItems: 8,
      monthlyApprovals: 45
    },
    recentKYC: [
      { id: "KYC001", seller: "Tech Store Pro", date: "2024-03-14", status: "pending", documents: 3 },
      { id: "KYC002", seller: "Fashion Hub", date: "2024-03-13", status: "under_review", documents: 4 },
      { id: "KYC003", seller: "Electronics Plus", date: "2024-03-12", status: "approved", documents: 5 }
    ]
  },
  seller: {
    stats: {
      totalEarnings: 12450.75,
      totalProducts: 24,
      totalOrders: 187,
      pendingOrders: 8,
      monthlyRevenue: 3240.50,
      conversionRate: 4.2
    },
    recentOrders: [
      { id: "#ORD001", product: "Wireless Headphones", customer: "John Doe", amount: 89.99, status: "shipped" },
      { id: "#ORD002", product: "Smart Watch", customer: "Jane Smith", amount: 199.99, status: "pending" },
      { id: "#ORD003", product: "Phone Case", customer: "Bob Johnson", amount: 24.99, status: "delivered" }
    ],
    topProducts: [
      { name: "Wireless Headphones", sales: 89, revenue: 7999.11, stock: 12 },
      { name: "Smart Watch", sales: 45, revenue: 8999.55, stock: 8 },
      { name: "Phone Accessories", sales: 156, revenue: 3899.44, stock: 23 }
    ]
  }
};

export const mockProducts = [
  {
    id: "1", 
    name: "Wireless Bluetooth Headphones",
    description: "Premium quality wireless headphones with noise cancellation",
    price: 89.99,
    stock: 25,
    category: "Electronics", 
    sellerId: "2",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"],
    rating: 4.5,
    sales: 156
  },
  {
    id: "2",
    name: "Smart Fitness Watch", 
    description: "Advanced fitness tracking with heart rate monitoring",
    price: 199.99,
    stock: 12,
    category: "Wearables",
    sellerId: "2", 
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"],
    rating: 4.7,
    sales: 89
  }
];

export const mockOrders = [
  {
    id: "ORD001",
    customerId: "4",
    sellerId: "2", 
    productId: "1",
    productName: "Wireless Bluetooth Headphones",
    customerName: "John Doe",
    amount: 89.99,
    status: "shipped",
    orderDate: "2024-03-14T10:30:00.000Z",
    trackingNumber: "TRK123456789"
  },
  {
    id: "ORD002", 
    customerId: "4",
    sellerId: "2",
    productId: "2",
    productName: "Smart Fitness Watch", 
    customerName: "Jane Smith",
    amount: 199.99,
    status: "pending",
    orderDate: "2024-03-13T15:45:00.000Z",
    trackingNumber: null
  }
];

export const mockKYCRequests = [
  {
    id: "KYC001",
    sellerId: "2",
    sellerName: "Jane Smith", 
    businessName: "Tech Store Pro",
    email: "seller@test.com",
    phone: "+1234567891",
    documents: [
      { type: "business_license", url: "#", verified: false },
      { type: "tax_certificate", url: "#", verified: false }, 
      { type: "identity_proof", url: "#", verified: true }
    ],
    status: "pending",
    submittedAt: "2024-03-14T10:30:00.000Z",
    updatedAt: "2024-03-14T10:30:00.000Z"
  },
  {
    id: "KYC002",
    sellerId: "5", 
    sellerName: "Fashion Hub LLC",
    businessName: "Fashion Hub",
    email: "fashion@test.com",
    phone: "+1234567894",
    documents: [
      { type: "business_license", url: "#", verified: true },
      { type: "tax_certificate", url: "#", verified: true },
      { type: "identity_proof", url: "#", verified: true },
      { type: "bank_statement", url: "#", verified: false }
    ],
    status: "under_review", 
    submittedAt: "2024-03-13T14:20:00.000Z",
    updatedAt: "2024-03-14T09:15:00.000Z"
  }
];