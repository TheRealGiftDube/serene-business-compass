
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import PublicLayout from "./components/layout/PublicLayout";
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
import PricingPlans from "./pages/PricingPlans";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes with consistent header/footer */}
            <Route 
              path="/" 
              element={
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              } 
            />
            <Route 
              path="/auth" 
              element={
                <PublicLayout>
                  <Auth />
                </PublicLayout>
              } 
            />
            <Route 
              path="/auth/callback" 
              element={
                <PublicLayout>
                  <AuthCallback />
                </PublicLayout>
              } 
            />
            <Route 
              path="/businesses" 
              element={
                <PublicLayout>
                  <BusinessDirectory />
                </PublicLayout>
              } 
            />
            <Route 
              path="/businesses/:id" 
              element={
                <PublicLayout>
                  <BusinessProfile />
                </PublicLayout>
              } 
            />
            <Route 
              path="/events" 
              element={
                <PublicLayout>
                  <Events />
                </PublicLayout>
              } 
            />
            <Route 
              path="/pricing" 
              element={
                <PublicLayout>
                  <PricingPlans />
                </PublicLayout>
              } 
            />
            
            {/* Business Owner routes */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
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
            <Route 
              path="*" 
              element={
                <PublicLayout>
                  <NotFound />
                </PublicLayout>
              } 
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
