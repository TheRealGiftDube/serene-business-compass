
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const TopNav = () => {
  return (
    <header className="border-b border-border bg-card py-3 px-6 flex items-center justify-between">
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search businesses, contacts, events..." 
            className="pl-10 bg-background border-none" 
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  );
};

const NotificationBell = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 border-b border-border">
          <h4 className="text-sm font-medium">Notifications</h4>
        </div>
        <div className="py-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="px-4 py-2 hover:bg-secondary/50 cursor-pointer">
              <p className="text-sm">New business signup: Acme Co.</p>
              <p className="text-xs text-muted-foreground">5 minutes ago</p>
            </div>
          ))}
        </div>
        <div className="p-2 border-t border-border">
          <Button variant="ghost" className="w-full text-xs justify-center">View all</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const UserMenu = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
          <span className="text-sm font-medium hidden md:inline-block">Admin User</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <div className="p-4 border-b border-border">
          <p className="text-sm font-medium">Admin User</p>
          <p className="text-xs text-muted-foreground">admin@example.com</p>
        </div>
        <div className="py-2">
          {['Profile', 'Settings', 'Help'].map(item => (
            <button key={item} className="w-full text-left px-4 py-2 text-sm hover:bg-secondary/50">
              {item}
            </button>
          ))}
        </div>
        <div className="p-2 border-t border-border">
          <Button variant="ghost" className="w-full text-sm justify-start text-destructive hover:text-destructive">
            Log out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TopNav;
