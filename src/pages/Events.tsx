
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url: string;
  rsvp_link: string;
  is_featured: boolean;
}

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('is_approved', true)
          .order('event_date', { ascending: true });
        
        if (error) throw error;
        
        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  const formatEventDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const formatEventTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'h:mm a');
    } catch (error) {
      return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Upcoming Events
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Discover industry events, workshops, and promotions
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">No events found</h3>
          <p className="mt-2 text-gray-500">Check back later for upcoming events.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className={event.is_featured ? "border-primary" : ""}>
              {event.is_featured && (
                <div className="bg-primary text-primary-foreground px-4 py-1 text-sm font-medium text-center">
                  Featured Event
                </div>
              )}
              {event.image_url ? (
                <div 
                  className="h-48 w-full bg-gray-200 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${event.image_url})` }}
                ></div>
              ) : (
                <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                  <Calendar className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatEventDate(event.event_date)}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{formatEventTime(event.event_date)}</span>
                  
                  {event.location && (
                    <>
                      <span className="mx-2">•</span>
                      <MapPin className="mr-1 h-4 w-4" />
                      <span>{event.location}</span>
                    </>
                  )}
                </div>
                <p className="line-clamp-3 text-sm">
                  {event.description || 'No description available for this event.'}
                </p>
              </CardContent>
              <CardFooter>
                {event.rsvp_link ? (
                  <Button 
                    className="w-full" 
                    onClick={() => window.open(event.rsvp_link, '_blank')}
                  >
                    RSVP Now
                  </Button>
                ) : (
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
