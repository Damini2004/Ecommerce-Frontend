"use client";

import { useState, useEffect } from "react";
import { DollarSign, Package, ShoppingCart, TrendingUp, Eye, Plus, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import DataTable from "@/components/dashboard/DataTable";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import apiService from "@/utils/api";

export default function SellerDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    loadOrders();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await apiService.getDashboardData('seller');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await apiService.getOrders({ sellerId: user.id });
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const orderColumns = [
    { key: 'id', label: 'Order ID', sortable: true },
    { key: 'productName', label: 'Product', sortable: true },
    { key: 'customerName', label: 'Customer', sortable: true },
    { key: 'orderDate', label: 'Date', sortable: true, type: 'date' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'amount', label: 'Amount', sortable: true, type: 'currency' },
  ];

  const productColumns = [
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'sales', label: 'Sales', sortable: true },
    { key: 'revenue', label: 'Revenue', sortable: true, type: 'currency' },
    { key: 'stock', label: 'Stock', sortable: true },
  ];

  return (
    <DashboardLayout 
      userRole="seller" 
      activePage="dashboard" 
      title="Seller Dashboard"
    >
      <div className="space-y-6">
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to Your Store! 🚀</h2>
              <p className="opacity-90">Manage your products, track sales, and grow your business</p>
            </div>
            <div className="hidden md:block">
              <Button variant="secondary" size="lg">
                <Plus className="mr-2" size={20} />
                Add New Product
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Earnings"
            value={`$${dashboardData?.stats?.totalEarnings?.toFixed(2) || '0.00'}`}
            change={`+$${dashboardData?.stats?.monthlyRevenue?.toFixed(2) || '0.00'}`}
            changeType="positive"
            icon={DollarSign}
            color="green"
            subtitle="this month"
            loading={loading}
          />
          
          <StatCard
            title="Total Products"
            value={dashboardData?.stats?.totalProducts || 0}
            change="2 new this week"
            changeType="positive"
            icon={Package}
            color="blue"
            subtitle="active listings"
            loading={loading}
          />
          
          <StatCard
            title="Total Orders"
            value={dashboardData?.stats?.totalOrders || 0}
            change={`${dashboardData?.stats?.pendingOrders || 0} pending`}
            changeType="neutral"
            icon={ShoppingCart}
            color="purple"
            subtitle="all time"
            loading={loading}
          />
          
          <StatCard
            title="Conversion Rate"
            value={`${dashboardData?.stats?.conversionRate || 0}%`}
            change="+0.8%"
            changeType="positive"
            icon={TrendingUp}
            color="orange"
            subtitle="last 30 days"
            loading={loading}
          />
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Sales Performance</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="success">
                    <TrendingUp size={12} className="mr-1" />
                    +24.5%
                  </Badge>
                </div>
              </div>
              
              {loading ? (
                <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
              ) : (
                <div className="h-64">
                  {/* Simple Revenue Chart */}
                  <div className="flex items-end justify-between h-full space-x-2">
                    {[65, 45, 78, 52, 89, 67, 94].map((height, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                        <div className="w-full bg-gray-200 rounded-t-lg relative overflow-hidden">
                          <div 
                            className="bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg transition-all duration-1000 ease-out"
                            style={{ 
                              height: `${height * 2}px`,
                              minHeight: '20px'
                            }}
                          ></div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-900">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                          </p>
                          <p className="text-xs text-gray-500">${(height * 10).toFixed(0)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
                <BarChart3 className="text-gray-400" size={20} />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">Today's Sales</p>
                    <p className="text-xs text-green-600">8 orders completed</p>
                  </div>
                  <span className="text-lg font-bold text-green-900">$485.30</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-800">Page Views</p>
                    <p className="text-xs text-blue-600">Your products today</p>
                  </div>
                  <span className="text-lg font-bold text-blue-900">1,247</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-purple-800">Cart Additions</p>
                    <p className="text-xs text-purple-600">Items added today</p>
                  </div>
                  <span className="text-lg font-bold text-purple-900">67</span>
                </div>
              </div>
            </Card>

            {/* Top Products */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
                <Eye className="text-gray-400" size={20} />
              </div>
              
              <div className="space-y-3">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-3 animate-pulse">
                      <div className="w-10 h-10 bg-gray-200 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  dashboardData?.topProducts?.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                          <Package className="text-purple-600" size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.sales} sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-sm">${product.revenue}</p>
                        <p className="text-xs text-gray-500">{product.stock} in stock</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Orders */}
        <DataTable
          title="Recent Orders"
          data={orders}
          columns={orderColumns}
          loading={loading}
          searchable={true}
          emptyMessage="No orders found"
        />
      </div>
    </DashboardLayout>
  );
}