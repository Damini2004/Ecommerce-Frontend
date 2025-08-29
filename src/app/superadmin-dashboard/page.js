"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Users, ShoppingCart, Package, DollarSign, Activity } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import DataTable from "@/components/dashboard/DataTable";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import apiService from "@/utils/api";

export default function SuperAdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await apiService.getDashboardData('superadmin');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const orderColumns = [
    { key: 'id', label: 'Order ID', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'date', label: 'Date', sortable: true, type: 'date' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'amount', label: 'Amount', sortable: true, type: 'currency' },
  ];

  const productColumns = [
    { key: 'name', label: 'Product', sortable: true },
    { key: 'price', label: 'Price', sortable: true, type: 'currency' },
    { key: 'sales', label: 'Sales', sortable: true },
  ];

  // Chart data for revenue visualization
  const chartData = dashboardData?.salesData || [];

  return (
    <DashboardLayout 
      userRole="superadmin" 
      activePage="dashboard" 
      title="Super Admin Dashboard"
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={dashboardData?.stats?.totalRevenue || 0}
            change={`${dashboardData?.stats?.growthRate || 0}%`}
            changeType="positive"
            icon={DollarSign}
            color="green"
            subtitle="from last month"
            loading={loading}
          />
          
          <StatCard
            title="Total Users"
            value={dashboardData?.stats?.totalUsers || 0}
            change={`+${dashboardData?.stats?.monthlyGrowth || 0}%`}
            changeType="positive"
            icon={Users}
            color="blue"
            subtitle="this month"
            loading={loading}
          />
          
          <StatCard
            title="Total Orders"
            value={dashboardData?.stats?.totalOrders || 0}
            change="+15%"
            changeType="positive"
            icon={ShoppingCart}
            color="purple"
            subtitle="this week"
            loading={loading}
          />
          
          <StatCard
            title="Active Sellers"
            value={dashboardData?.stats?.totalSellers || 0}
            change="+8%"
            changeType="positive"
            icon={Package}
            color="orange"
            subtitle="verified"
            loading={loading}
          />
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="success">
                    <TrendingUp size={12} className="mr-1" />
                    +18.5%
                  </Badge>
                </div>
              </div>
              
              {loading ? (
                <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
              ) : (
                <div className="h-64">
                  {/* Simple Bar Chart Visualization */}
                  <div className="flex items-end justify-between h-full space-x-2">
                    {chartData.map((item, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                        <div className="w-full bg-gray-200 rounded-t-lg relative overflow-hidden">
                          <div 
                            className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out"
                            style={{ 
                              height: `${(item.revenue / Math.max(...chartData.map(d => d.revenue))) * 200}px`,
                              minHeight: '20px'
                            }}
                          ></div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-900">{item.month}</p>
                          <p className="text-xs text-gray-500">${(item.revenue / 1000).toFixed(1)}k</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Top Products */}
          <div>
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
                <Activity className="text-gray-400" size={20} />
              </div>
              
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-3 animate-pulse">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {dashboardData?.topProducts?.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">{product.icon}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.sales} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <DataTable
            title="Recent Orders"
            data={dashboardData?.recentOrders || []}
            columns={orderColumns}
            loading={loading}
            searchable={true}
            emptyMessage="No recent orders found"
          />

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-green-800">Active Users Today</span>
                  <span className="text-lg font-bold text-green-900">2,847</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-800">Orders Processing</span>
                  <span className="text-lg font-bold text-blue-900">127</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-purple-800">Pending KYC</span>
                  <span className="text-lg font-bold text-purple-900">23</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm font-medium text-orange-800">Support Tickets</span>
                  <span className="text-lg font-bold text-orange-900">8</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Status</span>
                  <Badge variant="success">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <Badge variant="success">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Response</span>
                  <Badge variant="success">Fast</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <Badge variant="info">99.9%</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}