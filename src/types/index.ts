export interface Battery {
  id: string;
  type: 'AA' | 'AAA' | '9V' | 'CR2032' | 'Other';
  brand: string;
  location: string;
  dateAdded: Date;
  expiryDate?: Date;
  isExpired: boolean;
  isRecycled: boolean;
}

export interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: 'store' | 'school' | 'public' | 'event';
  isActive: boolean;
  hours?: string;
}

export interface RecyclingEvent {
  id: string;
  type: 'concert' | 'festival' | 'match' | 'school';
  name: string;
  location: string;
  date: Date;
  rewards: Reward[];
}

export interface Reward {
  id: string;
  type: 'bracelet' | 'drink' | 'discount' | 'goodies';
  title: string;
  description: string;
  pointsRequired: number;
  isAvailable: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  totalBatteriesRecycled: number;
  totalPoints: number;
  level: number;
  achievements: Achievement[];
  qrCode: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface ScanResult {
  batteryId?: string;
  recyclingPointId?: string;
  type: 'battery' | 'recycling_point';
  data: any;
}