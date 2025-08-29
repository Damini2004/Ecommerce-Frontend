"use client";

import { useState, useEffect } from "react";
import { Shield, Upload, CheckCircle, XCircle, Clock, AlertCircle, FileText } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function SellerKYCPage() {
  const [kycStatus, setKycStatus] = useState('not_submitted');
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    businessAddress: '',
    taxId: '',
    documents: []
  });
  const [loading, setLoading] = useState(false);

  const documentTypes = [
    { id: 'business_license', label: 'Business License', required: true, uploaded: false },
    { id: 'tax_certificate', label: 'Tax Certificate', required: true, uploaded: false },
    { id: 'identity_proof', label: 'Identity Proof', required: true, uploaded: false },
    { id: 'bank_statement', label: 'Bank Statement', required: false, uploaded: false },
    { id: 'address_proof', label: 'Address Proof', required: false, uploaded: false },
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'not_submitted':
        return { 
          icon: AlertCircle, 
          color: 'warning', 
          title: 'KYC Not Submitted', 
          description: 'Complete your KYC verification to start selling' 
        };
      case 'pending':
        return { 
          icon: Clock, 
          color: 'info', 
          title: 'KYC Under Review', 
          description: 'Your documents are being reviewed by our team' 
        };
      case 'approved':
        return { 
          icon: CheckCircle, 
          color: 'success', 
          title: 'KYC Approved', 
          description: 'Your account is verified and ready for selling' 
        };
      case 'rejected':
        return { 
          icon: XCircle, 
          color: 'danger', 
          title: 'KYC Rejected', 
          description: 'Please review and resubmit your documents' 
        };
      default:
        return { 
          icon: AlertCircle, 
          color: 'default', 
          title: 'Unknown Status', 
          description: 'Please contact support' 
        };
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (documentType) => {
    // Simulate file upload
    console.log('Uploading document:', documentType);
    // In real implementation, this would handle file upload to server
  };

  const handleSubmitKYC = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setKycStatus('pending');
      setLoading(false);
    }, 2000);
  };

  const statusInfo = getStatusInfo(kycStatus);
  const StatusIcon = statusInfo.icon;

  return (
    <DashboardLayout 
      userRole="seller" 
      activePage="kyc" 
      title="KYC Verification"
    >
      <div className="space-y-6">
        {/* Status Banner */}
        <Card className={`border-l-4 ${
          statusInfo.color === 'success' ? 'border-green-500 bg-green-50' :
          statusInfo.color === 'warning' ? 'border-yellow-500 bg-yellow-50' :
          statusInfo.color === 'info' ? 'border-blue-500 bg-blue-50' :
          statusInfo.color === 'danger' ? 'border-red-500 bg-red-50' :
          'border-gray-500 bg-gray-50'
        }`}>
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-full ${
              statusInfo.color === 'success' ? 'bg-green-100' :
              statusInfo.color === 'warning' ? 'bg-yellow-100' :
              statusInfo.color === 'info' ? 'bg-blue-100' :
              statusInfo.color === 'danger' ? 'bg-red-100' :
              'bg-gray-100'
            }`}>
              <StatusIcon className={`${
                statusInfo.color === 'success' ? 'text-green-600' :
                statusInfo.color === 'warning' ? 'text-yellow-600' :
                statusInfo.color === 'info' ? 'text-blue-600' :
                statusInfo.color === 'danger' ? 'text-red-600' :
                'text-gray-600'
              }`} size={24} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{statusInfo.title}</h2>
              <p className="text-gray-700 mb-4">{statusInfo.description}</p>
              
              {kycStatus === 'approved' && (
                <Badge variant="success" className="mb-2">
                  <CheckCircle size={14} className="mr-1" />
                  Verified Seller
                </Badge>
              )}
              
              {kycStatus === 'pending' && (
                <div className="text-sm text-blue-700">
                  <p>⏱️ Average review time: 2-3 business days</p>
                  <p>📧 You'll receive an email notification once reviewed</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* KYC Form */}
          <div className="lg:col-span-2">
            {kycStatus === 'not_submitted' || kycStatus === 'rejected' ? (
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
                  <Shield className="text-gray-400" size={20} />
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Business Name"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Enter your business name"
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select business type</option>
                        <option value="sole_proprietorship">Sole Proprietorship</option>
                        <option value="partnership">Partnership</option>
                        <option value="corporation">Corporation</option>
                        <option value="llc">Limited Liability Company</option>
                      </select>
                    </div>
                  </div>

                  <Input
                    label="Business Address"
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your complete business address"
                    required
                  />

                  <Input
                    label="Tax Identification Number"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                    placeholder="Enter your tax ID"
                    required
                  />

                  {/* Document Upload */}
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Required Documents</h4>
                    <div className="space-y-4">
                      {documentTypes.map((docType) => (
                        <div key={docType.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <FileText className="text-gray-400" size={16} />
                              <span className="font-medium text-gray-900">{docType.label}</span>
                              {docType.required && (
                                <Badge variant="danger" size="sm">Required</Badge>
                              )}
                            </div>
                            {docType.uploaded && (
                              <CheckCircle className="text-green-500" size={16} />
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() => handleFileUpload(docType.id)}
                            >
                              <Upload size={14} className="mr-2" />
                              {docType.uploaded ? 'Replace File' : 'Upload File'}
                            </Button>
                            {docType.uploaded && (
                              <span className="text-sm text-green-600">✓ Uploaded</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button variant="secondary">Save Draft</Button>
                    <Button
                      variant="primary"
                      loading={loading}
                      onClick={handleSubmitKYC}
                    >
                      Submit for Review
                    </Button>
                  </div>
                </form>
              </Card>
            ) : (
              <Card>
                <div className="text-center py-12">
                  <StatusIcon className={`mx-auto mb-4 ${
                    statusInfo.color === 'success' ? 'text-green-500' :
                    statusInfo.color === 'info' ? 'text-blue-500' :
                    'text-gray-500'
                  }`} size={64} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {statusInfo.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{statusInfo.description}</p>
                  
                  {kycStatus === 'pending' && (
                    <Button variant="secondary">
                      Check Status
                    </Button>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* KYC Progress */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Progress</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    kycStatus !== 'not_submitted' ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {kycStatus !== 'not_submitted' ? (
                      <CheckCircle className="text-white" size={16} />
                    ) : (
                      <span className="text-white text-sm">1</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Submit Documents</p>
                    <p className="text-sm text-gray-500">Upload required business documents</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    kycStatus === 'approved' ? 'bg-green-500' : 
                    kycStatus === 'pending' ? 'bg-blue-500' :
                    'bg-gray-300'
                  }`}>
                    {kycStatus === 'approved' ? (
                      <CheckCircle className="text-white" size={16} />
                    ) : kycStatus === 'pending' ? (
                      <Clock className="text-white" size={16} />
                    ) : (
                      <span className="text-white text-sm">2</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Under Review</p>
                    <p className="text-sm text-gray-500">Our team reviews your information</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    kycStatus === 'approved' ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {kycStatus === 'approved' ? (
                      <CheckCircle className="text-white" size={16} />
                    ) : (
                      <span className="text-white text-sm">3</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Verification Complete</p>
                    <p className="text-sm text-gray-500">Start selling on our platform</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Help & Support */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">📋 Document Guidelines</h4>
                  <p className="text-sm text-blue-700">
                    Ensure all documents are clear, legible, and up-to-date
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-1">⚡ Quick Tips</h4>
                  <p className="text-sm text-green-700">
                    Upload high-resolution images for faster approval
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-1">💬 Support</h4>
                  <p className="text-sm text-purple-700">
                    Contact our team for assistance with KYC process
                  </p>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="w-full mt-4">
                Contact Support
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}