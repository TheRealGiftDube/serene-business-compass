
import React from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ExternalLink, MapPin, Phone, Mail, Globe, Tag, CheckCircle,
  Star, BarChart2, MessageSquare, Calendar, Clock, Edit
} from 'lucide-react';

const BusinessProfile = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Business Profile</h1>
          <p className="text-muted-foreground">View and manage business details</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Edit size={16} />
            <span>Edit</span>
          </Button>
          <Button className="flex items-center gap-1">
            <MessageSquare size={16} />
            <span>Contact</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-md bg-secondary flex items-center justify-center text-3xl">
                    💻
                  </div>
                  <div>
                    <CardTitle className="text-xl">Tech Innovators Inc.</CardTitle>
                    <CardDescription className="mt-1.5">Leading provider of innovative tech solutions</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-sm">4.9</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary" className="rounded-full">Technology</Badge>
                <Badge variant="secondary" className="rounded-full">Software Development</Badge>
                <Badge variant="secondary" className="rounded-full">Cloud Services</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={16} className="shrink-0" />
                  <span>123 Innovation Way, San Francisco, CA 94103</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone size={16} className="shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={16} className="shrink-0" />
                  <span>contact@techinnovators.com</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe size={16} className="shrink-0" />
                  <a href="https://www.example.com" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                    www.techinnovators.com
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="font-medium">About</h3>
                <p className="text-muted-foreground">
                  Tech Innovators Inc. is a leading technology company specializing in software development, cloud solutions, and digital transformation. Founded in 2015, the company has grown to serve clients across various industries, providing cutting-edge technological solutions that drive business growth and innovation.
                </p>
                <p className="text-muted-foreground">
                  With a team of experienced developers, designers, and consultants, Tech Innovators Inc. is committed to delivering high-quality products and services that meet the unique needs of each client.
                </p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="activity">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { action: 'Profile updated', date: 'May 8, 2025', user: 'Admin User', icon: Edit },
                      { action: 'Verification renewed', date: 'Apr 15, 2025', user: 'System', icon: CheckCircle },
                      { action: 'Featured status granted', date: 'Mar 22, 2025', user: 'Marketing Team', icon: Star },
                      { action: 'Received 3 new inquiries', date: 'Mar 10, 2025', user: 'System', icon: MessageSquare },
                      { action: 'Added to Technology Partners group', date: 'Feb 28, 2025', user: 'Admin User', icon: Tag }
                    ].map((item, i) => (
                      <div key={i} className="relative pl-6 pb-6 last:pb-0">
                        <div className="absolute left-0 top-0 w-0.5 h-full bg-border" />
                        <div className="absolute left-[-4px] top-1 w-2 h-2 rounded-full bg-primary" />
                        <div>
                          <p className="font-medium">{item.action}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                            <span className="text-xs text-muted-foreground">•</span>
                            <p className="text-xs text-muted-foreground">by {item.user}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Internal Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: 'Partnership Opportunity', note: 'Potential for co-marketing campaign in Q3. Follow up with marketing team.', date: 'May 2, 2025', user: 'Sarah Chen' },
                      { title: 'Verification Documents', note: 'All business documents verified and stored in the document repository.', date: 'Apr 12, 2025', user: 'Michael Torres' },
                      { title: 'Customer Feedback', note: 'Multiple positive reviews from clients. Consider for featured business spotlight.', date: 'Mar 18, 2025', user: 'Admin User' }
                    ].map((note, i) => (
                      <div key={i} className="border border-border rounded-md p-4">
                        <h4 className="font-medium">{note.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{note.note}</p>
                        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                          <span>{note.date}</span>
                          <span>•</span>
                          <span>{note.user}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="engagement" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <p className="text-muted-foreground text-sm">Profile Views</p>
                        <p className="text-3xl font-bold mt-1">1,248</p>
                        <p className="text-xs text-emerald-600">+12% this month</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <p className="text-muted-foreground text-sm">Inquiries</p>
                        <p className="text-3xl font-bold mt-1">37</p>
                        <p className="text-xs text-emerald-600">+5% this month</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <p className="text-muted-foreground text-sm">Click-through Rate</p>
                        <p className="text-3xl font-bold mt-1">8.4%</p>
                        <p className="text-xs text-emerald-600">+1.2% this month</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Engagement History</h4>
                    <div className="h-[200px] flex items-end">
                      {[30, 45, 25, 60, 75, 65, 75, 90, 85, 55, 70, 65].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-primary/20 rounded-sm mx-0.5" 
                            style={{ height: `${height}%` }}
                          ></div>
                          <span className="text-xs text-muted-foreground mt-1">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tasks" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Follow-up Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { title: 'Renew Verification', dueDate: 'Jun 15, 2025', status: 'upcoming', priority: 'high' },
                      { title: 'Invite to Summer Tech Expo', dueDate: 'May 30, 2025', status: 'pending', priority: 'medium' },
                      { title: 'Request Updated Service Offerings', dueDate: 'Jun 5, 2025', status: 'upcoming', priority: 'low' },
                      { title: 'Follow-up on Partnership Proposal', dueDate: 'May 20, 2025', status: 'overdue', priority: 'high' }
                    ].map((task, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-border rounded-md">
                        <div className="flex items-center gap-4">
                          <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                          </div>
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-0.5 gap-1">
                              <Clock size={12} />
                              <span>Due {task.dueDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={task.status === 'overdue' ? 'destructive' : 'outline'} className="text-xs">
                            {task.status === 'overdue' ? 'Overdue' : task.status === 'pending' ? 'Pending' : 'Upcoming'}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {task.priority === 'high' ? 'High' : task.priority === 'medium' ? 'Medium' : 'Low'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 text-sm h-9">
                    Add New Task
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Business Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">Technology</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Subcategory</p>
                <p className="font-medium">Software Development</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Founded</p>
                <p className="font-medium">2015</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employees</p>
                <p className="font-medium">50-100</p>
              </div>

              <Separator />
              
              <div>
                <p className="text-sm text-muted-foreground">Service Area</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge variant="secondary" className="text-xs">San Francisco</Badge>
                  <Badge variant="secondary" className="text-xs">Bay Area</Badge>
                  <Badge variant="secondary" className="text-xs">Remote</Badge>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Tags</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge variant="outline" className="text-xs badge-featured">Featured</Badge>
                  <Badge variant="outline" className="text-xs badge-partner">Partner</Badge>
                  <Badge variant="outline" className="text-xs">Top Rated</Badge>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Verification Status</p>
                  <Badge className="badge-verified">
                    <CheckCircle size={12} className="mr-1" />
                    Verified
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Last verified: April 15, 2025</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Primary Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <User />
                </div>
                <div>
                  <p className="font-medium">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">Chief Technical Officer</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={14} className="shrink-0" />
                  <span>sarah@techinnovators.com</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone size={14} className="shrink-0" />
                  <span>+1 (555) 987-6543</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4 text-sm h-9">
                Send Message
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Tech Innovators Webinar', date: 'May 20, 2025', time: '2:00 PM PST' },
                  { name: 'Summer Tech Expo', date: 'Jun 15, 2025', time: '10:00 AM PST' }
                ].map((event, i) => (
                  <div key={i} className="flex gap-3 items-start pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="w-10 h-10 flex flex-col items-center justify-center bg-secondary rounded">
                      <span className="text-xs font-medium">{event.date.split(' ')[1]}</span>
                      <span className="text-sm font-bold">{event.date.split(' ')[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{event.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Calendar size={12} />
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Empty state */}
              {false && (
                <div className="py-6 flex flex-col items-center justify-center text-center">
                  <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No upcoming events</p>
                  <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                    Add event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const User = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default BusinessProfile;
