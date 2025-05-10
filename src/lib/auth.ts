
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";

// Helper function to clean up auth state to avoid limbo states
export const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    cleanupAuthState();
    
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Continue even if this fails
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    toast.success("Successfully signed in!");
    return data;
  } catch (error: any) {
    toast.error(error.message || "Failed to sign in");
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string, fullName: string) => {
  try {
    cleanupAuthState();
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    
    if (error) throw error;
    
    toast.success("Successfully signed up! Please verify your email if required.");
    return data;
  } catch (error: any) {
    toast.error(error.message || "Failed to sign up");
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    cleanupAuthState();
    
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Continue even if this fails
    }
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });
    
    if (error) throw error;
    
    return data;
  } catch (error: any) {
    toast.error(error.message || "Failed to sign in with Google");
    throw error;
  }
};

export const signOut = async () => {
  try {
    cleanupAuthState();
    await supabase.auth.signOut({ scope: 'global' });
    window.location.href = '/auth';
  } catch (error: any) {
    toast.error(error.message || "Failed to sign out");
  }
};
