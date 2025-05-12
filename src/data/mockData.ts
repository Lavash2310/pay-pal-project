// Mock data for the application

// Mock transactions
export const mockTransactions = [
  {
    id: 'txn-001',
    date: '2025-01-05T10:23:45',
    description: 'Coffee Shop',
    amount: 4.75,
    type: 'debit' as const,
    category: 'Food & Drink',
    recipient: 'Starbucks',
    status: 'completed' as const
  },
  {
    id: 'txn-002',
    date: '2025-01-04T14:17:32',
    description: 'Salary Deposit',
    amount: 2800.00,
    type: 'credit' as const,
    category: 'Income',
    recipient: 'Employer Inc.',
    status: 'completed' as const
  },
  {
    id: 'txn-003',
    date: '2025-01-03T09:45:12',
    description: 'Grocery Store',
    amount: 74.32,
    type: 'debit' as const,
    category: 'Groceries',
    recipient: 'Whole Foods',
    status: 'completed' as const
  },
  {
    id: 'txn-004',
    date: '2025-01-02T18:30:00',
    description: 'Monthly Rent',
    amount: 1200.00,
    type: 'debit' as const,
    category: 'Housing',
    recipient: 'Property Management',
    status: 'completed' as const
  },
  {
    id: 'txn-005',
    date: '2025-01-01T12:05:45',
    description: 'Refund',
    amount: 29.99,
    type: 'credit' as const,
    category: 'Shopping',
    recipient: 'Amazon',
    status: 'completed' as const
  },
  {
    id: 'txn-006',
    date: '2024-12-31T16:42:11',
    description: 'Phone Bill',
    amount: 85.00,
    type: 'debit' as const,
    category: 'Utilities',
    recipient: 'Verizon',
    status: 'completed' as const
  },
  {
    id: 'txn-007',
    date: '2024-12-30T08:15:22',
    description: 'Online Purchase',
    amount: 49.99,
    type: 'debit' as const,
    category: 'Shopping',
    recipient: 'Best Buy',
    status: 'completed' as const
  },
  {
    id: 'txn-008',
    date: '2024-12-28T20:30:15',
    description: 'Restaurant',
    amount: 68.50,
    type: 'debit' as const,
    category: 'Food & Drink',
    recipient: 'Cheesecake Factory',
    status: 'completed' as const
  },
  {
    id: 'txn-009',
    date: '2024-12-28T13:12:45',
    description: 'Transfer from Sarah',
    amount: 125.00,
    type: 'credit' as const,
    category: 'Transfer',
    recipient: 'Sarah Johnson',
    status: 'completed' as const
  },
  {
    id: 'txn-010',
    date: '2024-12-27T09:05:30',
    description: 'Gym Membership',
    amount: 50.00,
    type: 'debit' as const,
    category: 'Health & Fitness',
    recipient: 'LA Fitness',
    status: 'completed' as const
  }
];

// Mock cards
export const mockCards = [
  {
    id: 'card-1',
    cardNumber: '4111 2222 3333 4444',
    cardHolder: 'John Doe',
    expiryDate: '09/26',
    cvv: '123',
    type: 'visa',
    isDefault: true
  },
  {
    id: 'card-2',
    cardNumber: '5555 6666 7777 8888',
    cardHolder: 'John Doe',
    expiryDate: '04/28',
    cvv: '456',
    type: 'mastercard',
    isDefault: false
  }
];

// Mock contacts
export const mockContacts = [
  {
    id: 'contact-1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    recent: true
  },
  {
    id: 'contact-2',
    name: 'Michael Smith',
    email: 'michael.smith@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    recent: true
  },
  {
    id: 'contact-3',
    name: 'Jessica Williams',
    email: 'jessica.w@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    recent: true
  },
  {
    id: 'contact-4',
    name: 'David Brown',
    email: 'david.brown@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    recent: true
  },
  {
    id: 'contact-5',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    recent: false
  },
  {
    id: 'contact-6',
    name: 'James Miller',
    email: 'james.miller@example.com',
    recent: false
  },
  {
    id: 'contact-7',
    name: 'Olivia Garcia',
    email: 'olivia.g@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    recent: false
  },
  {
    id: 'contact-8',
    name: 'Robert Wilson',
    email: 'robert.w@example.com',
    recent: false
  }
];