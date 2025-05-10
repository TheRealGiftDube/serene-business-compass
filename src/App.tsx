
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import BusinessDirectory from "./pages/BusinessDirectory";
import BusinessProfile from "./pages/BusinessProfile";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import { AuthProvider, RequireAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route 
              path="/" 
              element={
                <RequireAuth>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </RequireAuth>
              } 
            />
            <Route 
              path="/businesses" 
              element={
                <RequireAuth>
                  <MainLayout>
                    <BusinessDirectory />
                  </MainLayout>
                </RequireAuth>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <RequireAuth>
                  <MainLayout>
                    <BusinessProfile />
                  </MainLayout>
                </RequireAuth>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
