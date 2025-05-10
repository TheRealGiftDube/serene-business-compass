
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { checkUserRole } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Process the OAuth callback
    const handleCallback = async () => {
      try {
        setIsProcessing(true);
        // The hash fragment contains the token details
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (data.session) {
          // Check if email exists in the auth.users table
          const { data: userData, error: userError } = await supabase.auth.getUser();
          
          if (userError) throw userError;
          
          if (userData.user) {
            toast.success('Successfully signed in!');
            
            // Check user role to determine redirect
            const role = await checkUserRole();
            
            // Redirect based on role
            if (role === 'admin') {
              navigate('/admin', { replace: true });
            } else if (role === 'business_owner') {
              navigate('/dashboard', { replace: true });
            } else {
              navigate('/', { replace: true });
            }
          } else {
            // No user found
            toast.error('Authentication error: User not found');
            navigate('/auth', { replace: true });
          }
        } else {
          // No session found
          toast.error('Authentication error: No session found');
          navigate('/auth', { replace: true });
        }
      } catch (error: any) {
        console.error('Error during OAuth callback:', error);
        toast.error(`Authentication error: ${error.message || 'Unknown error'}`);
        navigate('/auth', { replace: true });
      } finally {
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, [navigate, checkUserRole]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary"></div>
        <p className="mt-4">
          {isProcessing ? 'Completing authentication...' : 'Redirecting...'}
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
