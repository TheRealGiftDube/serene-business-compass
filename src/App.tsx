
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
import HomePage from "./pages/HomePage";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBusinesses from "./pages/admin/AdminBusinesses";
import AdminSettings from "./pages/admin/AdminSettings";
import Events from "./pages/Events";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/businesses" element={<BusinessDirectory />} />
            <Route path="/businesses/:id" element={<BusinessProfile />} />
            <Route path="/events" element={<Events />} />
            
            {/* Business Owner routes */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth requiredRole="business_owner">
                  <MainLayout>
                    <Dashboard />
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
            
            {/* Admin routes */}
            <Route 
              path="/admin" 
              element={
                <RequireAuth requiredRole="admin">
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </RequireAuth>
              } 
            />
            <Route 
              path="/admin/businesses" 
              element={
                <RequireAuth requiredRole="admin">
                  <AdminLayout>
                    <AdminBusinesses />
                  </AdminLayout>
                </RequireAuth>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <RequireAuth requiredRole="admin">
                  <AdminLayout>
                    <AdminSettings />
                  </AdminLayout>
                </RequireAuth>
              } 
            />
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
