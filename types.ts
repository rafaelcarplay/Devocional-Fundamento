
export interface Devotion {
  id: number;
  week: number;
  theme: string;
  reference: string;
  reflection: string;
  application: string;
  prayer: string;
  challenge: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'admin';
  completedWeeks: number[]; // Array of devotion IDs
  points: number;
  lastCheckIn?: string; // ISO Date
  streak: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number; // number of weeks or points
}

export interface AppState {
  users: User[];
  devotions: Devotion[];
  currentUser: User | null;
}
