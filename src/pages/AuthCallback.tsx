
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Process the OAuth callback
    const handleCallback = async () => {
      try {
        // The hash fragment contains the token details
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (data.session) {
          // Successful login
          navigate('/', { replace: true });
        } else {
          // No session found
          navigate('/auth', { replace: true });
        }
      } catch (error) {
        console.error('Error during OAuth callback:', error);
        navigate('/auth', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary"></div>
        <p className="mt-4">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
