import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, Filter, Grid, List, MoreHorizontal, MapPin, Tag, 
  ExternalLink, CheckCircle, Clock, Star, PhoneCall, Mail, Facebook, Instagram, Video
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for businesses
const mockBusinesses = [
  {
    id: 1,
    name: 'Acme Corporation',
    logo: '👔',
    category: 'Technology',
    location: 'New York, NY',
    contactPerson: 'John Smith',
    status: 'verified',
    tags: ['Featured', 'Partner'],
    website: 'https://example.com',
    rating: 4.8,
    contactNumber: '+1 234-567-8901',
    email: 'contact@acmecorp.com',
    facebook: 'acmecorp',
    instagram: 'acmecorp',
    tiktok: 'acmecorp',
    ownerId: '123'
  },
  {
    id: 2,
    name: 'Sunshine Cafe',
    logo: '☕',
    category: 'Food & Beverage',
    location: 'Los Angeles, CA',
    contactPerson: 'Maria Lopez',
    status: 'pending',
    tags: ['New'],
    website: 'https://example.com',
    rating: 4.2,
    contactNumber: '+1 234-567-8902',
    email: 'contact@sunshinecafe.com',
    facebook: 'sunshinecafe',
    instagram: 'sunshinecafe',
    tiktok: 'sunshinecafe',
    ownerId: '456'
  },
  {
    id: 3,
    name: 'Green Earth Landscaping',
    logo: '🌱',
    category: 'Home & Garden',
    location: 'Portland, OR',
    contactPerson: 'David Chen',
    status: 'verified',
    tags: ['Eco-Friendly'],
    website: 'https://example.com',
    rating: 4.5,
    contactNumber: '+1 234-567-8903',
    email: 'contact@greenearth.com',
    facebook: 'greenearth',
    instagram: 'greenearth',
    tiktok: 'greenearth',
    ownerId: '789'
  },
  {
    id: 4,
    name: 'Tech Innovators',
    logo: '💻',
    category: 'Technology',
    location: 'San Francisco, CA',
    contactPerson: 'Ashley Johnson',
    status: 'verified',
    tags: ['Partner'],
    website: 'https://example.com',
    rating: 4.9,
    contactNumber: '+1 234-567-8904',
    email: 'contact@techinnov.com',
    facebook: 'techinnov',
    instagram: 'techinnov',
    tiktok: 'techinnov',
    ownerId: '101'
  },
  {
    id: 5,
    name: 'Fitness Hub',
    logo: '💪',
    category: 'Health & Wellness',
    location: 'Miami, FL',
    contactPerson: 'Michael Torres',
    status: 'pending',
    tags: ['New'],
    website: 'https://example.com',
    rating: 4.0,
    contactNumber: '+1 234-567-8905',
    email: 'contact@fitnesshub.com',
    facebook: 'fitnesshub',
    instagram: 'fitnesshub',
    tiktok: 'fitnesshub',
    ownerId: '112'
  },
  {
    id: 6,
    name: 'Creative Studios',
    logo: '🎨',
    category: 'Arts & Entertainment',
    location: 'Chicago, IL',
    contactPerson: 'Emma Wilson',
    status: 'verified',
    tags: ['Featured'],
    website: 'https://example.com',
    rating: 4.7,
    contactNumber: '+1 234-567-8906',
    email: 'contact@creativestudios.com',
    facebook: 'creativestudios',
    instagram: 'creativestudios',
    tiktok: 'creativestudios',
    ownerId: '131'
  }
];

