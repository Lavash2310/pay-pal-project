import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      toast.error('Failed to send password reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-success-100 rounded-full p-4">
              <Mail size={24} className="text-success-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900">Check your email</h2>
          <p className="mt-4 text-neutral-600">
            We've sent password reset instructions to <span className="font-medium">{email}</span>
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Link to="/login" className="w-full btn-primary py-3 flex justify-center">
            Return to Login
          </Link>
          <p className="text-center text-sm text-neutral-600">
            Didn't receive the email?{' '}
            <button 
              onClick={() => setIsSubmitted(false)}
              className="font-medium text-primary-500 hover:text-primary-600"
            >
              Click to try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-900">Reset your password</h2>
        <p className="mt-2 text-neutral-600">
          Enter your email address and we'll send you instructions to reset your password
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-neutral-500" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field pl-10"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary py-3 flex justify-center"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              'Send Reset Instructions'
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-8 text-center">
        <Link 
          to="/login" 
          className="inline-flex items-center text-sm font-medium text-primary-500 hover:text-primary-600"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;