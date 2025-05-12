import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { User, Lock, Globe, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type SettingsTabType = 'profile' | 'security' | 'notifications' | 'preferences';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTabType>('profile');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'english',
    currency: 'usd',
    notifications: {
      email: true,
      push: true,
      transactions: true,
      marketing: false,
      security: true
    }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const [category, setting] = name.split('.');
    
    if (category === 'notifications') {
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [setting]: checked
        }
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings updated successfully');
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    toast.success('Password updated successfully');
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };
  
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Lock size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <Globe size={18} /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tabs sidebar */}
        <div className="md:col-span-1">
          <div className="card overflow-hidden">
            <nav className="flex flex-col">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as SettingsTabType)}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-500 border-l-4 border-primary-500'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
              
              <hr className="my-2" />
              
              <button
                className="flex items-center px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                <Shield size={18} className="mr-3" />
                Privacy & Security
              </button>
              
              <button
                className="flex items-center px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                <HelpCircle size={18} className="mr-3" />
                Help & Support
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 text-sm font-medium text-danger-500 hover:bg-danger-50"
              >
                <LogOut size={18} className="mr-3" />
                Log Out
              </button>
            </nav>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="md:col-span-3">
          <motion.div 
            key={activeTab}
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && (
              <>
                <h2 className="text-xl font-medium text-neutral-800 mb-6">Profile Settings</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" className="btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </>
            )}
            
            {activeTab === 'security' && (
              <>
                <h2 className="text-xl font-medium text-neutral-800 mb-6">Security Settings</h2>
                
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" className="btn-primary">
                      Update Password
                    </button>
                  </div>
                </form>
                
                <hr className="my-8" />
                
                <h3 className="text-lg font-medium text-neutral-800 mb-4">Two-Factor Authentication</h3>
                <p className="text-neutral-600 mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <button className="btn-secondary">
                  Enable Two-Factor Authentication
                </button>
                
                <hr className="my-8" />
                
                <h3 className="text-lg font-medium text-neutral-800 mb-4">Connected Devices</h3>
                <p className="text-neutral-600 mb-4">
                  These devices have access to your account:
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-neutral-800">Chrome on Windows</p>
                        <p className="text-sm text-neutral-600">Last active: Today at 10:23 AM</p>
                        <p className="text-sm text-neutral-600">IP: 192.168.1.1</p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                          Current
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-neutral-800">Safari on iPhone</p>
                        <p className="text-sm text-neutral-600">Last active: Yesterday at 8:47 PM</p>
                        <p className="text-sm text-neutral-600">IP: 192.168.1.2</p>
                      </div>
                      <div>
                        <button className="text-sm text-danger-500 hover:text-danger-600">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'notifications' && (
              <>
                <h2 className="text-xl font-medium text-neutral-800 mb-6">Notification Settings</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-neutral-700">Communication Channels</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-neutral-800">Email Notifications</p>
                        <p className="text-sm text-neutral-600">Receive updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox"
                          name="notifications.email" 
                          checked={formData.notifications.email}
                          onChange={handleCheckboxChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-neutral-800">Push Notifications</p>
                        <p className="text-sm text-neutral-600">Receive notifications in your browser</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox"
                          name="notifications.push" 
                          checked={formData.notifications.push}
                          onChange={handleCheckboxChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  </div>
                  
                  <hr />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-neutral-700">Notification Types</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-neutral-800">Transaction Updates</p>
                        <p className="text-sm text-neutral-600">Get notified about your transaction activity</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox"
                          name="notifications.transactions" 
                          checked={formData.notifications.transactions}
                          onChange={handleCheckboxChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-neutral-800">Security Alerts</p>
                        <p className="text-sm text-neutral-600">Important security updates and unusual activity</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox"
                          name="notifications.security" 
                          checked={formData.notifications.security}
                          onChange={handleCheckboxChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-neutral-800">Marketing & Promotions</p>
                        <p className="text-sm text-neutral-600">New features, offers and tips</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox"
                          name="notifications.marketing" 
                          checked={formData.notifications.marketing}
                          onChange={handleCheckboxChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" className="btn-primary">
                      Save Preferences
                    </button>
                  </div>
                </form>
              </>
            )}
            
            {activeTab === 'preferences' && (
              <>
                <h2 className="text-xl font-medium text-neutral-800 mb-6">Preferences</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-neutral-700 mb-1">
                      Language
                    </label>
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="japanese">Japanese</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-neutral-700 mb-1">
                      Currency
                    </label>
                    <select
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="usd">USD ($)</option>
                      <option value="eur">EUR (€)</option>
                      <option value="gbp">GBP (£)</option>
                      <option value="jpy">JPY (¥)</option>
                      <option value="cad">CAD ($)</option>
                      <option value="aud">AUD ($)</option>
                    </select>
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" className="btn-primary">
                      Save Preferences
                    </button>
                  </div>
                </form>
                
                <hr className="my-8" />
                
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-neutral-800">Account Actions</h3>
                  
                  <div className="p-4 border border-neutral-200 rounded-lg space-y-4">
                    <h4 className="text-base font-medium text-neutral-800">Download Your Data</h4>
                    <p className="text-sm text-neutral-600">
                      Request a copy of your personal data stored in our system.
                    </p>
                    <button className="btn-secondary text-sm">Request Data Export</button>
                  </div>
                  
                  <div className="p-4 border border-neutral-200 rounded-lg space-y-4">
                    <h4 className="text-base font-medium text-danger-500">Delete Account</h4>
                    <p className="text-sm text-neutral-600">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button className="btn-danger text-sm">Delete Account</button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;