const BusinessDirectory = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid'); // Set grid as default
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  
  const isBusinessOwner = (businessOwnerId: string) => {
    return user && user.id === businessOwnerId;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold">BizConnect</h1>
            </div>
            <nav className="flex space-x-4">
              <Button variant="ghost" onClick={() => navigate('/businesses')}>
                Businesses
              </Button>
              <Button variant="ghost" onClick={() => navigate('/events')}>
                Events
              </Button>
              {user ? (
                <>
                  {userRole === 'admin' ? (
                    <Button variant="ghost" onClick={() => navigate('/admin')}>
                      Admin
                    </Button>
                  ) : (
                    <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </Button>
                  )}
                </>
              ) : (
                <Button variant="outline" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Business Directory</h1>
          <Button onClick={() => navigate('/auth')}>Register Your Business</Button>
        </div>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search businesses..." 
                  className="pl-10" 
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Tabs defaultValue="grid" className="w-[200px]" onValueChange={(v) => setViewMode(v as 'grid' | 'table')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="table" className="flex items-center gap-1">
                      <List className="h-4 w-4" />
                      <span className="sr-only sm:not-sr-only">Table</span>
                    </TabsTrigger>
                    <TabsTrigger value="grid" className="flex items-center gap-1">
                      <Grid className="h-4 w-4" />
                      <span className="sr-only sm:not-sr-only">Grid</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center py-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px] h-8 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px] h-8 text-xs">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="health">Health & Wellness</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="arts">Arts & Entertainment</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px] h-8 text-xs">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="ny">New York, NY</SelectItem>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="fl">Florida</SelectItem>
                  <SelectItem value="il">Illinois</SelectItem>
                  <SelectItem value="or">Oregon</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px] h-8 text-xs">
                  <SelectValue placeholder="Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="eco">Eco-Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="grid" value={viewMode}>
              <TabsContent value="table" className="mt-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left font-medium p-3">
                          <div className="flex items-center gap-1">
                            Business
                          </div>
                        </th>
                        <th className="text-left font-medium p-3">Contact Number</th>
                        <th className="text-left font-medium p-3">Email</th>
                        <th className="text-left font-medium p-3">Facebook</th>
                        <th className="text-left font-medium p-3">Instagram</th>
                        <th className="text-left font-medium p-3">TikTok</th>
                        {user && (
                          <th className="text-right font-medium p-3">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {mockBusinesses.map((business) => (
                        <tr key={business.id} className="border-b border-border hover:bg-secondary/30">
                          <td className="p-3">
                            <Link to={`/businesses/${business.id}`} className="flex items-center gap-3 hover:underline">
                              <div className="w-9 h-9 flex items-center justify-center bg-secondary rounded-md text-lg">
                                {business.logo}
                              </div>
                              <div>
                                <p className="font-medium">{business.name}</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Star size={12} className="fill-amber-400 text-amber-400" />
                                  <span>{business.rating}</span>
                                </div>
                              </div>
                            </Link>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <PhoneCall size={14} className="text-muted-foreground" />
                              <span>{business.contactNumber}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <Mail size={14} className="text-muted-foreground" />
                              <span>{business.email}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <Facebook size={14} className="text-muted-foreground" />
                              <span>{business.facebook}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <Instagram size={14} className="text-muted-foreground" />
                              <span>{business.instagram}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <Video size={14} className="text-muted-foreground" />
                              <span>{business.tiktok}</span>
                            </div>
                          </td>
                          {user && isBusinessOwner(business.ownerId) && (
                            <td className="p-3 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal size={16} />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Link to={`/businesses/${business.id}`} className="flex items-center">
                                      View Profile
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <a 
                                      href={business.website} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1"
                                    >
                                      <ExternalLink size={14} />
                                      Website
                                    </a>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="grid" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockBusinesses.map((business) => (
                    <Card key={business.id} className="overflow-hidden card-hover">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <Link to={`/businesses/${business.id}`} className="flex items-center gap-3 hover:underline">
                              <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-md text-2xl">
                                {business.logo}
                              </div>
                              <div>
                                <p className="font-medium">{business.name}</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Star size={12} className="fill-amber-400 text-amber-400" />
                                  <span>{business.rating}</span>
                                </div>
                              </div>
                            </Link>
                          </div>

                          <div className="mt-4 space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Tag size={14} />
                              <span>{business.category}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin size={14} />
                              <span>{business.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <PhoneCall size={14} />
                              <span>{business.contactNumber}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center gap-2 flex-wrap">
                            {business.status === 'verified' ? (
                              <div className="badge-verified">
                                <CheckCircle size={12} className="mr-1" />
                                Verified
                              </div>
                            ) : (
                              <div className="badge-pending">
                                <Clock size={12} className="mr-1" />
                                Pending
                              </div>
                            )}
                            
                            {business.tags.map((tag, i) => (
                              <div key={i} className="text-xs px-2 py-0.5 rounded-full bg-secondary">
                                {tag}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="border-t border-border p-3 bg-secondary/30 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {business.facebook && (
                              <a href={`https://facebook.com/${business.facebook}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                <Facebook size={16} />
                              </a>
                            )}
                            {business.instagram && (
                              <a href={`https://instagram.com/${business.instagram}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                <Instagram size={16} />
                              </a>
                            )}
                            {business.tiktok && (
                              <a href={`https://tiktok.com/@${business.tiktok}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                <Video size={16} />
                              </a>
                            )}
                          </div>
                          
                          <Link to={`/businesses/${business.id}`} className="text-sm font-medium text-primary hover:underline">
                            View Details
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BizConnect</h3>
              <p className="text-gray-300">
                Zimbabwe's premier business directory for connecting businesses and customers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Button variant="link" className="text-gray-300 p-0" onClick={() => navigate('/businesses')}>
                    Browse Businesses
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-300 p-0" onClick={() => navigate('/events')}>
                    Upcoming Events
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="text-gray-300 p-0" onClick={() => navigate('/auth')}>
                    Register Your Business
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">info@bizconnect.co.zw</p>
              <p className="text-gray-300">+263 123 456 789</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} BizConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BusinessDirectory;
