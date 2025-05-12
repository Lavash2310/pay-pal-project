import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  ShieldCheck,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockCards } from '../../data/mockData';
import { toast } from 'react-toastify';

const Cards: React.FC = () => {
  const { user } = useAuth();
  const [showCardDetails, setShowCardDetails] = useState<{ [key: string]: boolean }>({});
  const [cards, setCards] = useState(mockCards);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: `${user?.firstName} ${user?.lastName}`,
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const toggleCardDetails = (cardId: string) => {
    setShowCardDetails(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCard(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!newCard.cardNumber || !newCard.expiryMonth || !newCard.expiryYear || !newCard.cvv) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Format card number with spaces
    const formattedCardNumber = newCard.cardNumber
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
    
    const newCardObj = {
      id: `card-${Date.now()}`,
      cardNumber: formattedCardNumber,
      cardHolder: newCard.cardHolder,
      expiryDate: `${newCard.expiryMonth}/${newCard.expiryYear}`,
      cvv: newCard.cvv,
      type: 'visa',
      isDefault: cards.length === 0
    };
    
    setCards([...cards, newCardObj]);
    setIsAddingCard(false);
    setNewCard({
      cardNumber: '',
      cardHolder: `${user?.firstName} ${user?.lastName}`,
      expiryMonth: '',
      expiryYear: '',
      cvv: ''
    });
    
    toast.success('Card added successfully');
  };

  const handleRemoveCard = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
    toast.success('Card removed successfully');
  };

  const setDefaultCard = (cardId: string) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
    toast.success('Default card updated');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-900">My Cards</h1>
        <button 
          onClick={() => setIsAddingCard(true)}
          className="btn-primary flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add New Card
        </button>
      </div>
      
      {/* Card list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <motion.div 
            key={card.id}
            className="card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="relative w-full h-48 bg-gradient-to-r from-primary-500 to-primary-700 p-6 flex flex-col justify-between">
              {card.isDefault && (
                <div className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full px-2 py-1 text-xs text-white flex items-center">
                  <ShieldCheck size={12} className="mr-1" />
                  Default
                </div>
              )}
            
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-primary-100 text-sm mb-1">Card Type</p>
                  <p className="text-white text-lg font-bold capitalize">{card.type}</p>
                </div>
                <CreditCard size={32} className="text-white opacity-80" />
              </div>
              
              <div>
                <p className="text-primary-100 text-xs mb-1">Card Number</p>
                <p className="text-white text-lg font-mono tracking-wider">
                  {showCardDetails[card.id] 
                    ? card.cardNumber 
                    : card.cardNumber.replace(/\d(?=\d{4})/g, '•')}
                </p>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-primary-100 text-xs mb-1">Card Holder</p>
                  <p className="text-white font-medium">{card.cardHolder}</p>
                </div>
                <div>
                  <p className="text-primary-100 text-xs mb-1">Expires</p>
                  <p className="text-white font-medium">{card.expiryDate}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-neutral-200">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => toggleCardDetails(card.id)}
                    className="p-2 rounded-full hover:bg-neutral-100"
                  >
                    {showCardDetails[card.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button 
                    className="p-2 rounded-full hover:bg-neutral-100"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleRemoveCard(card.id)}
                    className="p-2 rounded-full hover:bg-neutral-100 text-danger-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {!card.isDefault && (
                  <button 
                    onClick={() => setDefaultCard(card.id)}
                    className="text-sm text-primary-500 hover:text-primary-600"
                  >
                    Set as default
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {cards.length === 0 && !isAddingCard && (
        <div className="card p-8 text-center">
          <CreditCard size={48} className="mx-auto text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-800 mb-2">No cards added yet</h3>
          <p className="text-neutral-600 mb-6">Add your first card to get started with transactions</p>
          <button 
            onClick={() => setIsAddingCard(true)}
            className="btn-primary"
          >
            Add Your First Card
          </button>
        </div>
      )}
      
      {/* Add new card form */}
      {isAddingCard && (
        <motion.div 
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-neutral-800">Add New Card</h2>
            <button 
              onClick={() => setIsAddingCard(false)}
              className="text-neutral-500 hover:text-neutral-700"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleAddCard} className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                Card Number
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                value={newCard.cardNumber}
                onChange={handleInputChange}
                className="input-field"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            
            <div>
              <label htmlFor="cardHolder" className="block text-sm font-medium text-neutral-700 mb-1">
                Card Holder
              </label>
              <input
                id="cardHolder"
                name="cardHolder"
                type="text"
                value={newCard.cardHolder}
                onChange={handleInputChange}
                className="input-field"
                placeholder="John Doe"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-neutral-700 mb-1">
                  Expiry Date
                </label>
                <div className="flex space-x-2">
                  <select
                    name="expiryMonth"
                    value={newCard.expiryMonth}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, '0');
                      return <option key={month} value={month}>{month}</option>;
                    })}
                  </select>
                  <select
                    name="expiryYear"
                    value={newCard.expiryYear}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">YY</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = (new Date().getFullYear() + i).toString().slice(-2);
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-neutral-700 mb-1">
                  CVV
                </label>
                <input
                  id="cvv"
                  name="cvv"
                  type="text"
                  maxLength={4}
                  value={newCard.cvv}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="123"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button type="submit" className="btn-primary w-full py-3">
                Add Card
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default Cards;