import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  DollarSign, 
  ArrowRight, 
  TrendingUp, 
  Send, 
  Plus,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService, Transaction } from '../../services/api';
import TransactionItem from '../../components/TransactionItem';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadRecentTransactions();
    }
  }, [user]);

  const loadRecentTransactions = async () => {
    if (!user) return;
    
    try {
      const transactions = await apiService.getTransactions(user.id);
      setRecentTransactions(transactions.slice(0, 5));
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
      
      {/* Balance Card */}
      <motion.div 
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-neutral-700">Total Balance</h2>
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="text-neutral-500 hover:text-neutral-700"
          >
            {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-neutral-900 font-mono">
            {showBalance 
              ? `$${user?.balance?.toFixed(2)}` 
              : '••••••'}
          </span>
          <span className="ml-2 text-xs font-medium text-success-500 bg-success-50 px-2 py-1 rounded">
            +2.4% this month
          </span>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/cards"
            className="flex items-center justify-between p-3 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors"
          >
            <div className="flex items-center">
              <CreditCard size={18} className="text-primary-500 mr-2" />
              <span className="text-sm font-medium text-primary-500">My Cards</span>
            </div>
            <ArrowRight size={16} className="text-primary-500" />
          </Link>
          <Link 
            to="/send"
            className="flex items-center justify-between p-3 rounded-lg bg-secondary-50 hover:bg-secondary-100 transition-colors"
          >
            <div className="flex items-center">
              <Send size={18} className="text-secondary-500 mr-2" />
              <span className="text-sm font-medium text-secondary-500">Send Money</span>
            </div>
            <ArrowRight size={16} className="text-secondary-500" />
          </Link>
          <Link 
            to="/transactions"
            className="flex items-center justify-between p-3 rounded-lg bg-success-50 hover:bg-success-100 transition-colors"
          >
            <div className="flex items-center">
              <TrendingUp size={18} className="text-success-500 mr-2" />
              <span className="text-sm font-medium text-success-500">Transactions</span>
            </div>
            <ArrowRight size={16} className="text-success-500" />
          </Link>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="text-lg font-medium text-neutral-700">Recent Transactions</h2>
            <Link to="/transactions" className="text-sm text-primary-500 hover:text-primary-600 flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-neutral-200">
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))
            )}
          </div>
          {recentTransactions.length === 0 && (
            <div className="p-6 text-center text-neutral-500">
              No transactions found
            </div>
          )}
        </motion.div>
        
        {/* My Cards */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="text-lg font-medium text-neutral-700">My Cards</h2>
            <Link to="/cards" className="text-sm text-primary-500 hover:text-primary-600 flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="relative w-full h-48 bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl overflow-hidden p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-primary-100 text-sm mb-1">Current Balance</p>
                  <p className="text-white text-2xl font-mono font-bold">
                    {showBalance ? '$1,845.32' : '••••••'}
                  </p>
                </div>
                <CreditCard size={32} className="text-white opacity-80" />
              </div>
              
              <div>
                <p className="text-primary-100 text-xs mb-1">Card Number</p>
                <p className="text-white text-lg font-mono tracking-wider">
                  {showBalance ? '•••• •••• •••• 3456' : '•••• •••• •••• ••••'}
                </p>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-primary-100 text-xs mb-1">Card Holder</p>
                  <p className="text-white font-medium">{user?.firstName} {user?.lastName}</p>
                </div>
                <div>
                  <p className="text-primary-100 text-xs mb-1">Expires</p>
                  <p className="text-white font-medium">09/27</p>
                </div>
              </div>
            </div>
            
            <Link 
              to="/cards"
              className="btn-secondary w-full flex items-center justify-center py-3"
            >
              <Plus size={18} className="mr-2" />
              Add New Card
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;