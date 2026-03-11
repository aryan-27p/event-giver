export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  cause: string;
  availability: string[];
  experience: string;
  idType: string;
  idFileName?: string;
  registeredAt: string;
}

export interface VolunteerEvent {
  id: string;
  name: string;
  description: string;
  location: string;
  cause: string;
  eventDate: string;
  registrationDeadline: string;
  createdAt: string;
}

export interface EventRegistration {
  id: string;
  volunteerId: string;
  eventId: string;
  registeredAt: string;
  certificateGenerated: boolean;
}

export const CITIES = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
  "Philadelphia", "San Antonio", "San Diego", "Dallas", "Mumbai",
  "Delhi", "Bangalore", "London", "Toronto", "Sydney",
];

export const CAUSES = [
  "Education", "Environment", "Healthcare", "Animal Welfare",
  "Disaster Relief", "Poverty Alleviation", "Community Development",
  "Women Empowerment", "Child Welfare", "Elder Care",
];

export const ID_TYPES = [
  "Passport", "Driver's License", "National ID", "Voter ID", "Aadhaar Card",
];

export const AVAILABILITY = [
  "Weekdays", "Weekends", "Mornings", "Afternoons", "Evenings",
];

export const EXPERIENCE_LEVELS = [
  "No Experience", "Beginner (< 1 year)", "Intermediate (1-3 years)", "Expert (3+ years)",
];
