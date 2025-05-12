import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  RefreshCw, 
  Send, 
  Settings, 
  X, 
  Bell,
  User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/cards', icon: <CreditCard size={20} />, label: 'Cards' },
    { path: '/transactions', icon: <RefreshCw size={20} />, label: 'Transactions' },
    { path: '/send', icon: <Send size={20} />, label: 'Send Money' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Top navbar */}
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  onClick={toggleSidebar}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Menu size={24} aria-hidden="true" />
                </button>
              </div>
              
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 text-primary-500" />
                  <span className="ml-2 text-xl font-bold text-primary-500">CardPay</span>
                </div>
              </div>
            </div>
            
            {/* User dropdown and notifications */}
            <div className="flex items-center">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Notification bell */}
                <button className="p-2 rounded-full text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <Bell size={20} />
                </button>
                
                {/* Profile dropdown */}
                <div className="ml-3 relative flex items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                      <User size={18} />
                    </div>
                    <span className="ml-2 text-sm font-medium text-neutral-700 hidden md:block">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar */}
        <div 
          className={`fixed inset-0 flex z-40 md:hidden transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="fixed inset-0 bg-neutral-600 bg-opacity-75" onClick={toggleSidebar}></div>
          
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <CreditCard className="h-8 w-8 text-primary-500" />
                <span className="ml-2 text-xl font-bold text-primary-500">CardPay</span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `group flex items-center px-2 py-3 text-base font-medium rounded-md ${
                        isActive
                          ? 'bg-primary-50 text-primary-500'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <div className="mr-4">{item.icon}</div>
                    {item.label}
                  </NavLink>
                ))}
                
                <button
                  onClick={handleLogout}
                  className="w-full group flex items-center px-2 py-3 text-base font-medium rounded-md text-danger-500 hover:bg-danger-50"
                >
                  <LogOut size={20} className="mr-4" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1 border-r border-neutral-200 bg-white">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `group flex items-center px-2 py-3 text-sm font-medium rounded-md ${
                          isActive
                            ? 'bg-primary-50 text-primary-500'
                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                        }`
                      }
                    >
                      <div className="mr-3">{item.icon}</div>
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-neutral-200 p-4">
                <button
                  onClick={handleLogout}
                  className="flex-shrink-0 w-full group flex items-center py-2 text-sm font-medium rounded-md text-danger-500 hover:bg-danger-50"
                >
                  <LogOut size={20} className="mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;