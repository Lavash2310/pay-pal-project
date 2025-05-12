import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col md:flex-row">
      {/* Left panel with branding */}
      <div className="bg-primary-500 text-white md:w-2/5 p-8 flex flex-col justify-center items-center">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full">
              <CreditCard size={40} className="text-primary-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">CardPay</h1>
          <p className="text-lg text-primary-100 mb-8">
            A secure platform for managing your transaction cards and sending money globally.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-primary-600 rounded-card">
              <h3 className="font-semibold mb-2">Secure Transactions</h3>
              <p className="text-sm text-primary-100">End-to-end encryption for your financial data</p>
            </div>
            <div className="p-4 bg-primary-600 rounded-card">
              <h3 className="font-semibold mb-2">Multiple Cards</h3>
              <p className="text-sm text-primary-100">Manage all your cards in one place</p>
            </div>
            <div className="p-4 bg-primary-600 rounded-card">
              <h3 className="font-semibold mb-2">Instant Transfers</h3>
              <p className="text-sm text-primary-100">Send money within seconds</p>
            </div>
            <div className="p-4 bg-primary-600 rounded-card">
              <h3 className="font-semibold mb-2">Global Support</h3>
              <p className="text-sm text-primary-100">Available in over 100 countries</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right panel with form */}
      <div className="md:w-3/5 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;