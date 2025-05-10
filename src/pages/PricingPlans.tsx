
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PlanType {
  id: string;
  name: string;
  description: string;
  price: number;
  max_listings: number;
  max_images_per_listing: number;
  multiple_branches: boolean;
  allow_csv_upload: boolean;
  events_participation: boolean;
  analytics_access: boolean;
}

const PricingPlans = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<PlanType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('plans')
          .select('*')
          .order('price', { ascending: true });
        
        if (error) throw error;
        
        setPlans(data || []);
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPlans();
  }, []);

  const handleSelectPlan = async (plan: PlanType) => {
    if (!isAuthenticated) {
      toast.info("Please sign in to subscribe to a plan");
      navigate("/auth");
      return;
    }

    // For now, just show a success message
    toast.success(`Thank you for selecting the ${plan.name} plan! During the testing phase, your plan will be automatically approved.`);
    
    // In a real implementation, you would:
    // 1. Redirect to a payment page
    // 2. Process payment
    // 3. Update the user's subscription
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
          Choose the Right Plan for Your Business
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Select a plan that suits your business needs and helps you connect with more customers.
        </p>
      </div>

      {plans.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No plans are currently available. Please check back later.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`flex flex-col ${plan.name === 'Premium' ? 'border-primary shadow-lg relative' : ''}`}
            >
              {plan.name === 'Premium' && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-lg">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{formatCurrency(plan.price)}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    <span>Up to {plan.max_listings} business listings</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                    <span>{plan.max_images_per_listing} images per listing</span>
                  </li>
                  <li className={`flex items-center ${!plan.multiple_branches ? 'text-gray-400' : ''}`}>
                    <CheckIcon className={`h-4 w-4 mr-2 ${plan.multiple_branches ? 'text-green-500' : 'text-gray-400'}`} />
                    <span>{plan.multiple_branches ? 'Multiple branches support' : 'No multiple branches'}</span>
                  </li>
                  <li className={`flex items-center ${!plan.events_participation ? 'text-gray-400' : ''}`}>
                    <CheckIcon className={`h-4 w-4 mr-2 ${plan.events_participation ? 'text-green-500' : 'text-gray-400'}`} />
                    <span>{plan.events_participation ? 'Events participation' : 'No events access'}</span>
                  </li>
                  <li className={`flex items-center ${!plan.allow_csv_upload ? 'text-gray-400' : ''}`}>
                    <CheckIcon className={`h-4 w-4 mr-2 ${plan.allow_csv_upload ? 'text-green-500' : 'text-gray-400'}`} />
                    <span>{plan.allow_csv_upload ? 'CSV data uploads' : 'No CSV uploads'}</span>
                  </li>
                  <li className={`flex items-center ${!plan.analytics_access ? 'text-gray-400' : ''}`}>
                    <CheckIcon className={`h-4 w-4 mr-2 ${plan.analytics_access ? 'text-green-500' : 'text-gray-400'}`} />
                    <span>{plan.analytics_access ? 'Business analytics' : 'No analytics access'}</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.name === 'Premium' ? 'default' : 'outline'}
                  onClick={() => handleSelectPlan(plan)}
                >
                  Select Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {isAdmin && (
        <div className="mt-10 bg-primary/10 p-5 rounded-lg border border-primary/20">
          <h3 className="font-semibold text-lg mb-2">Admin Notice</h3>
          <p>As an admin, you automatically have all features of the Premium plan and bypass all plan restrictions.</p>
        </div>
      )}
    </div>
  );
};

export default PricingPlans;
