import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { getUpcomingEvents, getVolunteers, addRegistration, isVolunteerRegistered } from '@/lib/store';
import type { VolunteerEvent } from '@/lib/types';
import { Calendar, MapPin, Tag, Clock, Users } from 'lucide-react';

export default function EventsPage() {
  const [events, setEvents] = useState<VolunteerEvent[]>([]);
  const volunteers = getVolunteers();

  useEffect(() => {
    setEvents(getUpcomingEvents());
  }, []);

  const handleJoin = (eventId: string) => {
    if (volunteers.length === 0) {
      toast.error('Please register as a volunteer first!');
      return;
    }
    const vol = volunteers[volunteers.length - 1]; // latest registered
    if (isVolunteerRegistered(vol.id, eventId)) {
      toast.info('You are already registered for this event!');
      return;
    }
    addRegistration({
      id: crypto.randomUUID(),
      volunteerId: vol.id,
      eventId,
      registeredAt: new Date().toISOString(),
      certificateGenerated: false,
    });
    toast.success('Successfully joined the event! 🎉');
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center animate-fade-in">
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Upcoming Events</h1>
          <p className="mt-2 text-muted-foreground">Find and join volunteer events near you</p>
        </div>

        {events.length === 0 ? (
          <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-12 text-center shadow-card">
            <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="font-heading text-lg font-semibold text-foreground">No Upcoming Events</h3>
            <p className="mt-2 text-sm text-muted-foreground">Check back later or visit the history page for past events.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((evt, i) => (
              <div
                key={evt.id}
                className="group flex flex-col rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="bg-gradient-hero rounded-t-xl p-4">
                  <span className="inline-block rounded-full bg-primary-foreground/20 px-3 py-1 text-xs font-medium text-primary-foreground">{evt.cause}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{evt.name}</h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{evt.description}</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{evt.location}</div>
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />Event: {fmt(evt.eventDate)}</div>
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-secondary" />Deadline: {fmt(evt.registrationDeadline)}</div>
                  </div>
                  <Button className="mt-5 w-full bg-primary text-primary-foreground font-semibold" onClick={() => handleJoin(evt.id)}>
                    <Users className="mr-2 h-4 w-4" /> Join Event
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
