import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Search, User, DollarSign, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { mockContacts } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

type ContactType = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  recent: boolean;
};

const SendMoney: React.FC = () => {
  const { user } = useAuth();
  const [step, setStep] = useState<'select' | 'amount' | 'confirm' | 'success'>('select');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const selectContact = (contact: ContactType) => {
    setSelectedContact(contact);
    setStep('amount');
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow valid decimal numbers
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setAmount(value);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    setStep('confirm');
  };
  
  const handleConfirm = () => {
    // Simulate transaction processing
    setTimeout(() => {
      setStep('success');
      toast.success('Money sent successfully!');
    }, 1000);
  };
  
  const handleReset = () => {
    setStep('select');
    setSelectedContact(null);
    setAmount('');
    setNote('');
  };
  
  // Filter contacts based on search term
  const filteredContacts = mockContacts.filter(contact => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower)
    );
  });
  
  // Separate recent and other contacts
  const recentContacts = filteredContacts.filter(contact => contact.recent);
  const otherContacts = filteredContacts.filter(contact => !contact.recent);

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Send Money</h1>
      
      {step === 'select' && (
        <motion.div 
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-medium text-neutral-800 mb-4">Select Recipient</h2>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-neutral-500" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name or email"
              className="input-field pl-10"
            />
          </div>
          
          {recentContacts.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-neutral-600 mb-3">Recent</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {recentContacts.map(contact => (
                  <button
                    key={contact.id}
                    onClick={() => selectContact(contact)}
                    className="flex flex-col items-center p-4 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
                      {contact.avatar ? (
                        <img 
                          src={contact.avatar} 
                          alt={contact.name}
                          className="w-12 h-12 rounded-full object-cover" 
                        />
                      ) : (
                        <User size={24} className="text-primary-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-neutral-800 truncate max-w-full">
                      {contact.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {otherContacts.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-neutral-600 mb-3">All Contacts</h3>
              <div className="space-y-2">
                {otherContacts.map(contact => (
                  <button
                    key={contact.id}
                    onClick={() => selectContact(contact)}
                    className="flex items-center w-full p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                      {contact.avatar ? (
                        <img 
                          src={contact.avatar} 
                          alt={contact.name}
                          className="w-10 h-10 rounded-full object-cover" 
                        />
                      ) : (
                        <User size={20} className="text-primary-500" />
                      )}
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-medium text-neutral-800">
                        {contact.name}
                      </span>
                      <p className="text-xs text-neutral-500">{contact.email}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {filteredContacts.length === 0 && (
            <div className="text-center py-8">
              <Search size={48} className="mx-auto text-neutral-400 mb-4" />
              <h3 className="text-lg font-medium text-neutral-800 mb-2">No contacts found</h3>
              <p className="text-neutral-600">
                Try searching with a different term
              </p>
            </div>
          )}
        </motion.div>
      )}
      
      {step === 'amount' && selectedContact && (
        <motion.div 
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button 
            onClick={() => setStep('select')}
            className="flex items-center text-neutral-600 hover:text-neutral-800 mb-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-3">
              {selectedContact.avatar ? (
                <img 
                  src={selectedContact.avatar} 
                  alt={selectedContact.name}
                  className="w-16 h-16 rounded-full object-cover" 
                />
              ) : (
                <User size={32} className="text-primary-500" />
              )}
            </div>
            <h2 className="text-xl font-medium text-neutral-800">
              {selectedContact.name}
            </h2>
            <p className="text-sm text-neutral-600">{selectedContact.email}</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="amount" className="block text-sm font-medium text-neutral-700 mb-1">
                Amount to Send
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign size={18} className="text-neutral-500" />
                </div>
                <input
                  id="amount"
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={handleAmountChange}
                  className="input-field pl-10 text-xl"
                  placeholder="0.00"
                  autoFocus
                />
              </div>
              {user?.balance !== undefined && (
                <p className="mt-2 text-sm text-neutral-600">
                  Available balance: ${user.balance.toFixed(2)}
                </p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="note" className="block text-sm font-medium text-neutral-700 mb-1">
                Add a Note (Optional)
              </label>
              <input
                id="note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="input-field"
                placeholder="What's this for?"
              />
            </div>
            
            <button 
              type="submit"
              className="btn-primary w-full py-3 flex items-center justify-center"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              <Send size={18} className="mr-2" />
              Continue
            </button>
          </form>
        </motion.div>
      )}
      
      {step === 'confirm' && selectedContact && (
        <motion.div 
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button 
            onClick={() => setStep('amount')}
            className="flex items-center text-neutral-600 hover:text-neutral-800 mb-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </button>
          
          <h2 className="text-xl font-medium text-neutral-800 mb-6 text-center">
            Confirm Transaction
          </h2>
          
          <div className="space-y-6 mb-8">
            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-neutral-600 mb-1">Sending money to</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  {selectedContact.avatar ? (
                    <img 
                      src={selectedContact.avatar} 
                      alt={selectedContact.name}
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                  ) : (
                    <User size={20} className="text-primary-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-neutral-800">{selectedContact.name}</p>
                  <p className="text-sm text-neutral-600">{selectedContact.email}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-neutral-600 mb-1">Amount</p>
              <p className="text-2xl font-bold text-neutral-900 font-mono">${parseFloat(amount).toFixed(2)}</p>
              {note && (
                <p className="text-sm text-neutral-600 mt-2">
                  Note: {note}
                </p>
              )}
            </div>
            
            <div className="p-4 bg-neutral-50 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="text-neutral-800">Fee</p>
                <p className="font-medium text-neutral-800">$0.00</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-neutral-800">Total</p>
                <p className="font-medium text-neutral-800 font-mono">${parseFloat(amount).toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button 
              onClick={handleConfirm}
              className="btn-primary py-3 flex items-center justify-center"
            >
              Confirm and Send
            </button>
            <button 
              onClick={() => setStep('amount')}
              className="btn-secondary py-3"
            >
              Edit Details
            </button>
          </div>
        </motion.div>
      )}
      
      {step === 'success' && selectedContact && (
        <motion.div 
          className="card p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-success-500" />
          </div>
          
          <h2 className="text-xl font-medium text-neutral-800 mb-2">
            Money Sent Successfully!
          </h2>
          <p className="text-neutral-600 mb-6">
            You sent ${parseFloat(amount).toFixed(2)} to {selectedContact.name}
          </p>
          
          <div className="p-4 bg-neutral-50 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-neutral-600">Date</p>
              <p className="text-sm font-medium text-neutral-800">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-neutral-600">Time</p>
              <p className="text-sm font-medium text-neutral-800">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-neutral-600">Transaction ID</p>
              <p className="text-sm font-medium text-neutral-800">
                #{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-neutral-600">Status</p>
              <p className="text-sm font-medium text-success-500">
                Completed
              </p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button 
              onClick={handleReset}
              className="btn-primary py-3"
            >
              Send Money to Someone Else
            </button>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="btn-secondary py-3"
            >
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SendMoney;