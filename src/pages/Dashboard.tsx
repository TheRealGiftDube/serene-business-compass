
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, CheckCircle, MapPin, Users, PlusCircle, Bell, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <PlusCircle size={16} />
            <span>Add Business</span>
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Bell size={16} />
            <span>Send Broadcast</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Businesses"
          value="1,285"
          change="+12.5%"
          changeType="positive"
          icon={<Building className="h-4 w-4" />}
        />
        <StatsCard 
          title="New This Month"
          value="64"
          change="+8.2%"
          changeType="positive"
          icon={<PlusCircle className="h-4 w-4" />}
        />
        <StatsCard 
          title="Verified Listings"
          value="943"
          change="73.4%"
          isPercentage={true}
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <StatsCard 
          title="Locations"
          value="48"
          change="+3"
          changeType="positive"
          icon={<MapPin className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex justify-between items-center">
              Business Categories
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                View Report
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart 
              categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
              seriesData={[
                {
                  name: 'Retail',
                  data: [35, 41, 36, 26, 45, 48]
                },
                {
                  name: 'Food & Beverage',
                  data: [25, 32, 38, 32, 33, 36]
                },
                {
                  name: 'Technology',
                  data: [20, 29, 37, 36, 44, 45]
                }
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Businesses by Industry</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart 
              data={[
                { name: 'Retail', value: 30 },
                { name: 'Technology', value: 25 },
                { name: 'Food & Beverage', value: 20 },
                { name: 'Professional Services', value: 15 },
                { name: 'Health & Wellness', value: 10 }
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityFeed />
          </CardContent>
        </Card>

        <Card>
          <Tabs defaultValue="pending">
            <CardHeader className="pb-0">
              <CardTitle className="text-base font-medium">Awaiting Action</CardTitle>
              <TabsList className="mt-2">
                <TabsTrigger value="pending" className="text-xs">Pending (12)</TabsTrigger>
                <TabsTrigger value="verification" className="text-xs">Verification (8)</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="pt-4">
              <TabsContent value="pending" className="space-y-3 mt-0">
                {['Acme Inc.', 'Sunrise Cafe', 'Tech Solutions Ltd'].map((business, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium">{business}</p>
                      <p className="text-xs text-muted-foreground">Awaiting review</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7">
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="verification" className="space-y-3 mt-0">
                {['Cloud Commerce', 'Green Energy Co.', 'Fitness First'].map((business, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium">{business}</p>
                      <p className="text-xs text-muted-foreground">Needs verification</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7">
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                ))}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  isPercentage?: boolean;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, change, changeType = 'neutral', isPercentage, icon }: StatsCardProps) => {
  return (
    <Card className="card-stats">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {change && (
            <p className={`text-xs flex items-center mt-1 ${
              changeType === 'positive' ? 'text-emerald-600' : 
              changeType === 'negative' ? 'text-rose-600' : 'text-muted-foreground'
            }`}>
              {change}
              {isPercentage ? ' total' : ' from last month'}
            </p>
          )}
        </div>
        <div className="p-2 bg-primary/10 rounded-full">
          {icon}
        </div>
      </div>
    </Card>
  );
};

const ActivityFeed = () => {
  const activities = [
    {
      business: 'Tech Innovators Inc.',
      action: 'was added as a new business',
      time: '2 hours ago',
      user: 'Sarah Chen'
    },
    {
      business: 'Sunset Restaurant',
      action: 'was verified',
      time: '5 hours ago',
      user: 'Michael Torres'
    },
    {
      business: 'Fitness Hub',
      action: 'status changed to Featured',
      time: '1 day ago',
      user: 'Admin User'
    },
    {
      business: 'Green Earth Consultants',
      action: 'profile was updated',
      time: '1 day ago',
      user: 'Admin User'
    },
    {
      business: 'Creative Studios',
      action: 'received 3 new inquiries',
      time: '2 days ago',
      user: 'System'
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity, i) => (
        <div key={i} className="flex gap-4 items-start border-b border-border pb-4 last:border-0">
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <Users size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-sm">
              <Link to="/profile" className="font-medium hover:underline">{activity.business}</Link>
              {' '}{activity.action}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-muted-foreground">{activity.time}</p>
              <span className="text-xs text-muted-foreground">•</span>
              <p className="text-xs text-muted-foreground">by {activity.user}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
