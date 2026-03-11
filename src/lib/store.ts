import { Volunteer, VolunteerEvent, EventRegistration } from './types';

const VOLUNTEERS_KEY = 'vc_volunteers';
const EVENTS_KEY = 'vc_events';
const REGISTRATIONS_KEY = 'vc_registrations';

function get<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch { return []; }
}

function set<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Volunteers
export const getVolunteers = () => get<Volunteer>(VOLUNTEERS_KEY);
export const addVolunteer = (v: Volunteer) => {
  const all = getVolunteers();
  all.push(v);
  set(VOLUNTEERS_KEY, all);
};

// Events
export const getEvents = () => get<VolunteerEvent>(EVENTS_KEY);
export const addEvent = (e: VolunteerEvent) => {
  const all = getEvents();
  all.push(e);
  set(EVENTS_KEY, all);
};
export const deleteEvent = (id: string) => {
  set(EVENTS_KEY, getEvents().filter(e => e.id !== id));
};

export const getUpcomingEvents = () => {
  const now = new Date().toISOString();
  return getEvents().filter(e => e.registrationDeadline >= now);
};

export const getPastEvents = () => {
  const now = new Date().toISOString();
  return getEvents().filter(e => e.eventDate < now);
};

// Registrations
export const getRegistrations = () => get<EventRegistration>(REGISTRATIONS_KEY);
export const addRegistration = (r: EventRegistration) => {
  const all = getRegistrations();
  all.push(r);
  set(REGISTRATIONS_KEY, all);
};
export const isVolunteerRegistered = (volunteerId: string, eventId: string) => {
  return getRegistrations().some(r => r.volunteerId === volunteerId && r.eventId === eventId);
};
export const markCertificateGenerated = (registrationId: string) => {
  const all = getRegistrations();
  const idx = all.findIndex(r => r.id === registrationId);
  if (idx >= 0) { all[idx].certificateGenerated = true; set(REGISTRATIONS_KEY, all); }
};

// Seed initial events if empty
export const seedEvents = () => {
  if (getEvents().length > 0) return;
  const now = new Date();
  const events: VolunteerEvent[] = [
    {
      id: 'evt-1', name: 'Beach Cleanup Drive', description: 'Join us for a community beach cleanup to protect marine life and keep our shores pristine.',
      location: 'Santa Monica Beach, LA', cause: 'Environment', eventDate: new Date(now.getTime() + 14 * 86400000).toISOString(),
      registrationDeadline: new Date(now.getTime() + 10 * 86400000).toISOString(), createdAt: now.toISOString(),
    },
    {
      id: 'evt-2', name: 'Teach a Child Program', description: 'Volunteer to teach underprivileged children basic literacy and numeracy skills.',
      location: 'Community Center, Chicago', cause: 'Education', eventDate: new Date(now.getTime() + 21 * 86400000).toISOString(),
      registrationDeadline: new Date(now.getTime() + 17 * 86400000).toISOString(), createdAt: now.toISOString(),
    },
    {
      id: 'evt-3', name: 'Free Health Camp', description: 'Assist doctors and nurses in conducting free health checkups for rural communities.',
      location: 'Rural Health Center, Houston', cause: 'Healthcare', eventDate: new Date(now.getTime() + 7 * 86400000).toISOString(),
      registrationDeadline: new Date(now.getTime() + 5 * 86400000).toISOString(), createdAt: now.toISOString(),
    },
    {
      id: 'evt-4', name: 'Animal Shelter Support', description: 'Help feed, groom, and care for rescued animals at the local shelter.',
      location: 'City Animal Shelter, Phoenix', cause: 'Animal Welfare', eventDate: new Date(now.getTime() - 5 * 86400000).toISOString(),
      registrationDeadline: new Date(now.getTime() - 10 * 86400000).toISOString(), createdAt: new Date(now.getTime() - 30 * 86400000).toISOString(),
    },
    {
      id: 'evt-5', name: 'Tree Plantation Drive', description: 'Plant trees and contribute to a greener future for our community.',
      location: 'Central Park, New York', cause: 'Environment', eventDate: new Date(now.getTime() - 2 * 86400000).toISOString(),
      registrationDeadline: new Date(now.getTime() - 7 * 86400000).toISOString(), createdAt: new Date(now.getTime() - 20 * 86400000).toISOString(),
    },
  ];
  set(EVENTS_KEY, events);
};
