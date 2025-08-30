export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: 'customer' | 'runner';
  avatar?: string;
  verified: boolean;
  rating?: number;
  totalRatings?: number;
  createdAt: string;
}

export interface Customer extends User {
  role: 'customer';
  paymentMethods: PaymentMethod[];
  address?: string;
}

export interface Runner extends User {
  role: 'runner';
  vehicle: string;
  availability: boolean;
  earnings: number;
  completedJobs: number;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface PaymentMethod {
  id: string;
  type: 'gcash' | 'maya' | 'credit' | 'bank';
  last4?: string;
  isDefault: boolean;
}

export interface Errand {
  id: string;
  customerId: string;
  runnerId?: string;
  title: string;
  category: ErrandCategory;
  description: string;
  pickupAddress: string;
  dropoffAddress: string;
  scheduledFor: string;
  status: ErrandStatus;
  fee: number;
  tip?: number;
  photos?: string[];
  instructions?: string;
  createdAt: string;
  updatedAt: string;
}

export type ErrandCategory = 
  | 'daily-essentials'
  | 'bills-payment'
  | 'home-chores'
  | 'shopping-delivery'
  | 'health-wellness'
  | 'personal-assistance'
  | 'quick-fix'
  | 'custom';

export type ErrandStatus = 
  | 'posted'
  | 'assigned'
  | 'in-progress'
  | 'picked-up'
  | 'completed'
  | 'cancelled';

export interface Message {
  id: string;
  errandId: string;
  senderId: string;
  senderRole: 'customer' | 'runner';
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'location';
}

export interface Review {
  id: string;
  errandId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: string;
}