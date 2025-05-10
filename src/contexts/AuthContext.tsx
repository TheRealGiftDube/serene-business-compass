
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UserRole {
  role: 'admin' | 'business_owner' | 'public';
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: UserRole['role'];
  checkUserRole: () => Promise<UserRole['role']>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
  userRole: 'public',
  checkUserRole: async () => 'public',
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole['role']>('public');
  const navigate = useNavigate();

  const checkUserRole = async (): Promise<UserRole['role']> => {
    if (!user) return 'public';
    
    try {
      const { data, error } = await supabase.rpc('get_user_role');
      
      if (error) throw error;
      
      const role = data as UserRole['role'];
      setUserRole(role);
      return role;
    } catch (error) {
      console.error("Error checking user role:", error);
      return 'public';
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          await checkUserRole();
        } else {
          setUserRole('public');
        }
        
        setIsLoading(false);
        
        // Simple redirects based on auth state
        if (event === 'SIGNED_IN' && window.location.pathname === '/auth') {
          // Use setTimeout to prevent Supabase auth deadlocks
          setTimeout(() => {
            navigate('/');
          }, 0);
        }
        
        if (event === 'SIGNED_OUT') {
          // Use setTimeout to prevent Supabase auth deadlocks
          setTimeout(() => {
            navigate('/auth');
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        await checkUserRole();
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const value = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    userRole,
    checkUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const RequireAuth: React.FC<{ 
  children: React.ReactNode;
  requiredRole?: 'admin' | 'business_owner';
}> = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/auth');
      } else if (requiredRole && userRole !== requiredRole) {
        toast.error(`Access denied. You need ${requiredRole} permissions.`);
        navigate('/');
      }
    }
  }, [isAuthenticated, isLoading, navigate, requiredRole, userRole]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && userRole !== requiredRole) {
    return null;
  }

  return <>{children}</>;
};
