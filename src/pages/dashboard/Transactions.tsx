import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowDownUp, Download } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService, Transaction } from '../../services/api';
import TransactionItem from '../../components/TransactionItem';

const Transactions: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<'all' | 'incoming' | 'outgoing'>('all');
  
  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  const loadTransactions = async () => {
    if (!user) return;
    
    try {
      const userTransactions = await apiService.getTransactions(user.id);
      setTransactions(userTransactions);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter(transaction => {
      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          transaction.description.toLowerCase().includes(searchLower) ||
          transaction.recipient.toLowerCase().includes(searchLower) ||
          transaction.amount.toString().includes(searchLower)
        );
      }
      return true;
    })
    .filter(transaction => {
      // Filter by transaction type
      if (filterType === 'incoming') return transaction.type === 'credit';
      if (filterType === 'outgoing') return transaction.type === 'debit';
      return true;
    })
    .sort((a, b) => {
      // Sort by date
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">Transactions</h1>
      
      {/* Filters and search */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-neutral-500" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search transactions"
              className="input-field pl-10"
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="input-field pl-10 pr-10 appearance-none"
              >
                <option value="all">All Transactions</option>
                <option value="incoming">Incoming</option>
                <option value="outgoing">Outgoing</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-neutral-500" />
              </div>
            </div>
            
            <button
              onClick={toggleSortOrder}
              className={`btn ${
                sortOrder === 'asc' ? 'bg-primary-50 text-primary-500' : 'bg-neutral-50 text-neutral-700'
              }`}
            >
              <ArrowDownUp size={18} />
            </button>
            
            <button className="btn bg-neutral-50 text-neutral-700">
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Transactions list */}
      <motion.div 
        className="card divide-y divide-neutral-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {filteredTransactions.map((transaction, index) => (
          <TransactionItem 
            key={transaction.id} 
            transaction={transaction} 
            showDate 
          />
        ))}
        
        {filteredTransactions.length === 0 && (
          <div className="p-8 text-center">
            <Search size={48} className="mx-auto text-neutral-400 mb-4" />
            <h3 className="text-lg font-medium text-neutral-800 mb-2">No transactions found</h3>
            <p className="text-neutral-600">
              {searchTerm ? 'Try adjusting your search or filters' : 'You haven\'t made any transactions yet'}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Transactions;