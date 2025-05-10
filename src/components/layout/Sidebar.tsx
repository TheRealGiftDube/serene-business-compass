
import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, BarChart2, Users, Calendar, Settings, PlusCircle, Layers, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-border h-screen sticky top-0 z-10 flex flex-col shadow-sm">
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center space-x-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold text-primary">BizConnect</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-muted-foreground px-2 py-2">MAIN</p>
        <NavItem to="/" icon={<BarChart2 size={18} />} label="Dashboard" exact />
        <NavItem to="/businesses" icon={<Briefcase size={18} />} label="Businesses" />
        <NavItem to="/profile" icon={<Users size={18} />} label="Business Profile" />

        <p className="text-xs font-semibold text-muted-foreground px-2 py-2 mt-4">FEATURES</p>
        <NavItem to="/events" icon={<Calendar size={18} />} label="Events & Promo" />
        <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
      </nav>

      <div className="p-4 border-t border-border">
        <button className="w-full bg-accent text-accent-foreground flex items-center justify-center space-x-2 py-2 rounded-md hover:bg-accent/80 transition-colors">
          <PlusCircle size={16} />
          <span className="text-sm font-medium">Add Business</span>
        </button>
      </div>
    </aside>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
}

const NavItem = ({ to, icon, label, exact = false }: NavItemProps) => {
  const isActive = window.location.pathname === to || 
    (!exact && window.location.pathname.startsWith(to) && to !== '/');

  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive 
          ? "bg-secondary text-primary" 
          : "text-muted-foreground hover:bg-secondary hover:text-primary"
      )}
    >
      <span className={cn(isActive ? "text-primary" : "text-muted-foreground")}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
