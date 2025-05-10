
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import { 
  LayoutDashboard, 
  Store, 
  Settings, 
  Bell, 
  LogOut, 
  ChevronRight 
} from "lucide-react";
import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeNavItem, setActiveNavItem] = useState(() => {
    const path = window.location.pathname;
    if (path === '/admin') return 'dashboard';
    if (path === '/admin/businesses') return 'businesses';
    if (path === '/admin/settings') return 'settings';
    return 'dashboard';
  });

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { id: 'businesses', label: 'Businesses', icon: <Store size={20} />, path: '/admin/businesses' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  const handleNavClick = (itemId: string, path: string) => {
    setActiveNavItem(itemId);
    navigate(path);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        
        <div className="p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`flex items-center w-full p-2 rounded-md transition-colors ${
                  activeNavItem === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleNavClick(item.id, item.path)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
                {activeNavItem === item.id && (
                  <ChevronRight className="ml-auto" size={16} />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-lg font-medium">
                {navItems.find((item) => item.id === activeNavItem)?.label || 'Admin Panel'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium">
                  {user?.email}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSignOut}
                >
                  <LogOut size={20} />
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
