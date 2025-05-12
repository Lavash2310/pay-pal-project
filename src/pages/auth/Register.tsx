import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-900">Create your account</h2>
        <p className="mt-2 text-neutral-600">
          Join thousands of users managing their transaction cards
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
              First Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-neutral-500" />
              </div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="John"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="input-field"
              placeholder="Doe"
            />
          </div>
        </div>

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
              value={formData.email}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-neutral-500" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="input-field pl-10 pr-10"
              placeholder="Minimum 8 characters"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
              {showPassword ? (
                <EyeOff
                  size={18}
                  className="text-neutral-500 hover:text-neutral-700"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  size={18}
                  className="text-neutral-500 hover:text-neutral-700"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-neutral-500" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="Confirm your password"
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
              'Create Account'
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-600">
          By signing up, you agree to our{' '}
          <a href="#" className="font-medium text-primary-500 hover:text-primary-600">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-primary-500 hover:text-primary-600">
            Privacy Policy
          </a>
        </p>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-neutral-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-500 hover:text-primary-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;