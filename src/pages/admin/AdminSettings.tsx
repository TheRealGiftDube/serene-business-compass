
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface HomeContent {
  headline: string;
  category: string;
  cta1: string;
  cta2: string;
}

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [homeContent, setHomeContent] = useState<HomeContent>({
    headline: "Zimbabwe's Most Detailed X Directory",
    category: "Tyre",
    cta1: "Explore Listed Businesses",
    cta2: "Register Your Business"
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('content')
          .eq('page_name', 'home')
          .single();
        
        if (error) throw error;
        
        if (data && data.content) {
          setHomeContent(data.content as HomeContent);
        }
      } catch (error) {
        console.error('Error fetching home page content:', error);
        toast.error("Failed to load home page content");
      }
    };
    
    fetchHomeContent();
  }, []);

  const handleContentChange = (field: keyof HomeContent, value: string) => {
    setHomeContent(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveHomeContent = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('site_content')
        .update({ content: homeContent })
        .eq('page_name', 'home');
      
      if (error) throw error;
      
      toast.success("Home page content updated successfully");
    } catch (error) {
      console.error('Error updating home page content:', error);
      toast.error("Failed to update home page content");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Profile</CardTitle>
              <CardDescription>
                Manage your admin profile settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Full Name</Label>
                  <Input id="admin-name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input id="admin-email" type="email" placeholder="your.email@example.com" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Homepage Settings */}
        <TabsContent value="homepage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Content</CardTitle>
              <CardDescription>
                Customize the content displayed on the home page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="headline">Headline</Label>
                <Input 
                  id="headline" 
                  value={homeContent.headline} 
                  onChange={(e) => handleContentChange('headline', e.target.value)}
                  placeholder="Zimbabwe's Most Detailed X Directory" 
                />
                <p className="text-sm text-muted-foreground">
                  Use "X" as a placeholder for the category
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  value={homeContent.category}
                  onChange={(e) => handleContentChange('category', e.target.value)} 
                  placeholder="Tyre" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cta1">Primary CTA</Label>
                  <Input 
                    id="cta1" 
                    value={homeContent.cta1}
                    onChange={(e) => handleContentChange('cta1', e.target.value)} 
                    placeholder="Explore Listed Businesses" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta2">Secondary CTA</Label>
                  <Input 
                    id="cta2"
                    value={homeContent.cta2}
                    onChange={(e) => handleContentChange('cta2', e.target.value)} 
                    placeholder="Register Your Business" 
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveHomeContent} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Categories Settings */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Categories Management</CardTitle>
              <CardDescription>
                Add, edit, or remove business categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                Category management feature will be implemented soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Plan Settings */}
        <TabsContent value="plans" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plans Management</CardTitle>
              <CardDescription>
                Configure subscription plans and features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                Plans management feature will be implemented soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
