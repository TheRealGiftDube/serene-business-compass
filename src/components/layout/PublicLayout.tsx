
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>BizConnect</h1>
            </div>
            <nav className="flex space-x-4">
              <Button variant="ghost" onClick={() => navigate('/businesses')}>
                Businesses
              </Button>
              <Button variant="ghost" onClick={() => navigate('/events')}>
                Events
              </Button>
              {isAuthenticated ? (
                <>
                  {userRole === 'admin' ? (
                    <Button variant="ghost" onClick={() => navigate('/admin')}>
                      Admin
                    </Button>
                  ) : (
                    <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </Button>
                  )}
                </>
              ) : (
                <Button variant="outline" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BizConnect</h3>
              <p className="text-gray-300">
                Zimbabwe's premier business directory for connecting businesses and customers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="text-gray-300 p-0" onClick={() => navigate('/businesses')}>
                    Browse Businesses
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-300 p-0" onClick={() => navigate('/events')}>
                    Upcoming Events
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-300 p-0" onClick={() => navigate('/auth')}>
                    Register Your Business
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">info@bizconnect.co.zw</p>
              <p className="text-gray-300">+263 123 456 789</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} BizConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
