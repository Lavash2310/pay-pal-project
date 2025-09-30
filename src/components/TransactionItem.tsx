import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ExternalLink, CreditCard } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  recipient: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionItemProps {
  transaction: Transaction;
  showDate?: boolean;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, showDate = false }) => {
  const isCredit = transaction.type === 'credit' || transaction.amount > 0;
  const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: showDate ? 'numeric' : undefined
  });

  const getStatusBadge = () => {
    switch (transaction.status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success-100 text-success-800">
            Completed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-warning-100 text-warning-800">
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-danger-100 text-danger-800">
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card-transaction hover:bg-neutral-50 transition-colors">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mr-3">
          {isCredit ? (
            <ArrowDownLeft size={20} className="text-success-500" />
          ) : (
            <ArrowUpRight size={20} className="text-danger-500" />
          )}
        </div>
        <div>
          <p className="font-medium text-neutral-800">{transaction.description}</p>
          <div className="flex items-center text-sm text-neutral-500">
            <span>{transaction.recipient}</span>
            {showDate && (
              <>
                <span className="mx-1">•</span>
                <span>{formattedDate}</span>
              </>
            )}
            <span className="mx-1">•</span>
            {getStatusBadge()}
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-mono font-medium ${
          isCredit ? 'amount-positive' : 'amount-negative'
        }`}>
          {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
        </p>
        {!showDate && (
          <p className="text-xs text-neutral-500">{formattedDate}</p>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;