import { useState, useEffect } from 'react';
import { getPastEvents, getRegistrations, getVolunteers, markCertificateGenerated } from '@/lib/store';
import { generateCertificate } from '@/lib/certificate';
import { Button } from '@/components/ui/button';
import type { VolunteerEvent } from '@/lib/types';
import { Calendar, MapPin, Award, History } from 'lucide-react';
import { toast } from 'sonner';

export default function HistoryPage() {
  const [events, setEvents] = useState<VolunteerEvent[]>([]);

  useEffect(() => {
    setEvents(getPastEvents());
  }, []);

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const handleCertificate = (evt: VolunteerEvent) => {
    const volunteers = getVolunteers();
    const regs = getRegistrations();
    const vol = volunteers[volunteers.length - 1];
    if (!vol) { toast.error('No volunteer found. Please register first.'); return; }
    const reg = regs.find(r => r.volunteerId === vol.id && r.eventId === evt.id);
    if (!reg) { toast.error('You did not participate in this event.'); return; }
    generateCertificate(vol.name, evt.name, evt.eventDate);
    markCertificateGenerated(reg.id);
    toast.success('Certificate downloaded! 🎓');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center animate-fade-in">
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Event History</h1>
          <p className="mt-2 text-muted-foreground">Past events that have been completed</p>
        </div>

        {events.length === 0 ? (
          <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-12 text-center shadow-card">
            <History className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="font-heading text-lg font-semibold text-foreground">No Past Events</h3>
            <p className="mt-2 text-sm text-muted-foreground">Events will appear here after their date has passed.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((evt, i) => (
              <div
                key={evt.id}
                className="flex flex-col rounded-xl border border-border bg-card shadow-card animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="rounded-t-xl bg-muted p-4">
                  <span className="inline-block rounded-full bg-muted-foreground/20 px-3 py-1 text-xs font-medium text-muted-foreground">{evt.cause}</span>
                  <span className="ml-2 inline-block rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">Completed</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{evt.name}</h3>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">{evt.description}</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{evt.location}</div>
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{fmt(evt.eventDate)}</div>
                  </div>
                  <Button variant="outline" className="mt-5 w-full font-semibold" onClick={() => handleCertificate(evt)}>
                    <Award className="mr-2 h-4 w-4" /> Download Certificate
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
