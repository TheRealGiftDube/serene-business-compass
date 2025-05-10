
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, Filter, Grid, List, MoreHorizontal, MapPin, Tag, 
  ExternalLink, CheckCircle, Clock, Star, ArrowUpDown
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

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
    rating: 4.8
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
    rating: 4.2
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
    rating: 4.5
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
    rating: 4.9
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
    rating: 4.0
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
    rating: 4.7
  }
];

const BusinessDirectory = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [selectedBusinesses, setSelectedBusinesses] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedBusinesses.length === mockBusinesses.length) {
      setSelectedBusinesses([]);
    } else {
      setSelectedBusinesses(mockBusinesses.map(b => b.id));
    }
  };

  const toggleSelectBusiness = (id: number) => {
    if (selectedBusinesses.includes(id)) {
      setSelectedBusinesses(selectedBusinesses.filter(b => b !== id));
    } else {
      setSelectedBusinesses([...selectedBusinesses, id]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Business Directory</h1>
        <Button>Add Business</Button>
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
              <Tabs defaultValue="table" className="w-[200px]" onValueChange={(v) => setViewMode(v as 'grid' | 'table')}>
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
          
          {selectedBusinesses.length > 0 && (
            <div className="flex items-center justify-between bg-accent/30 p-2 rounded-md">
              <p className="text-sm">{selectedBusinesses.length} businesses selected</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  Send Email
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  Delete
                </Button>
              </div>
            </div>
          )}

          <Tabs defaultValue="table" value={viewMode}>
            <TabsContent value="table" className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left font-medium p-3 w-0">
                        <Checkbox 
                          checked={selectedBusinesses.length === mockBusinesses.length}
                          onCheckedChange={toggleSelectAll}
                        />
                      </th>
                      <th className="text-left font-medium p-3">
                        <div className="flex items-center gap-1">
                          Business
                          <ArrowUpDown size={14} className="text-muted-foreground" />
                        </div>
                      </th>
                      <th className="text-left font-medium p-3">Category</th>
                      <th className="text-left font-medium p-3">Contact</th>
                      <th className="text-left font-medium p-3">Status</th>
                      <th className="text-left font-medium p-3">Location</th>
                      <th className="text-left font-medium p-3">Tags</th>
                      <th className="text-right font-medium p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBusinesses.map((business) => (
                      <tr key={business.id} className="border-b border-border hover:bg-secondary/30">
                        <td className="p-3">
                          <Checkbox 
                            checked={selectedBusinesses.includes(business.id)}
                            onCheckedChange={() => toggleSelectBusiness(business.id)}
                          />
                        </td>
                        <td className="p-3">
                          <Link to={`/profile`} className="flex items-center gap-3 hover:underline">
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
                        <td className="p-3 text-muted-foreground">{business.category}</td>
                        <td className="p-3">{business.contactPerson}</td>
                        <td className="p-3">
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
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin size={14} className="text-muted-foreground" />
                            <span>{business.location}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {business.tags.map((tag, i) => (
                              <div key={i} className="text-xs px-2 py-0.5 rounded-full bg-secondary">
                                {tag}
                              </div>
                            ))}
                          </div>
                        </td>
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
                                <Link to="/profile" className="flex items-center">
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
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
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
                          <Link to="/profile" className="flex items-center gap-3 hover:underline">
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
                          <Checkbox 
                            checked={selectedBusinesses.includes(business.id)}
                            onCheckedChange={() => toggleSelectBusiness(business.id)}
                          />
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
                        </div>
                        
                        <div className="mt-3 flex items-center gap-2">
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
                        <span className="text-sm">Contact: {business.contactPerson}</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal size={16} />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link to="/profile" className="flex items-center">
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
  );
};

export default BusinessDirectory;
