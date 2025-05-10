import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface HomeContent {
  headline: string;
  category: string;
  cta1: string;
  cta2: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();
  const [content, setContent] = useState<HomeContent>({
    headline: "Zimbabwe's Most Detailed Tyre Directory",
    category: "Tyre",
    cta1: "Explore Listed Businesses",
    cta2: "Register Your Business"
  });
  
  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('content')
          .eq('page_name', 'home')
          .single();
        
        if (error) throw error;
        
        if (data && data.content) {
          // Type guard to ensure content has the expected shape
          const contentData = data.content as Record<string, any>;
          
          // Verify and extract the required fields
          if (
            typeof contentData.headline === 'string' &&
            typeof contentData.category === 'string' &&
            typeof contentData.cta1 === 'string' &&
            typeof contentData.cta2 === 'string'
          ) {
            setContent({
              headline: contentData.headline,
              category: contentData.category,
              cta1: contentData.cta1,
              cta2: contentData.cta2
            });
          }
        }
      } catch (error) {
        console.error('Error fetching home page content:', error);
      }
    };
    
    fetchHomeContent();
  }, []);
  
  const handleExplore = () => {
    navigate('/businesses');
  };
  
  const handleRegister = () => {
    if (isAuthenticated) {
      if (userRole === 'admin') {
        navigate('/admin/businesses');
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold">BizConnect</h1>
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
      
      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              {content.headline.replace('X', content.category)}
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
              Find all {content.category.toLowerCase()} businesses in one place. Compare services, read reviews, and connect directly with providers.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" onClick={handleExplore}>
                {content.cta1}
              </Button>
              <Button variant="outline" size="lg" onClick={handleRegister}>
                {content.cta2}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Featured Businesses Section */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Featured Businesses</h2>
              <p className="mt-4 text-lg text-gray-500">
                Discover top-rated {content.category.toLowerCase()} businesses
              </p>
            </div>
            
            {/* This will be populated with actual businesses from the database */}
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-6 h-64 flex items-center justify-center">
                  <p className="text-gray-500">Business Placeholder {i + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BizConnect</h3>
              <p className="text-gray-300">
                Zimbabwe's premier business directory for {content.category.toLowerCase()} services.
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

export default HomePage;
