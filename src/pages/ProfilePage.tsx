import { useState, useEffect } from 'react';
import { getVolunteers, getRegistrations, getFeedbackForEvent, getPastEvents } from '@/lib/store';
import type { Volunteer, EventRegistration } from '@/lib/types';
import { Award, Star, History, Target, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [hoursLogged, setHoursLogged] = useState(0);

  useEffect(() => {
    const vols = getVolunteers();
    const curr = vols[vols.length - 1];
    if (curr) {
      setVolunteer(curr);
      const regs = getRegistrations().filter(r => r.volunteerId === curr.id);
      setRegistrations(regs);
      // Rough estimation: each event = 4 hours
      const pastEventsAttended = regs.filter(r => {
        const evt = getPastEvents().find(e => e.id === r.eventId);
        return !!evt;
      });
      setHoursLogged(pastEventsAttended.length * 4);
    }
  }, []);

  if (!volunteer) {
    return (
      <div className="min-h-screen py-20 text-center animate-fade-in">
        <h2 className="text-2xl font-bold">No Profile Found</h2>
        <p className="text-muted-foreground mt-2">Please register or switch to a volunteer account.</p>
      </div>
    );
  }

  const badges = [
    { name: "First Step", icon: <Target className="w-8 h-8 text-blue-500" />, desc: "Joined your first event", earned: registrations.length > 0 },
    { name: "Rising Star", icon: <Star className="w-8 h-8 text-yellow-500" />, desc: "Participated in 3+ events", earned: registrations.length >= 3 },
    { name: "Community Pillar", icon: <ShieldCheck className="w-8 h-8 text-green-500" />, desc: "Logged over 20 hours", earned: hoursLogged >= 20 },
    { name: "Veteran", icon: <Award className="w-8 h-8 text-purple-500" />, desc: "Completed 10 events", earned: registrations.length >= 10 },
  ];

  return (
    <div className="min-h-screen py-12 bg-muted/20">
      <div className="container mx-auto px-4 max-w-4xl animate-fade-in">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Your Profile</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-card p-6 rounded-2xl border shadow-sm flex flex-col items-center">
              <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                {volunteer.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-center">{volunteer.name}</h2>
              <p className="text-sm text-muted-foreground">{volunteer.email}</p>
              <div className="mt-4 px-3 py-1 bg-muted rounded-full text-xs font-semibold text-foreground">
                Level {Math.max(1, Math.floor(registrations.length / 2))}
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-2xl border shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Details</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong className="text-foreground">City:</strong> {volunteer.city}</p>
                <p><strong className="text-foreground">Phone:</strong> {volunteer.phone}</p>
                <p><strong className="text-foreground">Primary Cause:</strong> {volunteer.cause}</p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-6 rounded-2xl border shadow-sm flex flex-col items-center justify-center">
                <History className="h-8 w-8 text-primary mb-2" />
                <h4 className="text-3xl font-bold text-foreground">{registrations.length}</h4>
                <p className="text-sm text-muted-foreground">Events Joined</p>
              </div>
              <div className="bg-card p-6 rounded-2xl border shadow-sm flex flex-col items-center justify-center">
                <Award className="h-8 w-8 text-primary mb-2" />
                <h4 className="text-3xl font-bold text-foreground">{hoursLogged}</h4>
                <p className="text-sm text-muted-foreground">Hours Logged</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl border shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Achievements & Badges</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {badges.map((b, i) => (
                  <div key={i} className={`flex flex-col items-center p-4 rounded-xl text-center transition-all ${b.earned ? 'bg-primary/5 border-primary/20 border shadow-sm' : 'opacity-40 grayscale border border-dashed'}`}>
                    <div className="mb-2">{b.icon}</div>
                    <p className="font-semibold text-sm">{b.name}</p>
                    <p className="text-xs mt-1 text-muted-foreground">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
