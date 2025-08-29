"use client";

import { useState, useEffect } from "react";
import { Shield, Users, Package, AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import DataTable from "@/components/dashboard/DataTable";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import apiService from "@/utils/api";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [kycRequests, setKycRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    loadKYCRequests();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await apiService.getDashboardData('admin');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const loadKYCRequests = async () => {
    try {
      const response = await apiService.getKYCRequests();
      setKycRequests(response.data);
    } catch (error) {
      console.error('Failed to load KYC requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKYCAction = async (requestId, action) => {
    try {
      await apiService.updateKYCStatus(requestId, action);
      // Reload KYC requests
      loadKYCRequests();
    } catch (error) {
      console.error('Failed to update KYC status:', error);
    }
  };

  const kycColumns = [
    { key: 'sellerName', label: 'Seller Name', sortable: true },
    { key: 'businessName', label: 'Business Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'submittedAt', label: 'Submitted', sortable: true, type: 'date' },
    { key: 'status', label: 'Status', type: 'badge' },
    { 
      key: 'actions', 
      label: 'Actions', 
      render: (row) => (
        <div className="flex space-x-2">
          {row.status === 'pending' && (
            <>
              <Button
                size="sm"
                variant="success"
                onClick={() => handleKYCAction(row.id, 'approved')}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleKYCAction(row.id, 'rejected')}
              >
                Reject
              </Button>
            </>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => window.open('#', '_blank')}
          >
            View Details
          </Button>
        </div>
      )
    },
  ];

  return (
    <DashboardLayout 
      userRole="admin" 
      activePage="dashboard" 
      title="Admin Dashboard"
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Pending KYC"
            value={dashboardData?.stats?.pendingKYC || 0}
            change="3 new today"
            changeType="neutral"
            icon={Clock}
            color="orange"
            subtitle="requires attention"
            loading={loading}
          />
          
          <StatCard
            title="Approved Sellers"
            value={dashboardData?.stats?.approvedSellers || 0}
            change={`+${dashboardData?.stats?.monthlyApprovals || 0}`}
            changeType="positive"
            icon={CheckCircle}
            color="green"
            subtitle="this month"
            loading={loading}
          />
          
          <StatCard
            title="Total Products"
            value={dashboardData?.stats?.totalProducts || 0}
            change="+12%"
            changeType="positive"
            icon={Package}
            color="blue"
            subtitle="active listings"
            loading={loading}
          />
          
          <StatCard
            title="Flagged Items"
            value={dashboardData?.stats?.flaggedItems || 0}
            change="2 resolved"
            changeType="positive"
            icon={AlertTriangle}
            color="red"
            subtitle="need review"
            loading={loading}
          />
        </div>

        {/* KYC Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DataTable
              title="KYC Requests"
              data={kycRequests}
              columns={kycColumns}
              loading={loading}
              searchable={true}
              emptyMessage="No KYC requests found"
            />
          </div>

          <div className="space-y-6">
            {/* KYC Summary */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">KYC Summary</h3>
                <Shield className="text-gray-400" size={20} />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-medium text-orange-800">Pending Review</p>
                    <p className="text-xs text-orange-600">Requires immediate attention</p>
                  </div>
                  <span className="text-xl font-bold text-orange-900">
                    {kycRequests.filter(r => r.status === 'pending').length}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-800">Under Review</p>
                    <p className="text-xs text-blue-600">Currently being processed</p>
                  </div>
                  <span className="text-xl font-bold text-blue-900">
                    {kycRequests.filter(r => r.status === 'under_review').length}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">Approved Today</p>
                    <p className="text-xs text-green-600">Successfully verified</p>
                  </div>
                  <span className="text-xl font-bold text-green-900">12</span>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <FileText className="text-gray-400" size={20} />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-600" size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">KYC Approved</p>
                    <p className="text-xs text-gray-600">Tech Store Pro - 2 min ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="text-blue-600" size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New Seller Registration</p>
                    <p className="text-xs text-gray-600">Fashion Hub LLC - 15 min ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Package className="text-orange-600" size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Product Flagged</p>
                    <p className="text-xs text-gray-600">Suspicious listing reported - 1 hour ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="text-purple-600" size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Security Alert</p>
                    <p className="text-xs text-gray-600">Multiple failed login attempts - 3 hours ago</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="primary" size="sm" className="w-full justify-center">
                  <Shield className="mr-2" size={16} />
                  Bulk KYC Review
                </Button>
                <Button variant="secondary" size="sm" className="w-full justify-center">
                  <Package className="mr-2" size={16} />
                  Product Audit
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-center">
                  <FileText className="mr-2" size={16} />
                  Generate Report
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}