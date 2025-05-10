
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
    <div>
      {/* Hero Section */}
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
    </div>
  );
};

export default HomePage;
